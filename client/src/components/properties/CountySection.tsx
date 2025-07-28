import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

interface CountySectionProps {
  county: {
    id: string;
    name: string;
    slug: string;
  };
  propertiesData: any[]; // Replace 'any' with a more specific type if available
  handleWishlistToggle: (propertyId: string) => void;
}

const CountySection = ({
  county,
  propertiesData,
  handleWishlistToggle,
}: CountySectionProps) => {
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
        <div className="popular-homes-grid scrollable-row no-scrollbar flex gap-6 overflow-x-auto">
          {popularHomes[0] && (
            <PropertyCard
              property={popularHomes[0]}
              countyName={county.name}
              handleWishlistToggle={handleWishlistToggle}
              isFeatured={true}
            />
          )}
          {popularHomes.slice(1).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              countyName={county.name}
              handleWishlistToggle={handleWishlistToggle}
            />
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
            <PropertyCard
              key={property.id}
              property={property}
              countyName={county.name}
              handleWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CountySection;