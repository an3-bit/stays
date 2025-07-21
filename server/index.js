const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://safari-stays-airbnbs.vercel.app/' // Allow only your frontend to make requests
}));

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
  PORT = 5000,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS
} = process.env;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/safaristays', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  propertyId: String,
  checkIn: String,
  checkOut: String,
  guests: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
  checkoutRequestId: String,
  paymentStatus: { type: String, default: 'pending' }
});
const Booking = mongoose.model('Booking', bookingSchema);

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image
  price: { type: Number, required: true },
  location: { type: String, required: true },
  guests: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  amenities: [String],
  createdAt: { type: Date, default: Date.now }
});
const Property = mongoose.model('Property', propertySchema);

// User Schema (for admin)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);


// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

async function sendBookingConfirmationEmail(booking, amount) {
  const mailOptions = {
    from: `"Safari Stays" <${EMAIL_USER}>`,
    to: booking.email,
    subject: 'Booking Confirmation and Payment Receipt',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${booking.name},</p>
      <p>Thank you for your booking with Safari Stays.</p>
      <h2>Booking Details:</h2>
      <ul>
        <li><b>Property ID:</b> ${booking.propertyId}</li>
        <li><b>Check-in:</b> ${new Date(booking.checkIn).toLocaleDateString()}</li>
        <li><b>Check-out:</b> ${new Date(booking.checkOut).toLocaleDateString()}</li>
        <li><b>Guests:</b> ${booking.guests}</li>
      </ul>
      <h2>Payment Details:</h2>
      <p><b>Amount Paid:</b> KES ${amount}</p>
      <p><b>Transaction Status:</b> Paid</p>
      <p>We look forward to hosting you.</p>
      <p>Best regards,<br/>The Safari Stays Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to', booking.email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Helper function to format phone numbers to 254xxxxxxxxx format
function formatPhoneNumber(phone) {
  const cleaned = ('' + phone).replace(/\D/g, ''); // Ensure it's a string and remove non-digits
  if (cleaned.startsWith('254')) {
    return cleaned.substring(0, 12); // Ensure it's 12 digits long
  }
  if (cleaned.startsWith('0')) {
    return `254${cleaned.substring(1)}`.substring(0, 12);
  }
  if (cleaned.length === 9) { // For numbers like 7... or 1...
    return `254${cleaned}`.substring(0, 12);
  }
  // If it doesn't match known formats, it might be invalid. Return as is.
  return cleaned;
}

// Get M-Pesa access token
async function getAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  return res.data.access_token;
}

// Initiate STK Push
app.post('/api/mpesa/stkpush', async (req, res) => {
  const { phone, amount, bookingId } = req.body;
  if (!phone || !amount || !bookingId) return res.status(400).json({ error: 'Phone, amount, and bookingId are required' });
  
  const formattedPhone = formatPhoneNumber(phone);

  try {
    const access_token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');
    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: 'SafariStays',
      TransactionDesc: 'Booking Payment'
    };
    const stkRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const checkoutRequestId = stkRes.data.CheckoutRequestID;
    await Booking.findByIdAndUpdate(bookingId, { checkoutRequestId });

    res.json(stkRes.data);
  } catch (err) {
    console.error('STK PUSH ERROR:', err.response?.data || err.message);
    let errorMessage = 'An error occurred during M-Pesa STK push.';
    if (err.response?.data) {
      if (typeof err.response.data === 'object') {
        // Safaricom API often returns error details in `errorMessage`
        errorMessage = err.response.data.errorMessage || JSON.stringify(err.response.data);
      } else {
        errorMessage = err.response.data;
      }
    } else {
      errorMessage = err.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

// Store booking details
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create a new property
app.post('/api/properties', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ success: true, property });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Public: Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get a single property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update a property
app.put('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ success: true, property });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete a property
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- AUTH ROUTES ---
// Register Admin (should be used cautiously, e.g., via CLI or a secured one-time endpoint)
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Admin
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// M-Pesa Callback Endpoint
app.post('/api/mpesa/callback', async (req, res) => {
  console.log('M-Pesa Callback Received:');
  
  const callbackData = req.body;
  console.log(JSON.stringify(callbackData, null, 2));

  if (!callbackData.Body || !callbackData.Body.stkCallback || !callbackData.Body.stkCallback.CheckoutRequestID) {
    return res.status(200).json({ message: 'Callback received but no STK data.' });
  }
  
  const checkoutRequestId = callbackData.Body.stkCallback.CheckoutRequestID;

  try {
    const resultCode = callbackData.Body.stkCallback.ResultCode;

    if (resultCode === 0) {
      const metadata = callbackData.Body.stkCallback.CallbackMetadata.Item;
      const amount = metadata.find(item => item.Name === 'Amount').Value;
      
      const booking = await Booking.findOneAndUpdate(
        { checkoutRequestId },
        { paymentStatus: 'paid' },
        { new: true }
      );
      
      if (booking) {
        await sendBookingConfirmationEmail(booking, amount);
      } else {
        console.error('Booking not found for CheckoutRequestID:', checkoutRequestId);
      }
    } else {
      await Booking.findOneAndUpdate({ checkoutRequestId }, { paymentStatus: 'failed' });
      console.log('M-Pesa transaction failed.');
    }
  } catch (err) {
    console.error('Error processing M-Pesa callback:', err.message);
  }
  
  res.status(200).json({ message: 'Callback received successfully' });
});

app.get('/', (req, res) => res.send('M-Pesa Backend Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 