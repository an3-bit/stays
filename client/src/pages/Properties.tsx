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
  // ...add more properties as needed
];

// Conceptual wishlist toggle
const handleWishlistToggle = (propertyId: string) => {
  // Implement wishlist logic here (e.g., update state, call API)
};

// Conceptual image gallery hook
const useImageGallery = (images: string[]) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  return { currentImageIndex, nextImage, prevImage };
};

const featuredProperties = [
  {
    _id: "f1",
    title: "Diani Beach Villa",
    type: "Villa",
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&w=800",
    desc: "A stunning beachfront villa in Diani, Kenya.",
    price: 15000
  },
  {
    _id: "f2",
    title: "Maasai Mara Safari Lodge",
    type: "Deluxe Suite",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
    desc: "Experience the wild in luxury at Maasai Mara.",
    price: 25000
  },
  {
    _id: "f3",
    title: "Nairobi City Apartment",
    type: "Apartment",
    image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
    desc: "Modern comfort in the heart of Nairobi.",
    price: 8500
  }
];

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

      {/* --- NEW COUNTY LISTINGS SECTIONS --- */}
      <div className="county-listings-container">
        {counties.map((county) => {
          const popularHomes = propertiesData
            .filter((p) => p.countyId === county.id)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);

          const weekendEscapes = propertiesData
            .filter((p) => p.countyId === county.id && p.isWeekendAvailable)
            .slice(0, 4);

          return (
            <div key={county.id} className="county-section mb-16">
              {/* Popular Homes Section */}
              <section className="popular-homes-section mb-8">
                <h2 className="section-header text-2xl font-bold mb-4">
                  Discover Your Perfect {county.name} Getaway
                </h2>
                <div className="popular-homes-grid scrollable-row no-scrollbar flex gap-6 overflow-x-auto">
                  {popularHomes[0] && (
                    <div className="property-card featured-card hoverable min-w-[340px] max-w-[400px] bg-white rounded-xl shadow-lg p-4 mr-4 transition-transform duration-200 hover:scale-105">
                      <div className="property-image-gallery relative mb-3">
                        <img
                          src={popularHomes[0].images[0]}
                          alt={popularHomes[0].title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button className="gallery-nav prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* ← */}</button>
                        <button className="gallery-nav next absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* → */}</button>
                      </div>
                      {popularHomes[0].isGuestFavorite && (
                        <span className="badge guest-favorite bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold mb-2 inline-block">
                          Guest Favorite
                        </span>
                      )}
                      <button
                        className="wishlist-icon absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition"
                        onClick={() => handleWishlistToggle(popularHomes[0].id)}
                        aria-label="Save to wishlist"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>
                      <h3 className="font-bold text-lg mb-1">{popularHomes[0].title}</h3>
                      <p className="location text-muted-foreground mb-1">{popularHomes[0].location}, {county.name}</p>
                      <p className="price price-highlight text-orange-600 font-bold text-xl mb-1">
                        KES {popularHomes[0].pricePerNight} / night
                      </p>
                      <p className="rating text-sm text-muted-foreground mb-2">
                        ⭐ {popularHomes[0].rating} ({popularHomes[0].reviewsCount} reviews)
                      </p>
                      <div className="amenities-row flex gap-2 mb-2">
                        {popularHomes[0].amenities.map((amenity, i) => (
                          <span key={i} className="amenity-icon bg-gray-100 px-2 py-1 rounded text-xs">{amenity}</span>
                        ))}
                      </div>
                      <a href="#" className="view-details-btn text-orange-500 font-semibold underline hover:text-orange-700 transition">
                        View Details
                      </a>
                    </div>
                  )}
                  {popularHomes.slice(1).map((property) => (
                    <div key={property.id} className="property-card hoverable min-w-[260px] max-w-[300px] bg-white rounded-lg shadow p-3 transition-transform duration-200 hover:scale-105">
                      <div className="property-image-gallery relative mb-2">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-36 object-cover rounded"
                        />
                        <button className="gallery-nav prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* ← */}</button>
                        <button className="gallery-nav next absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* → */}</button>
                      </div>
                      {property.isGuestFavorite && (
                        <span className="badge guest-favorite bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold mb-2 inline-block">
                          Guest Favorite
                        </span>
                      )}
                      <button
                        className="wishlist-icon absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition"
                        onClick={() => handleWishlistToggle(property.id)}
                        aria-label="Save to wishlist"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>
                      <h3 className="font-bold text-base mb-1">{property.title}</h3>
                      <p className="location text-muted-foreground mb-1">{property.location}, {county.name}</p>
                      <p className="price text-orange-600 font-semibold mb-1">
                        KES {property.pricePerNight} / night
                      </p>
                      <p className="rating text-xs text-muted-foreground mb-2">
                        ⭐ {property.rating} ({property.reviewsCount} reviews)
                      </p>
                      <div className="amenities-row flex gap-1 mb-2">
                        {property.amenities.map((amenity, i) => (
                          <span key={i} className="amenity-icon bg-gray-100 px-2 py-1 rounded text-xs">{amenity}</span>
                        ))}
                      </div>
                      <a href="#" className="view-details-btn text-orange-500 font-semibold underline hover:text-orange-700 transition">
                        View Details
                      </a>
                    </div>
                  ))}
                </div>
              </section>
              {/* Available This Weekend Section */}
              <section className="weekend-escapes-section">
                <h2 className="section-header text-2xl font-bold mb-4">
                  Quick Escapes in {county.name} this Weekend!
                </h2>
                <div className="weekend-escapes-grid scrollable-row no-scrollbar flex gap-6 overflow-x-auto">
                  {weekendEscapes.map((property) => (
                    <div key={property.id} className="property-card hoverable min-w-[260px] max-w-[300px] bg-white rounded-lg shadow p-3 transition-transform duration-200 hover:scale-105">
                      <div className="property-image-gallery relative mb-2">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-36 object-cover rounded"
                        />
                        <button className="gallery-nav prev absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* ← */}</button>
                        <button className="gallery-nav next absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1">{/* → */}</button>
                      </div>
                      {property.isGuestFavorite && (
                        <span className="badge guest-favorite bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold mb-2 inline-block">
                          Guest Favorite
                        </span>
                      )}
                      <button
                        className="wishlist-icon absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition"
                        onClick={() => handleWishlistToggle(property.id)}
                        aria-label="Save to wishlist"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>
                      <h3 className="font-bold text-base mb-1">{property.title}</h3>
                      <p className="location text-muted-foreground mb-1">{property.location}, {county.name}</p>
                      <p className="price text-orange-600 font-semibold mb-1">
                        KES {property.pricePerNight} / night
                      </p>
                      <p className="rating text-xs text-muted-foreground mb-2">
                        ⭐ {property.rating} ({property.reviewsCount} reviews)
                      </p>
                      <div className="amenities-row flex gap-1 mb-2">
                        {property.amenities.map((amenity, i) => (
                          <span key={i} className="amenity-icon bg-gray-100 px-2 py-1 rounded text-xs">{amenity}</span>
                        ))}
                      </div>
                      <a href="#" className="view-details-btn text-orange-500 font-semibold underline hover:text-orange-700 transition">
                        View Details
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          );
        })}
      </div>
      {/* --- END COUNTY LISTINGS SECTIONS --- */}

      {/* Featured Properties Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <Card key={property._id} className="overflow-hidden cursor-pointer" onClick={() => setSelectedProperty(property)}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                <CardContent className="p-4">
                  <Badge className="mb-2">{property.type}</Badge>
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 truncate">{property.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">KSh {property.price.toLocaleString()}</span>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={e => {e.stopPropagation(); setSelectedProperty(property);}}>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
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
            <Card key={property._id} className="overflow-hidden cursor-pointer" onClick={() => setSelectedProperty(property)}>
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
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={e => {e.stopPropagation(); setSelectedProperty(property);}}>View Details</Button>
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
