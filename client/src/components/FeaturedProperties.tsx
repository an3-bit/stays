import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch("https://safari-stays-kenya-connect.onrender.com/api/properties?featured=true"); // Assuming an endpoint for featured
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setProperties(data.slice(0, 3)); // Show first 3 featured
      } catch (err) {
        console.error("Failed to fetch featured properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);

  if (loading) {
    return <div>Loading featured properties...</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Stays</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property._id} className="overflow-hidden">
              <Link to={`/property/${property._id}`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
              </Link>
              <CardContent className="p-4">
                <Badge className="mb-2">{property.type}</Badge>
                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 truncate">{property.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">KSh {property.price.toLocaleString()}</span>
                  <Link to={`/property/${property._id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;