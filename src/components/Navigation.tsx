import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Menu, Globe, User, Home, Star, Settings, Calendar, Users, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showCompactNav, setShowCompactNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Scroll detection for compact nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 200) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowCompactNav(true);
        } else {
          // Scrolling down
          setShowCompactNav(false);
        }
      } else {
        // At top
        setShowCompactNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingOpen(false);
    navigate("/booking-confirmation");
  };

  return (
    <>
      {/* Compact Navigation - appears on scroll up */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b transition-transform duration-300 ${
        showCompactNav ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-bold text-sm tracking-wide">
                Safari Stays
              </div>
            </Link>

            {/* Compact Search */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center bg-white border border-border rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer max-w-md">
                  <div className="px-4 py-2 border-r border-border">
                    <span className="text-sm font-medium text-foreground">
                      {formData.destination || "Anywhere"}
                    </span>
                  </div>
                  <div className="px-4 py-2 border-r border-border">
                    <span className="text-sm font-medium text-foreground">
                      {formData.checkIn || "Anytime"}
                    </span>
                  </div>
                  <div className="px-4 py-2">
                    <span className="text-sm text-muted-foreground">
                      {formData.guests || "Add guests"}
                    </span>
                  </div>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full h-8 w-8 mr-1 flex items-center justify-center">
                    <Search className="h-3 w-3" />
                  </Button>
                </div>
              </DialogTrigger>
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
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Special Requests (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Any special requirements or requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Submit Booking Request
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              <Link to="/contact" className="hidden md:block text-xs font-medium text-foreground hover:text-secondary transition-colors">
                Become a host
              </Link>
              <div className="flex items-center space-x-2 border border-border rounded-full py-1 px-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Menu className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 bg-muted">
                  <User className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
    <div className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Main Navigation */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg font-bold text-lg tracking-wide">
            Safari Stays
          </div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/properties" className="relative py-3 px-4 text-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary flex items-center gap-2">
            <Home className="h-4 w-4" />
            Stays
          </Link>
          <Link to="/destinations" className="relative py-3 px-4 text-muted-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary flex items-center gap-2">
            <Star className="h-4 w-4" />
            Experiences
          </Link>
          <Link to="/about" className="relative py-3 px-4 text-muted-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Services
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="hidden md:block text-sm font-medium text-foreground hover:text-secondary transition-colors">
            Become a host
          </Link>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <Globe className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3 border border-border rounded-full py-1.5 px-2 shadow-sm hover:shadow-md transition-shadow">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-white border border-border rounded-full shadow-lg hover:shadow-xl transition-shadow max-w-4xl w-full">
              {/* Destination */}
              <div className="flex-1 px-6 py-4 border-r border-border">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Where</label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>

              {/* Check In */}
              <div className="flex-1 px-6 py-4 border-r border-border">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Check in</label>
                <input
                  type="date"
                  className="w-full bg-transparent border-none focus:outline-none text-sm"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                />
              </div>

              {/* Check Out */}
              <div className="flex-1 px-6 py-4 border-r border-border">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Check out</label>
                <input
                  type="date"
                  className="w-full bg-transparent border-none focus:outline-none text-sm"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                />
              </div>

              {/* Who */}
              <div className="flex-1 px-6 py-4">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Who</label>
                <input
                  type="text"
                  placeholder="Add guests"
                  className="w-full bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                />
              </div>

              {/* Book Button */}
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full h-12 w-12 mr-2 flex items-center justify-center">
                    <Search className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
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
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Special Requests (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Any special requirements or requests..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      Submit Booking Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navigation;