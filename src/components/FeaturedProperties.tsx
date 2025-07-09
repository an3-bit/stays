import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Bath } from "lucide-react";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Safari Lodge Nairobi",
    location: "Kilimani, Nairobi",
    price: "KSh 8,500",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800",
    amenities: ["Wi-Fi", "Parking", "Kitchen", "Pool"],
    beds: 3,
    baths: 2,
    guests: 6
  },
  {
    id: 2,
    name: "Coastal Retreat Mombasa",
    location: "Diani Beach, Mombasa",
    price: "KSh 12,000",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800",
    amenities: ["Wi-Fi", "Beach Access", "AC", "Pool"],
    beds: 4,
    baths: 3,
    guests: 8
  },
  {
    id: 3,
    name: "Mountain View Villa",
    location: "Nanyuki, Mt. Kenya",
    price: "KSh 6,800",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800",
    amenities: ["Wi-Fi", "Fireplace", "Garden", "Parking"],
    beds: 2,
    baths: 2,
    guests: 4
  }
];

const FeaturedProperties = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Popular Homes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the finest accommodations across Kenya
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              {/* Property Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-secondary text-secondary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Property Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {property.reviews} reviews
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {property.guests}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🛏️</span>
                        {property.beds}
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.baths}
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-primary">{property.price}</span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90" onClick={e => {e.stopPropagation(); navigate(`/property/${property.id}`);}}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;