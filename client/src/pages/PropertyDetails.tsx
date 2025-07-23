import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Users, Bath } from "lucide-react";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { propertyPrefetchCache } from "@/components/FeaturedProperties";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  let initialProperty = routerLocation.state?.property || null;
  // Try to get from prefetch cache if not in navigation state
  if (!initialProperty && id && propertyPrefetchCache[id]) {
    initialProperty = propertyPrefetchCache[id];
  }
  const [property, setProperty] = useState(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (property) return;
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, property]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading property details...</div>;
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

  const {
    title,
    type,
    price,
    desc,
    location,
    guests,
    beds,
    baths,
    images = [],
    amenities = [],
    rating = 4.8,
    reviews = 0,
  } = property;

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
              <div className="grid grid-cols-2 gap-2 h-80 md:h-[400px]">
                {images.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover rounded cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              {images.length > 4 && (
                <Button
                  className="absolute bottom-4 right-4 bg-white/80 text-black"
                  onClick={() => setSelectedImage(images[0])}
                >
                  Show all photos
                </Button>
              )}
              {/* Modal for full image */}
              {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSelectedImage(null)}>
                  <img src={selectedImage} alt="Property" className="max-h-[90vh] max-w-[90vw] rounded shadow-2xl" />
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
                <span className="text-lg font-semibold text-primary">KSh {price?.toLocaleString()}</span>
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
                <h4 className="font-semibold mb-2">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.length > 0 ? amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <span>✔️</span> <span>{am}</span>
                    </div>
                  )) : <span className="text-muted-foreground">No amenities listed.</span>}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetails; 