import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const BookingSubmitted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, property } = location.state || {};

  if (!booking || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Booking Data Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your booking details. Please try creating the booking again.
          </p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    navigate("/booking-confirmation", { state: { booking, property } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Booking Request Received!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you, {booking.name}. Your booking for <strong>{property.title}</strong> has been submitted.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Please complete the payment to confirm your reservation.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Booking ID:</span>
              <span className="font-medium text-gray-800 dark:text-white">{booking._id.slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Check-in:</span>
              <span className="font-medium text-gray-800 dark:text-white">{new Date(booking.checkIn).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Check-out:</span>
              <span className="font-medium text-gray-800 dark:text-white">{new Date(booking.checkOut).toLocaleDateString()}</span>
            </div>
             <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-600 dark:text-gray-300">Total Due:</span>
                <span className="text-primary">KSh {property.price.toLocaleString()}</span>
              </div>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={handleProceedToPayment} size="lg" className="font-semibold">
              Proceed to Payment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              You will not be charged until you complete the payment on the next screen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSubmitted; 