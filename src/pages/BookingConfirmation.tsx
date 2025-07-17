import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
// import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const PaymentSection = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [mpesaSent, setMpesaSent] = useState(false);
  const [mpesaError, setMpesaError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvc: "" });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Simulate amount for demo
  const amount = 1000;

  const handleMpesaPay = async () => {
    setProcessing(true);
    setMpesaError(null);
    setSuccess(null);
    try {
      // For demo, use local backend if available
      const res = await fetch("http://localhost:5000/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mpesaPhone, amount })
      });
      const data = await res.json();
      if (res.ok && data.CheckoutRequestID) {
        setMpesaSent(true);
        setSuccess("STK Push sent! Check your phone to complete the payment.");
      } else {
        setMpesaError(data.error?.errorMessage || "Failed to initiate M-Pesa payment.");
      }
    } catch (err) {
      setMpesaError("Could not connect to payment server.");
    }
    setProcessing(false);
  };

  const handleCardPay = () => {
    setProcessing(true);
    setSuccess(null);
    setTimeout(() => {
      setProcessing(false);
      setSuccess("Card payment processed (simulated)");
    }, 2000);
  };

  const handlePaypalPay = () => {
    setProcessing(true);
    setSuccess(null);
    setTimeout(() => {
      setProcessing(false);
      setSuccess("PayPal payment processed (simulated)");
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-primary mb-4">Complete Your Payment</h2>
      {!showOptions ? (
        <Button className="bg-primary hover:bg-primary/90 w-full" size="lg" onClick={() => setShowOptions(true)}>
          Proceed to Pay
        </Button>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Button variant={selected === "mpesa" ? "default" : "outline"} className="flex-1" onClick={() => setSelected("mpesa")}>M-Pesa</Button>
            <Button variant={selected === "paypal" ? "default" : "outline"} className="flex-1" onClick={() => setSelected("paypal")}>PayPal</Button>
            <Button variant={selected === "card" ? "default" : "outline"} className="flex-1" onClick={() => setSelected("card")}>Debit/Credit Card</Button>
          </div>
          {/* Payment Forms */}
          {selected === "mpesa" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">M-Pesa Phone Number</label>
              <input
                type="tel"
                className="border rounded px-3 py-2 w-full"
                placeholder="e.g. 07XXXXXXXX"
                value={mpesaPhone}
                onChange={e => setMpesaPhone(e.target.value)}
                disabled={processing || mpesaSent}
              />
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleMpesaPay} disabled={processing || !mpesaPhone || mpesaSent}>
                {processing ? "Processing..." : mpesaSent ? "STK Push Sent!" : "Pay with M-Pesa"}
              </Button>
              {mpesaError && <div className="text-red-600 mt-2">{mpesaError}</div>}
              {success && <div className="text-green-700 mt-2">{success}</div>}
            </div>
          )}
          {selected === "paypal" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">PayPal Email</label>
              <input
                type="email"
                className="border rounded px-3 py-2 w-full"
                placeholder="your@email.com"
                value={paypalEmail}
                onChange={e => setPaypalEmail(e.target.value)}
                disabled={processing}
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handlePaypalPay} disabled={processing || !paypalEmail}>
                {processing ? "Processing..." : "Pay with PayPal"}
              </Button>
              {success && <div className="text-green-700 mt-2">{success}</div>}
            </div>
          )}
          {selected === "card" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                disabled={processing}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  disabled={processing}
                />
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                  disabled={processing}
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleCardPay} disabled={processing || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc}>
                {processing ? "Processing..." : "Pay with Card"}
              </Button>
              {success && <div className="text-green-700 mt-2">{success}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-4">
              Booking Request Submitted!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for choosing Safari Stays. We have received your booking request and our team will contact you shortly to confirm your reservation and assist with any special requirements.
            </p>
          </div>

          {/* Payment Section - moved here */}
          <PaymentSection />

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium">Confirmation Call</p>
                  <p className="text-sm text-muted-foreground">Our team will call you within 5 minutes to confirm your booking details.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium">Payment Information</p>
                  <p className="text-sm text-muted-foreground">We'll provide secure payment options and detailed pricing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="font-medium">Travel Guidelines</p>
                  <p className="text-sm text-muted-foreground">Receive your booking confirmation and travel information.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-primary mb-3">Need immediate assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+254-xxx-xxx-xxx" className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors">
                <Phone className="h-4 w-4" />
                +254 XXX XXX XXX
              </a>
              <a href="mailto:bookings@safaristays.com" className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors">
                <Mail className="h-4 w-4" />
                bookings@safaristays.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/properties">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Browse More Properties
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;