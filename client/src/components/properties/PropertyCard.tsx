import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    pricePerNight: number;
    rating: number;
    reviewsCount: number;
    amenities: string[];
    images: string[];
    isGuestFavorite: boolean;
  };
  countyName: string;
  handleWishlistToggle: (propertyId: string) => void;
  isFeatured?: boolean;
}

const PropertyCard = ({
  property,
  countyName,
  handleWishlistToggle,
  isFeatured = false,
}: PropertyCardProps) => {
  const cardClass = isFeatured
    ? "property-card featured-card hoverable min-w-[340px] max-w-[400px] bg-white rounded-xl shadow-lg p-4 mr-4 transition-transform duration-200 hover:scale-105"
    : "property-card hoverable min-w-[260px] max-w-[300px] bg-white rounded-lg shadow p-3 transition-transform duration-200 hover:scale-105";
  const imageClass = isFeatured ? "w-full h-48 object-cover rounded-lg" : "w-full h-36 object-cover rounded";

  return (
    <div key={property.id} className={cardClass}>
      <div className="property-image-gallery relative mb-2">
        <img src={property.images[0]} alt={property.title} className={imageClass} />
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
      <p className="location text-muted-foreground mb-1">
        {property.location}, {countyName}
      </p>
      <p className="price text-orange-600 font-semibold mb-1">
        KES {property.pricePerNight} / night
      </p>
      <p className="rating text-xs text-muted-foreground mb-2">
        ⭐ {property.rating} ({property.reviewsCount} reviews)
      </p>
      <div className="amenities-row flex gap-1 mb-2">
        {property.amenities.map((amenity, i) => (
          <span key={i} className="amenity-icon bg-gray-100 px-2 py-1 rounded text-xs">
            {amenity}
          </span>
        ))}
      </div>
      <Link
        to={`/properties/${property.id}`}
        className="view-details-btn text-orange-500 font-semibold underline hover:text-orange-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default PropertyCard;