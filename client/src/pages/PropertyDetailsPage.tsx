import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type PropertyDetails = {
  id?: string;
  _id?: string;
  title: string;
  location: string;
  pricePerNight?: number;
  price?: number;
  description?: string;
  image?: string;
  images?: string[];
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  // Accept both 'property' and 'propertyData' from navigation
  const [property, setProperty] = useState<PropertyDetails | null>(
    (location.state as any)?.property ||
    (location.state as any)?.propertyData ||
    null
  );

  const [loading, setLoading] = useState(!property);
  const [error, setError] = useState<string | null>(null);

  // Helper to normalize images
  const normalizeImages = (p: PropertyDetails | null) => {
    if (!p) return [];
    if (Array.isArray(p.images)) return p.images;
    if (typeof p.image === "string") return [p.image];
    return [];
  };

  useEffect(() => {
    if (property || !id) {
      setLoading(false);
      return;
    }

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

  if (loading) return <p>Loading property details...</p>;
  if (error || !property) return <p>{error || "Property not found"}</p>;

  const images = normalizeImages(property);
  const price = Number(property.price ?? property.pricePerNight ?? 0);

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.location}</p>
      <p>KSh {price.toLocaleString()}</p>
      <p>{property.description || "Beautiful property with great amenities"}</p>

      {images.length > 0 ? (
        <div style={{ display: "flex", gap: "8px" }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${property.title} ${idx + 1}`}
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default PropertyDetailsPage;

