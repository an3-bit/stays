import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Calendar, Users, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            SAFARI STAYS
            <br />
            <span className="text-secondary">FINDER</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
            THE EASIEST WAY TO FIND YOUR PERFECT KENYAN GETAWAY
          </p>

          {/* Search Bar */}
          <div className="mt-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Where to?" 
                    className="pl-10 h-12 border-0 bg-muted/50 focus-visible:ring-primary"
                  />
                </div>

                {/* Check-in Date */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    type="date" 
                    className="pl-10 h-12 border-0 bg-muted/50 focus-visible:ring-primary"
                  />
                </div>

                {/* Check-out Date */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    type="date" 
                    className="pl-10 h-12 border-0 bg-muted/50 focus-visible:ring-primary"
                  />
                </div>

                {/* Guests */}
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <select className="w-full h-12 pl-10 pr-4 rounded-md bg-muted/50 border-0 text-foreground focus:ring-2 focus:ring-primary">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6">
                <Button className="w-full md:w-auto px-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-lg">Properties Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-lg">Cities & Towns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">10K+</div>
              <div className="text-lg">Happy Guests</div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/254700000000?text=Hello%20Safari%20Stays%20Kenya,%20I%20need%20help%20finding%20accommodation"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us on WhatsApp
          </span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;