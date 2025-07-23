import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Smartphone } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { booking, property } = location.state || {};
  
  const [selectedPayment, setSelectedPayment] = useState("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState(booking?.phone || "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMpesaPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaPhone) {
      toast({
        title: "Phone number required",
        description: "Please enter a phone number to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    toast({
      title: "Initiating M-Pesa Payment...",
      description: "Please check your phone to complete the transaction.",
    });

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: mpesaPhone,
          amount: property.price,
          bookingId: booking._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate M-Pesa payment.");
      }
      
      toast({
        title: "Payment Initiated!",
        description: "Please check your phone to complete the M-Pesa payment.",
      });

      navigate("/thank-you", { state: { booking, property, amount: property.price } });

    } catch (err) {
      console.error("M-Pesa payment failed:", err);
      toast({
        title: "Payment Error",
        description: (err as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!booking || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Booking Data Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your booking details. Please return to the homepage and try again.
          </p>
          <Button onClick={() => navigate("/")}>Go to Homepage</Button>
        </div>
      </div>
    );
  }

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "mpesa":
        return (
          <form onSubmit={handleMpesaPayment} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="mpesa-phone" className="font-semibold">M-Pesa Phone Number</Label>
              <Input
                id="mpesa-phone"
                type="tel"
                placeholder="e.g., 0712345678"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                required
                className="mt-1"
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground mt-1">
                An STK push will be sent to this number to complete the payment.
              </p>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 font-bold" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay KSh ${property.price.toLocaleString()}`}
            </Button>
          </form>
        );
      case "paypal":
        return <div className="text-center p-8 border rounded-lg mt-4"><p>PayPal payment option is coming soon.</p></div>;
      case "card":
        return <div className="text-center p-8 border rounded-lg mt-4"><p>Credit/Debit Card payment is coming soon.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Complete Your Payment</h1>
            <p className="text-muted-foreground">Choose a payment method to confirm your booking for <strong>{property.title}</strong>.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between">
                    <span className="font-semibold">Property:</span>
                    <span>{property.title}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Dates:</span>
                    <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Guests:</span>
                    <span>{booking.guests}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                    <span className="font-semibold">Total Due:</span>
                    <span>KSh {property.price.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                   <Button
                    variant={selectedPayment === "mpesa" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedPayment("mpesa")}
                  >
                    <Smartphone className="h-5 w-5"/>
                    M-Pesa
                  </Button>
                   <Button
                    variant={selectedPayment === "paypal" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedPayment("paypal")}
                    disabled
                  >
                    <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="w-5 h-5"/>
                    PayPal
                  </Button>
                   <Button
                    variant={selectedPayment === "card" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedPayment("card")}
                    disabled
                  >
                    <CreditCard className="h-5 w-5"/>
                    Credit/Debit Card
                  </Button>
                </div>
                <Separator className="my-4"/>
                {renderPaymentForm()}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;