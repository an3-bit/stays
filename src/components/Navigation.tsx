import { Button } from "@/components/ui/button";
import { Search, Menu, Globe, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg font-bold text-lg tracking-wide">
            Safari Stays
          </div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/properties" className="relative py-3 px-4 text-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary">
            Stays
          </Link>
          <Link to="/destinations" className="relative py-3 px-4 text-muted-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary">
            Experiences
          </Link>
          <Link to="/about" className="relative py-3 px-4 text-muted-foreground hover:text-secondary transition-colors font-medium border-b-2 border-transparent hover:border-secondary">
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
      </div>
    </nav>
  );
};

export default Navigation;