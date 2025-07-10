import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Users, Bath } from "lucide-react";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: ""
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingOpen(false);
    navigate("/booking-confirmation");
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-80 md:h-auto">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-secondary text-secondary-foreground">Popular</Badge>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
            {/* Details */}
            <CardContent className="p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-semibold text-primary">{property.price}</span>
                <span className="text-muted-foreground">/night</span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {property.rating} ({property.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" /> {property.guests} guests
                </div>
                <div className="flex items-center">
                  <span className="mr-1">🛏️</span> {property.beds} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" /> {property.baths} baths
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <Badge key={idx} variant="outline">{amenity}</Badge>
                  ))}
                </div>
              </div>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Book {property.name}</DialogTitle>
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
                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="guests">Guests</Label>
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Check In</Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Check Out</Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                          required
                        />
                      </div>
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
                      Confirm Booking
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails; 