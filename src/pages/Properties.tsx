import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Wifi, Car, Coffee, Users, Bath, Heart, Filter, Search } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Luxury Safari Lodge Nairobi",
    location: "Kilimani, Nairobi",
    price: "KSh 8,500",
    originalPrice: "KSh 10,000",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800",
    amenities: ["Wi-Fi", "Parking", "Kitchen", "Pool", "AC", "Gym"],
    beds: 3,
    baths: 2,
    guests: 6,
    featured: true,
    discount: 15
  },
  {
    id: 2,
    name: "Coastal Paradise Villa",
    location: "Diani Beach, Mombasa",
    price: "KSh 12,000",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800",
    amenities: ["Wi-Fi", "Beach Access", "AC", "Pool", "Kitchen"],
    beds: 4,
    baths: 3,
    guests: 8,
    featured: true
  },
  {
    id: 3,
    name: "Mountain View Retreat",
    location: "Nanyuki, Mt. Kenya",
    price: "KSh 6,800",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800",
    amenities: ["Wi-Fi", "Fireplace", "Garden", "Parking", "Kitchen"],
    beds: 2,
    baths: 2,
    guests: 4
  },
  {
    id: 4,
    name: "Lakeside Lodge Nakuru",
    location: "Lake Nakuru, Nakuru",
    price: "KSh 7,200",
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800",
    amenities: ["Wi-Fi", "Lake View", "Restaurant", "Parking"],
    beds: 2,
    baths: 1,
    guests: 4
  },
  {
    id: 5,
    name: "Urban Chic Apartment",
    location: "Westlands, Nairobi",
    price: "KSh 5,500",
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800",
    amenities: ["Wi-Fi", "City View", "AC", "Parking", "Kitchen"],
    beds: 1,
    baths: 1,
    guests: 2
  },
  {
    id: 6,
    name: "Safari Camp Experience",
    location: "Maasai Mara, Narok",
    price: "KSh 18,000",
    originalPrice: "KSh 22,000",
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800",
    amenities: ["All Meals", "Game Drives", "Wi-Fi", "Spa"],
    beds: 1,
    baths: 1,
    guests: 2,
    featured: true,
    discount: 18
  }
];

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse through our carefully curated collection of accommodations across Kenya
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-white/80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-white/80">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">4.8★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by location or property name..." 
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">KSh 0 - 5,000</SelectItem>
                  <SelectItem value="mid">KSh 5,000 - 10,000</SelectItem>
                  <SelectItem value="high">KSh 10,000+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="6">6+ Guests</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="lodge">Lodge</SelectItem>
                  <SelectItem value="camp">Safari Camp</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Available Properties</h2>
              <p className="text-muted-foreground">{properties.length} properties found</p>
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by: Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Property Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.featured && (
                      <Badge className="bg-secondary text-secondary-foreground">
                        Featured
                      </Badge>
                    )}
                    {property.discount && (
                      <Badge className="bg-red-500 text-white">
                        -{property.discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Rating & Wishlist */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Property Info */}
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
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">{property.price}</span>
                          {property.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {property.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-muted-foreground text-sm">/night</span>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;