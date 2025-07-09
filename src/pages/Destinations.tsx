import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users, Camera, Plane } from "lucide-react";
import maasaiMaraImage from "@/assets/maasai-mara.jpg";
import dianiBeachImage from "@/assets/diani-beach.jpg";
import mountKenyaImage from "@/assets/mount-kenya.jpg";

const destinations = [
  {
    id: 1,
    name: "Maasai Mara National Reserve",
    region: "Narok County",
    description: "Experience the world-famous Great Migration and witness the Big Five in their natural habitat. The Maasai Mara offers unparalleled wildlife viewing opportunities.",
    image: maasaiMaraImage,
    properties: 45,
    averagePrice: "KSh 15,000",
    highlights: ["Great Migration", "Big Five", "Maasai Culture", "Hot Air Balloons"],
    bestTime: "July - October",
    activities: ["Game Drives", "Cultural Tours", "Photography", "Balloon Safaris"]
  },
  {
    id: 2,
    name: "Diani Beach",
    region: "Kwale County",
    description: "Pristine white sandy beaches meet crystal-clear waters of the Indian Ocean. Perfect for relaxation, water sports, and romantic getaways.",
    image: dianiBeachImage,
    properties: 78,
    averagePrice: "KSh 12,500",
    highlights: ["White Sand Beaches", "Coral Reefs", "Water Sports", "Kaya Forests"],
    bestTime: "December - March",
    activities: ["Snorkeling", "Dhow Trips", "Kite Surfing", "Deep Sea Fishing"]
  },
  {
    id: 3,
    name: "Mount Kenya National Park",
    region: "Central Kenya",
    description: "Africa's second-highest peak offers challenging climbs, diverse ecosystems, and breathtaking alpine scenery for adventure enthusiasts.",
    image: mountKenyaImage,
    properties: 32,
    averagePrice: "KSh 8,500",
    highlights: ["Point Lenana", "Alpine Lakes", "Unique Flora", "Mountain Climbing"],
    bestTime: "January - February",
    activities: ["Mountain Climbing", "Hiking", "Bird Watching", "Photography"]
  }
];

const popularDestinations = [
  { name: "Amboseli National Park", properties: 28, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400" },
  { name: "Lake Nakuru", properties: 35, image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=400" },
  { name: "Tsavo National Park", properties: 22, image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=400" },
  { name: "Lamu Island", properties: 41, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=400" }
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${maasaiMaraImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Explore Kenya's Destinations</h1>
          <p className="text-xl max-w-2xl mx-auto">
            From wildlife safaris to pristine beaches, discover the diverse beauty of Kenya
          </p>
        </div>
      </section>

      {/* Main Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Destinations</h2>
            <p className="text-xl text-muted-foreground">Discover the most sought-after locations in Kenya</p>
          </div>

          <div className="space-y-16">
            {destinations.map((destination, index) => (
              <Card key={destination.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-96 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        {destination.properties} Properties
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-2">{destination.name}</h3>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{destination.region}</span>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {destination.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline">{highlight}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                        <div>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Best Time</span>
                          </div>
                          <p className="font-medium">{destination.bestTime}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <Star className="h-4 w-4 mr-2" />
                            <span className="text-sm">From</span>
                          </div>
                          <p className="font-bold text-primary text-lg">{destination.averagePrice}/night</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button className="w-full lg:w-auto bg-primary hover:bg-primary/90">
                        View Properties in {destination.name.split(' ')[0]}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Popular Destinations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">More Destinations</h2>
            <p className="text-muted-foreground">Discover other amazing places across Kenya</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-48">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h4 className="text-white font-semibold text-lg mb-1">{dest.name}</h4>
                    <p className="text-white/80 text-sm">{dest.properties} properties available</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
