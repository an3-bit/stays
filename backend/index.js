const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
  PORT = 5000
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
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

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
  const { phone, amount } = req.body;
  if (!phone || !amount) return res.status(400).json({ error: 'Phone and amount required' });
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
      PartyA: phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: 'SafariStays',
      TransactionDesc: 'Booking Payment'
    };
    const stkRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', payload, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    res.json(stkRes.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
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

app.get('/', (req, res) => res.send('M-Pesa Backend Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 