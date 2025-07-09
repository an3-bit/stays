import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-bold text-lg">
              SAFARI STAYS
            </div>
            <span className="text-white font-medium">KENYA</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-secondary transition-colors font-medium">
              HOME
            </Link>
            <Link to="/destinations" className="text-white hover:text-secondary transition-colors font-medium">
              DESTINATIONS
            </Link>
            <Link to="/properties" className="text-white hover:text-secondary transition-colors font-medium">
              PROPERTIES
            </Link>
            <Link to="/about" className="text-white hover:text-secondary transition-colors font-medium">
              ABOUT
            </Link>
            <Link to="/contact" className="text-white hover:text-secondary transition-colors font-medium">
              CONTACT
            </Link>
          </div>

          {/* Search Icon */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;