import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Star, Users, Bath } from "lucide-react";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { propertyPrefetchCache } from "@/components/FeaturedProperties";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { toast } = useToast();

  // Accept both 'property' and 'propertyData' keys from navigation
  let initialProperty =
    (routerLocation.state as any)?.property ||
    (routerLocation.state as any)?.propertyData ||
    null;

  // Try to get from prefetch cache if not in navigation state
  if (!initialProperty && id && propertyPrefetchCache[id]) {
    initialProperty = propertyPrefetchCache[id];
  }

  const [property, setProperty] = useState(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  // Helper to normalize images
  const normalizeImages = (p: any) => {
    if (!p) return [];
    if (Array.isArray(p.images)) return p.images;
    if (typeof p.image === "string") return [p.image];
    return [];
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Confirming your booking...",
      description: "Please wait a moment."
    });
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const bookingResponse = await fetch(`${apiBase}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyId: property?.id || property?._id
        })
      });
      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking. Please try again.");
      }
      const { booking } = await bookingResponse.json();
      setIsBookingOpen(false);
      navigate("/booking-submitted", { state: { booking, property } });
    } catch (err) {
      toast({
        title: "Error",
        description:
          (err as Error)?.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading property details...
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Handle both data structures
  const {
    title,
    type,
    price = property.pricePerNight,
    desc = property.description || "Beautiful property with great amenities",
    location,
    guests = property.guests || 4,
    beds = property.beds || 2,
    baths = property.baths || 1,
    amenities = property.amenities || [],
    rating = property.rating || 4.8,
    reviews = property.reviewsCount || property.reviews || 0
  } = property;

  const priceNum = Number(price) || 0;
  const images = normalizeImages(property);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Gallery */}
            <div className="relative">
              {images.length === 1 ? (
                <div className="h-80 md:h-[400px]">
                  <img
                    src={images[0]}
                    alt={title}
                    className="w-full h-full object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(images[0])}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 h-80 md:h-[400px]">
                  {images.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${title} - Image ${i + 1}`}
                      className={`w-full h-full object-cover rounded cursor-pointer ${
                        i === 0 && images.length > 2 ? "col-span-2" : ""
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
              {images.length > 4 && (
                <Button
                  className="absolute bottom-4 right-4 bg-white/80 text-black hover:bg-white"
                  onClick={() => setSelectedImage(images[0])}
                >
                  +{images.length - 4} more photos
                </Button>
              )}
              {selectedImage && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-h-[90vh] max-w-[90vw]">
                    <img
                      src={selectedImage}
                      alt="Property"
                      className="max-h-[90vh] max-w-[90vw] rounded shadow-2xl"
                    />
                    <button
                      className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                      onClick={() => setSelectedImage(null)}
                    >
                      ✕
                    </button>
                    {images.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = images.indexOf(selectedImage);
                            const prevIndex =
                              currentIndex === 0
                                ? images.length - 1
                                : currentIndex - 1;
                            setSelectedImage(images[prevIndex]);
                          }}
                        >
                          ←
                        </button>
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = images.indexOf(selectedImage);
                            const nextIndex =
                              currentIndex === images.length - 1
                                ? 0
                                : currentIndex + 1;
                            setSelectedImage(images[nextIndex]);
                          }}
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Details */}
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-semibold text-primary">
                  KSh {priceNum.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/night</span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {rating} ({reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" /> {guests} guests
                </div>
                <div className="flex items-center">
                  <span className="mr-1">🛏️</span> {beds} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" /> {baths} baths
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{desc}</p>
              </div>
              {/* Amenities */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">What this place offers</h4>
                {amenities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {amenities.map((amenity: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-green-600 text-lg">✓</span>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground bg-gray-50 p-4 rounded-lg">
                    <p>No specific amenities listed for this property.</p>
                    <p className="text-sm mt-1">
                      Contact the host for more details about available
                      facilities.
                    </p>
                  </div>
                )}
              </div>
              {/* Book Now Button */}
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 mt-6">
                    Book Now - KSh {priceNum.toLocaleString()}/night
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-primary text-xl">
                      Book {title}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          placeholder="+254 700 000 000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests *</Label>
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max={guests}
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              guests: e.target.value
                            })
                          }
                          required
                          placeholder={`Max ${guests} guests`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Check-in Date *</Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              checkIn: e.target.value
                            })
                          }
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Check-out Date *</Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              checkOut: e.target.value
                            })
                          }
                          required
                          min={
                            formData.checkIn ||
                            new Date().toISOString().split("T")[0]
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Any special requirements, dietary restrictions, or requests..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Price per night:</span>
                        <span className="font-semibold">
                          KSh {priceNum.toLocaleString()}
                        </span>
                      </div>
                      {formData.checkIn && formData.checkOut && (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span>Number of nights:</span>
                            <span className="font-semibold">
                              {Math.ceil(
                                (new Date(formData.checkOut).getTime() -
                                  new Date(formData.checkIn).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                            <span>Total:</span>
                            <span className="text-orange-600">
                              KSh{" "}
                              {(
                                priceNum *
                                Math.ceil(
                                  (new Date(formData.checkOut).getTime() -
                                    new Date(formData.checkIn).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              ).toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3"
                    >
                      Confirm Booking
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
