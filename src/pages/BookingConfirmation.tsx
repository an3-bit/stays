import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
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

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium">Confirmation Call</p>
                  <p className="text-sm text-muted-foreground">Our team will call you within 2 hours to confirm your booking details.</p>
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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