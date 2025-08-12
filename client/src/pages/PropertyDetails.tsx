
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Star, Share2, Heart, Users, Bath, User } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { propertyPrefetchCache } from "@/components/FeaturedProperties";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// TypeScript interfaces
interface Property {
  id?: string;
  _id?: string;
  title: string;
  price?: number;
  pricePerNight?: number;
  description?: string;
  desc?: string;
  location: string;
  guests?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
  rating?: number;
  reviews?: number;
  reviewsCount?: number;
  images?: string[];
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  host?: {
    name: string;
    avatar?: string;
  };
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  message: string;
  checkIn: string;
  checkOut: string;
}

// ✅ Custom Leaflet Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { toast } = useToast();

  let initialProperty: Property | null =
    (routerLocation.state as any)?.property ||
    (routerLocation.state as any)?.propertyData ||
    null;

  if (!initialProperty && id && propertyPrefetchCache[id]) {
    initialProperty = propertyPrefetchCache[id];
  }

  const [property, setProperty] = useState<Property | null>(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    guests: "",
    message: "",
    checkIn: "",
    checkOut: ""
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: "selection"
    }
  ]);

  const normalizeImages = useCallback((p: Property | null): string[] => {
    if (!p) return [];
    
    let propertyImages: string[] = [];
    if (Array.isArray(p.images)) {
      propertyImages = p.images;
    } else if (typeof p.image === "string") {
      propertyImages = [p.image];
    }
    
    // High-quality property images to use as defaults/fallbacks
    const defaultPropertyImages = [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern living room
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Stylish bedroom
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern kitchen
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Bathroom
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Dining area
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Balcony/outdoor
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Building exterior
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Another interior view
    ];
    
    // Fill with high-quality property images if we don't have enough
    while (propertyImages.length < 5) {
      propertyImages.push(defaultPropertyImages[propertyImages.length % defaultPropertyImages.length]);
    }
    
    return propertyImages;
  }, []);

  // Memoized property data to prevent unnecessary re-renders
  const propertyData = useMemo(() => {
    if (!property) return null;
    
    return {
      title: property.title || "Property Title",
      price: property.price || property.pricePerNight || 0,
      desc: property.description || property.desc || "Beautiful property with great amenities",
      location: property.location || "Nairobi, Kenya",
      guests: property.guests || 4,
      beds: property.beds || 2,
      baths: property.baths || 1,
      amenities: property.amenities || [],
      rating: property.rating || 4.8,
      reviews: property.reviewsCount || property.reviews || 0,
      host: property.host || { name: "Host Name", avatar: "" },
      priceNum: Number(property.price || property.pricePerNight || 0),
      coords: property.coordinates
        ? [property.coordinates.lat, property.coordinates.lng] as LatLngExpression
        : [-1.286389, 36.817223] as LatLngExpression
    };
  }, [property]);

  const images = useMemo(() => normalizeImages(property), [property, normalizeImages]);

  const handleBookingSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    toast({ title: "Confirming your booking...", description: "Please wait a moment." });

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const bookingResponse = await fetch(`${apiBase}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          checkIn: dateRange[0].startDate.toISOString(),
          checkOut: dateRange[0].endDate.toISOString(),
          propertyId: property?.id || property?._id
        })
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create booking.");
      }
      
      const { booking } = await bookingResponse.json();
      setIsBookingOpen(false);
      navigate("/booking-submitted", { state: { booking, property } });
    } catch (err) {
      toast({
        title: "Booking Error",
        description: (err as Error)?.message || "Unable to process your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, dateRange, property, navigate, toast]);

  const handleInputChange = useCallback((field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    if (property) return;
    const fetchProperty = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBase}/api/properties/${id}`);
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError((err as Error)?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, property]);

  // Early returns after all hooks
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !property) return <div className="min-h-screen flex items-center justify-center">Property Not Found</div>;
  if (!propertyData) return <div className="min-h-screen flex items-center justify-center">Property Not Found</div>;

  const { title, price, desc, location, guests, beds, baths, amenities, rating, reviews, host, priceNum, coords } = propertyData;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <Navigation />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>← Back</Button>
        <div className="flex justify-between items-center mt-2">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              {rating} · {reviews} reviews · <MapPin className="h-4 w-4 mx-1" /> {location}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm"><Share2 className="h-4 w-4 mr-1" /> Share</Button>
            <Button variant="ghost" size="sm"><Heart className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </div>
      </div>

      {/* Gallery - Airbnb Style */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
          {/* Main large image - left side */}
          <div className="col-span-2 row-span-2">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Top right images */}
          <div className="col-span-1 row-span-1">
            <img
              src={images[1]}
              alt={`${title} - Image 2`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={images[2]}
              alt={`${title} - Image 3`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom right images */}
          <div className="col-span-1 row-span-1">
            <img
              src={images[3]}
              alt={`${title} - Image 4`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1 relative">
            <img
              src={images[4]}
              alt={`${title} - Image 5`}
              className="w-full h-full object-cover"
            />
            {/* Show all photos button overlay */}
            {images.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-black hover:bg-gray-100 font-medium px-4 py-2 rounded-lg shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Show all photos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center"><Users className="h-4 w-4 mr-1" /> {guests} guests</div>
            <div>🛏 {beds} beds</div>
            <div><Bath className="h-4 w-4 mr-1" /> {baths} baths</div>
          </div>
          <p className="text-gray-700">{desc}</p>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {amenities.map((a: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-green-600">✓</span> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <DateRange
              editableDateInputs
              onChange={(item) => {
                const selection = item.selection as Range;
                if (selection.startDate && selection.endDate) {
                  setDateRange([{
                    startDate: selection.startDate,
                    endDate: selection.endDate,
                    key: "selection"
                  }]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              minDate={new Date()}
            />
          </div>

          {/* Host */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Meet your host</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-6">
                {/* Host Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={host.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                    alt={host.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                  />
                </div>
                
                {/* Host Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{host.name}</h3>
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                      Superhost
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">4.9</span>
                      <span>(127 reviews)</span>
                    </div>
                    <div>•</div>
                    <div>3 years hosting</div>
                    <div>•</div>
                    <div>Speaks English, Swahili</div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Welcome to my beautiful property! I'm passionate about providing exceptional stays and ensuring my guests have memorable experiences. I love sharing local recommendations and helping visitors discover the best of our area.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      Contact host
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Usually responds within an hour</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Host Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">127</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Years hosting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
            <div className="rounded-lg overflow-hidden">
              {/* @ts-ignore - Leaflet types issue */}
              <MapContainer
                center={coords}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                scrollWheelZoom={false}
              >
                {/* @ts-ignore - Leaflet types issue */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {/* @ts-ignore - Leaflet types issue */}
                <Marker position={coords} icon={customIcon}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 shadow-lg sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">KSh {priceNum.toLocaleString()}</span>
              <span className="text-gray-500">/ night</span>
            </div>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Book Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book {title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max={guests}
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      placeholder={`Max ${guests} guests`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Special Requests</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Any special requests or requirements?"
                      rows={3}
                    />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Selected Dates:</p>
                    <p className="font-medium">
                      {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {Math.ceil((dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
