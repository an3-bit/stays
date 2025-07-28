import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

// --- Add Dummy Data Arrays & Conceptual Functions (above Properties component) ---
const counties = [
  { id: "nairobi", name: "Nairobi", slug: "nairobi" },
  { id: "mombasa", name: "Mombasa", slug: "mombasa" },
  { id: "kisumu", name: "Kisumu", slug: "kisumu" },
];

const propertiesData = [
  
  {
    id: "p1",
    countyId: "nairobi",
    title: "Urban Chic Loft",
    location: "Westlands",
    pricePerNight: 9500,
    rating: 4.9,
    reviewsCount: 87,
    amenities: ["WiFi", "Pool", "Parking"],
    images: [
      "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p2",
    countyId: "nairobi",
    title: "Garden View Apartment",
    location: "Kilimani",
    pricePerNight: 7200,
    rating: 4.7,
    reviewsCount: 54,
    amenities: ["WiFi", "Kitchen"],
    images: [
      "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p5",
    countyId: "nairobi",
    title: "Urban Oasis Apartment",
    location: "Upper Hill",
    pricePerNight: 8800,
    rating: 4.6,
    reviewsCount: 62,
    amenities: ["WiFi", "Gym", "Parking"],
    images: [
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p6",
    countyId: "nairobi",
    title: "Cozy Studio Downtown",
    location: "CBD",
    pricePerNight: 5500,
    rating: 4.5,
    reviewsCount: 41,
    amenities: ["WiFi", "Kitchenette"],
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: false,
  },
  {
    id: "p7",
    countyId: "nairobi",
    title: "Spacious Family Home",
    location: "Karen",
    pricePerNight: 12000,
    rating: 4.9,
    reviewsCount: 98,
    amenities: ["WiFi", "Garden", "Parking", "Pet-friendly"],
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p8",
    countyId: "nairobi",
    title: "Modern Penthouse Suite",
    location: "Lavington",
    pricePerNight: 15000,
    rating: 4.8,
    reviewsCount: 75,
    amenities: ["WiFi", "Pool", "Gym", "City View"],
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p9",
    countyId: "nairobi",
    title: "Riverside Apartment",
    location: "Riverside",
    pricePerNight: 9000,
    rating: 4.7,
    reviewsCount: 50,
    amenities: ["WiFi", "Balcony", "River View"],
    images: [
      "https://images.pexels.com/photos/259751/pexels-photo-259751.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p10",
    countyId: "nairobi",
    title: "Serene Garden Villa",
    location: "Runda",
    pricePerNight: 16000,
    rating: 4.9,
    reviewsCount: 110,
    amenities: ["WiFi", "Private Garden", "Pool", "Parking"],
    images: [
      "https://images.pexels.com/photos/259593/pexels-photo-259593.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  // Mombasa
  {
    id: "p3",
    countyId: "mombasa",
    title: "Beachfront Paradise",
    location: "Nyali",
    pricePerNight: 18000,
    rating: 4.8,
    reviewsCount: 102,
    amenities: ["Pool", "Beach Access", "Breakfast"],
    images: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: false,
  },
  {
    id: "p11",
    countyId: "mombasa",
    title: "Oceanfront Villa",
    location: "Diani",
    pricePerNight: 25000,
    rating: 4.9,
    reviewsCount: 150,
    amenities: ["Private Beach", "Pool", "Chef Service"],
    images: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p12",
    countyId: "mombasa",
    title: "Coastal Breeze Apartment",
    location: "Nyali",
    pricePerNight: 12000,
    rating: 4.7,
    reviewsCount: 70,
    amenities: ["WiFi", "Balcony", "Sea View"],
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p13",
    countyId: "mombasa",
    title: "Sandy Shores Bungalow",
    location: "Malindi",
    pricePerNight: 19000,
    rating: 4.8,
    reviewsCount: 90,
    amenities: ["Beach Access", "Garden", "Parking"],
    images: [
      "https://images.pexels.com/photos/246201/pexels-photo-246201.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: false,
  },
  {
    id: "p14",
    countyId: "mombasa",
    title: "Palm Tree Paradise",
    location: "Watamu",
    pricePerNight: 22000,
    rating: 4.9,
    reviewsCount: 110,
    amenities: ["Pool", "Tropical Garden", "WiFi"],
    images: [
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p15",
    countyId: "mombasa",
    title: "Coral Reef Cottage",
    location: "Kilifi",
    pricePerNight: 16000,
    rating: 4.6,
    reviewsCount: 60,
    amenities: ["Snorkeling", "Beach Access", "Kitchen"],
    images: [
      "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p16",
    countyId: "mombasa",
    title: "Sunset Beach House",
    location: "Ukunda",
    pricePerNight: 20000,
    rating: 4.8,
    reviewsCount: 85,
    amenities: ["Beachfront", "BBQ Area", "Parking"],
    images: [
      "https://images.pexels.com/photos/261189/pexels-photo-261189.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p17",
    countyId: "mombasa",
    title: "Azure Sea View Condo",
    location: "Mtwapa",
    pricePerNight: 13000,
    rating: 4.7,
    reviewsCount: 72,
    amenities: ["Sea View", "Pool", "Gym"],
    images: [
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  // Kisumu
  {
    id: "p4",
    countyId: "kisumu",
    title: "Lakeview Retreat",
    location: "Milimani",
    pricePerNight: 6500,
    rating: 4.6,
    reviewsCount: 33,
    amenities: ["WiFi", "Parking"],
    images: [
      "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p18",
    countyId: "kisumu",
    title: "Lakeside Guesthouse",
    location: "Tom Mboya Estate",
    pricePerNight: 7000,
    rating: 4.7,
    reviewsCount: 45,
    amenities: ["Lake View", "Garden", "WiFi"],
    images: [
      "https://images.pexels.com/photos/246728/pexels-photo-246728.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p19",
    countyId: "kisumu",
    title: "Hilltop View Cabin",
    location: "Riat Hills",
    pricePerNight: 8500,
    rating: 4.8,
    reviewsCount: 55,
    amenities: ["Panoramic View", "Balcony", "Quiet"],
    images: [
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p20",
    countyId: "kisumu",
    title: "Green Valley Farmhouse",
    location: "Muhoroni",
    pricePerNight: 9500,
    rating: 4.6,
    reviewsCount: 38,
    amenities: ["Farm Stay", "Fresh Produce", "Parking"],
    images: [
      "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: false,
  },
  {
    id: "p21",
    countyId: "kisumu",
    title: "City Center Loft",
    location: "Oginga Odinga Street",
    pricePerNight: 6000,
    rating: 4.5,
    reviewsCount: 30,
    amenities: ["Central Location", "Modern Decor", "WiFi"],
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p22",
    countyId: "kisumu",
    title: "Quiet Suburban Home",
    location: "Kondele",
    pricePerNight: 5800,
    rating: 4.4,
    reviewsCount: 25,
    amenities: ["Quiet Neighborhood", "Garden", "Parking"],
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: true,
  },
  {
    id: "p23",
    countyId: "kisumu",
    title: "Waterfront Apartment",
    location: "Dunga",
    pricePerNight: 7800,
    rating: 4.7,
    reviewsCount: 40,
    amenities: ["Waterfront", "Balcony", "Fishing"],
    images: [
      "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: true,
    isWeekendAvailable: true,
  },
  {
    id: "p24",
    countyId: "kisumu",
    title: "Rustic Countryside Retreat",
    location: "Awasi",
    pricePerNight: 6800,
    rating: 4.6,
    reviewsCount: 35,
    amenities: ["Countryside", "Peaceful", "Hiking"],
    images: [
      "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&w=800",
    ],
    isGuestFavorite: false,
    isWeekendAvailable: false,
  },
];

const handleWishlistToggle = (propertyId: string) => {
  // Implement wishlist logic here (e.g., update state, call API)
};

const useImageGallery = (images: string[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  return { currentImageIndex, nextImage, prevImage };
};


const PropertyModal = ({ property, onClose }: { property: any, onClose: () => void }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Confirming your booking...",
      description: "Please wait a moment.",
    });
    try {
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, propertyId: property?._id })
      });
      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking. Please try again.");
      }
      const { booking } = await bookingResponse.json();
      setIsBookingOpen(false);
      onClose();
      navigate("/booking-submitted", { state: { booking, property } });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (!property) return null;
  const rating = property.rating || 4.8;
  const reviews = property.reviews || 124;
  const location = property.location || "Kilimani, Nairobi";
  const guests = property.guests || 6;
  const beds = property.beds || 3;
  const baths = property.baths || 2;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 py-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold z-10">&times;</button>
        {/* Left: Image */}
        <div className="md:w-1/2 w-full p-4 flex items-center justify-center">
          <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-lg" />
        </div>
        {/* Right: Details */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-orange-100 text-orange-700 font-semibold">{property.type}</Badge>
              <span className="bg-white border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1 text-sm font-semibold ml-2">
                <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" /></svg>
                {rating}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h2>
            <div className="flex items-center text-muted-foreground mb-2">
              <svg className="h-4 w-4 mr-1 inline-block text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {location}
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-green-600 font-bold text-xl">KSh {property.price?.toLocaleString()}</span>
              <span className="text-muted-foreground text-base">/night</span>
              <span className="flex items-center text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" /></svg>
                {rating} ({reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-6 mb-2">
              <span className="flex items-center gap-1 text-muted-foreground"><svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v6m8 0a4 4 0 01-8 0" /></svg> {guests} guests</span>
              <span className="flex items-center gap-1 text-muted-foreground">🛏️ {beds} beds</span>
              <span className="flex items-center gap-1 text-muted-foreground"><svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 10V6a5 5 0 0110 0v4M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg> {baths} baths</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Description</span>
              <p className="text-muted-foreground">{property.desc}</p>
            </div>
          </div>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold mt-4">
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-primary">Book {property.title}</DialogTitle>
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
        </div>
      </div>
    </div>
  );
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [showAll, setShowAll] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSort = (order: string) => {
    setSortOrder(order);
    const sortedProperties = [...properties].sort((a, b) => {
      if (order === "price-asc") return a.price - b.price;
      if (order === "price-desc") return b.price - a.price;
      return 0;
    });
    setProperties(sortedProperties);
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const propertiesToShow = showAll ? filteredProperties : filteredProperties.slice(0, 6);

  if (loading) return <div className="text-center py-12">Loading properties...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* --- COUNTY LISTINGS SECTIONS (now showing up to 8 per section) --- */}
      <div className="county-listings-container">
        {counties.map((county) => {
          const popularHomes = propertiesData
            .filter((p) => p.countyId === county.id)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8);

          const weekendEscapes = propertiesData
            .filter((p) => p.countyId === county.id && p.isWeekendAvailable)
            .slice(0, 8);

          return (
            <div key={county.id} className="county-section mb-16">
              {/* Popular Homes Section */}
              <section className="popular-homes-section mb-8">
                <h2 className="section-header text-2xl font-bold mb-4">
                  Discover Your Perfect {county.name} Getaway
                </h2>
                <div className="popular-homes-grid grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6">
                  {popularHomes.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        {property.isGuestFavorite && <Badge className="mb-2">Guest Favorite</Badge>}
                        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{property.location}, {county.name}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">KES {property.pricePerNight.toLocaleString()} / night</span>
                          <Link
                            to={`/properties/${property.id}`}
                            state={{ property }}
                          >
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              {/* Available This Weekend Section */}
              <section className="weekend-escapes-section">
                <h2 className="section-header text-2xl font-bold mb-4">
                  Quick Escapes in {county.name} this Weekend!
                </h2>
                <div className="weekend-escapes-grid grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6">
                  {weekendEscapes.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        {property.isGuestFavorite && <Badge className="mb-2">Guest Favorite</Badge>}
                        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{property.location}, {county.name}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">KES {property.pricePerNight.toLocaleString()} / night</span>
                          <Link
                            to={`/properties/${property.id}`}
                            state={{ property }}
                          >
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          );
        })}
      </div>
      {/* --- END COUNTY LISTINGS SECTIONS --- */}

      {/* All Properties Section */}
      <header className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">All Properties</h1>
          <p className="text-muted-foreground">Find your perfect getaway.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Input
            type="text"
            placeholder="Search by name..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Price</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => handleSort("price-asc")}>Low to High</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSort("price-desc")}>High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertiesToShow.map((property) => (
            <Card key={property._id} className="overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <Badge className="mb-2">{property.type}</Badge>
                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{property.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">KSh {property.price.toLocaleString()}</span>
                  <Link
                    to={`/properties/${property._id}`}
                    state={{ property }}
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!showAll && filteredProperties.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8" onClick={() => setShowAll(true)}>
              View All Properties
            </Button>
          </div>
        )}
      </main>
      <Footer />
      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
};

export default Properties;