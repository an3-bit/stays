import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PropertyDetails {
  // Define the structure of your property data here
  id: string;
  name: string;
  // ... other property details
}

const PropertyDetailsPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error(`Error fetching property: ${response.statusText}`);
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
      setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return <div>Loading property details...</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div>
      <h1>Property Details</h1>
      <p>Property ID: {property.id}</p>
      {/* Add more property details here later */}
    </div>
  );
};

export default PropertyDetailsPage;