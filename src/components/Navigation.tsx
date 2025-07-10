import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded font-extrabold text-xl tracking-wider uppercase leading-none shadow">
            Safari Stays
          </div>
          <span className="text-xs text-primary font-light ml-2 tracking-widest">Airbnbs in Kenya</span>
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 ml-8">
          <Link to="/" className="text-black hover:text-primary font-semibold uppercase tracking-wide text-sm">Home</Link>
          {/* <Link to="/destinations" className="text-black hover:text-primary font-semibold uppercase tracking-wide text-sm">Destinations</Link> */}
          <Link to="/properties" className="text-black hover:text-primary font-semibold uppercase tracking-wide text-sm">Properties</Link>
          <Link to="/about" className="text-black hover:text-primary font-semibold uppercase tracking-wide text-sm">About</Link>
          <Link to="/contact" className="text-black hover:text-primary font-semibold uppercase tracking-wide text-sm">Contact</Link>
        </div>
        {/* Search Icon */}
        <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 ml-4">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;