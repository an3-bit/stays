import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const PropertySection = ({ title, properties }) => {
  const navigate = useNavigate();
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center">
          {title} <span className="ml-1 text-primary">›</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:gap-4 md:overflow-x-auto pb-2 hide-scrollbar">
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-full md:min-w-[260px] md:max-w-[260px] md:flex-shrink-0 cursor-pointer group"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
              <div className="relative h-40 w-full">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-white/90 text-xs text-black font-semibold px-2 py-1 rounded shadow">Guest favorite</Badge>
                </div>
                <button className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-white">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 group-hover:text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </button>
                <div className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1 flex items-center gap-1 text-xs font-medium shadow">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  {property.rating}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="font-semibold text-sm truncate mb-1">{property.name}</div>
                <div className="text-xs text-muted-foreground truncate mb-1">{property.price}</div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{property.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertySection; 