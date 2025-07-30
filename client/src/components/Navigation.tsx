import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Globe, User, Home, Star, Settings, X, Minus, Plus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingOpen(false);
    navigate("/booking-confirmation");
  };

  // Booking Dialog (shared)
  const BookingDialog = (
    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Complete Your Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any special requirements or requests..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Submit Booking Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={`w-full sticky top-0 z-50 transition-all duration-300 ${isHome ? "bg-transparent border-none shadow-none backdrop-blur-none" : "bg-white/90 shadow-md border-b backdrop-blur-md"}`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className={`${isHome ? "bg-transparent text-orange-300" : "bg-secondary text-secondary-foreground"} px-3 py-1.5 rounded-lg font-bold text-lg tracking-wide shadow group-hover:scale-105 transition-transform`}>
            tvhstays
          </div>
        </Link>
        {/* Center Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className={`relative py-3 px-4 font-medium border-b-2 border-transparent flex items-center gap-2 rounded-md transition-colors hover:border-secondary hover:bg-secondary/10 ${isHome ? 'text-white hover:text-white' : 'text-foreground hover:text-secondary'}`}>
            <Home className={`h-4 w-4 ${isHome ? 'text-white' : ''}`} />
            Stays
          </Link>
          <Link to="/properties" className={`relative py-3 px-4 font-medium border-b-2 border-transparent flex items-center gap-2 rounded-md transition-colors hover:border-secondary hover:bg-secondary/10 ${isHome ? 'text-white hover:text-white' : 'text-muted-foreground hover:text-secondary'}`}>
            <Star className={`h-4 w-4 ${isHome ? 'text-white' : ''}`} />
            Properties
          </Link>
          <Link to="/about" className={`relative py-3 px-4 font-medium border-b-2 border-transparent flex items-center gap-2 rounded-md transition-colors hover:border-secondary hover:bg-secondary/10 ${isHome ? 'text-white hover:text-white' : 'text-muted-foreground hover:text-secondary'}`}>
            <Settings className={`h-4 w-4 ${isHome ? 'text-white' : ''}`} />
            Services
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="hidden md:block text-sm font-medium text-foreground hover:text-secondary transition-colors px-3 py-2 rounded-md hover:bg-secondary/10">
            Contact Us
          </Link>
          <Link to="/become-host" className="hidden md:block">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Become a Host
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <Globe className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3 py-1.5 px-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link 
                    to="/" 
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Stays</span>
                  </Link>
                  <Link 
                    to="/properties" 
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Star className="h-5 w-5" />
                    <span className="font-medium">Properties</span>
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Services</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Globe className="h-5 w-5" />
                    <span className="font-medium">Contact Us</span>
                  </Link>
                  <Link
                    to="/become-host"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Become a Host</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-muted"
              onClick={() => navigate('/login')}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      {/* Search Bar */}
      {/* Removed problematic search bar UI */}
    </div>
  );
};

export default Navigation;