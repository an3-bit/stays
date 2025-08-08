import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface PropertyDetails {
  // Define the structure of your property data here
  id: string;
  name: string;
  // ... other property details
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [property, setProperty] = useState<PropertyDetails | null>(location.state?.propertyData || null);
  const [loading, setLoading] = useState(!location.state?.propertyData);

  useEffect(() => {
    if (property) return; // If property data was passed in state, no need to fetch
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
    if (!property) fetchProperty();
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