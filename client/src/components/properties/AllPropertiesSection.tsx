import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AllPropertiesSectionProps {
  properties: any[]; // Replace 'any' with a more specific type if available
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSort: (order: string) => void;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  setSelectedProperty: (property: any) => void; // Replace 'any' with a more specific type if available
}

const AllPropertiesSection = ({
  properties,
  searchTerm,
  setSearchTerm,
  handleSort,
  showAll,
  setShowAll,
  setSelectedProperty,
}: AllPropertiesSectionProps) => {
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const propertiesToShow = showAll
    ? filteredProperties
    : filteredProperties.slice(0, 6);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search by name..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort by</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Price</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => handleSort("price-asc")}>
              Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSort("price-desc")}>
              High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertiesToShow.map((property) => (
          <Card
            key={property._id}
            className="overflow-hidden cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <Badge className="mb-2">{property.type}</Badge>
              <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{property.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">
                  KSh {property.price.toLocaleString()}
                </span>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProperty(property);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {!showAll && filteredProperties.length > 6 && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8"
            onClick={() => setShowAll(true)}
          >
            View All Properties
          </Button>
        </div>
      )}
    </main>
  );
};

export default AllPropertiesSection;