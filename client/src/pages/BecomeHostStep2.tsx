import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Wifi, Car, Coffee, Tv, Wind, Waves, Shield, Camera, Flame, Utensils, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostStep2 = () => {
  const navigate = useNavigate();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [suggestedAmenities, setSuggestedAmenities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load previous step data
  useEffect(() => {
    const step1Data = sessionStorage.getItem('hostListingStep1');
    if (!step1Data) {
      navigate('/become-host/listing/step1');
      return;
    }

    const data = JSON.parse(step1Data);
    generateSmartSuggestions(data);
  }, [navigate]);

  const coreAmenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi, category: 'essential' },
    { id: 'parking', label: 'Free parking', icon: Car, category: 'essential' },
    { id: 'kitchen', label: 'Kitchen', icon: Utensils, category: 'essential' },
    { id: 'tv', label: 'TV', icon: Tv, category: 'essential' },
    { id: 'ac', label: 'Air conditioning', icon: Wind, category: 'comfort' },
    { id: 'heating', label: 'Heating', icon: Flame, category: 'comfort' },
    { id: 'coffee', label: 'Coffee maker', icon: Coffee, category: 'comfort' },
    { id: 'pool', label: 'Pool', icon: Waves, category: 'luxury' },
    { id: 'gym', label: 'Gym', icon: Sparkles, category: 'luxury' }
  ];

  const uniqueFeatures = [
    { id: 'ocean-view', label: 'Ocean view', icon: Waves, category: 'view' },
    { id: 'mountain-view', label: 'Mountain view', icon: Waves, category: 'view' },
    { id: 'city-view', label: 'City view', icon: Waves, category: 'view' },
    { id: 'garden', label: 'Garden or backyard', icon: Sparkles, category: 'outdoor' },
    { id: 'balcony', label: 'Balcony', icon: Sparkles, category: 'outdoor' },
    { id: 'terrace', label: 'Terrace', icon: Sparkles, category: 'outdoor' },
    { id: 'bbq', label: 'BBQ grill', icon: Flame, category: 'outdoor' },
    { id: 'fireplace', label: 'Fireplace', icon: Flame, category: 'comfort' }
  ];

  const safetyFeatures = [
    { id: 'smoke-alarm', label: 'Smoke alarm', icon: Shield, category: 'safety' },
    { id: 'carbon-monoxide', label: 'Carbon monoxide alarm', icon: Shield, category: 'safety' },
    { id: 'first-aid', label: 'First aid kit', icon: Shield, category: 'safety' },
    { id: 'fire-extinguisher', label: 'Fire extinguisher', icon: Shield, category: 'safety' },
    { id: 'security-cameras', label: 'Security cameras (exterior)', icon: Camera, category: 'safety' },
    { id: 'lockbox', label: 'Lockbox', icon: Shield, category: 'safety' }
  ];

  const generateSmartSuggestions = (step1Data: any) => {
    const suggestions: string[] = [];
    
    // Location-based suggestions
    if (step1Data.location.toLowerCase().includes('mombasa') || 
        step1Data.location.toLowerCase().includes('diani') ||
        step1Data.location.toLowerCase().includes('malindi')) {
      suggestions.push('ocean-view', 'pool', 'ac', 'beach-towels');
    }
    
    if (step1Data.location.toLowerCase().includes('nairobi')) {
      suggestions.push('city-view', 'wifi', 'parking', 'security-cameras');
    }
    
    if (step1Data.location.toLowerCase().includes('nakuru') ||
        step1Data.location.toLowerCase().includes('nanyuki')) {
      suggestions.push('mountain-view', 'fireplace', 'heating', 'garden');
    }

    // Property type based suggestions
    if (step1Data.propertyType === 'villa' || step1Data.propertyType === 'house') {
      suggestions.push('garden', 'bbq', 'parking');
    }
    
    if (step1Data.propertyType === 'apartment' || step1Data.propertyType === 'condo') {
      suggestions.push('balcony', 'gym', 'security-cameras');
    }

    // Guest capacity based suggestions
    if (step1Data.guests >= 6) {
      suggestions.push('kitchen', 'bbq', 'pool');
    }

    setSuggestedAmenities([...new Set(suggestions)]);
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSuggestMore = () => {
    setShowSuggestions(true);
    // Add more location-specific suggestions
    const additionalSuggestions = ['beach-towels', 'snorkeling-gear', 'bicycle', 'workspace'];
    setSuggestedAmenities(prev => [...new Set([...prev, ...additionalSuggestions])]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save data to session storage
    sessionStorage.setItem('hostListingStep2', JSON.stringify({
      amenities: selectedAmenities
    }));
    
    // Navigate to step 3
    navigate('/become-host/listing/step3');
  };

  const AmenityButton = ({ amenity, isSelected, onClick }: { 
    amenity: any, 
    isSelected: boolean, 
    onClick: () => void 
  }) => {
    const IconComponent = amenity.icon;
    
    return (
      <button
        type="button"
        onClick={onClick}
        className={`p-4 rounded-lg border-2 transition-all text-left hover:border-orange-300 hover:bg-orange-50 ${
          isSelected 
            ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
            : 'border-gray-200 bg-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent className={`h-5 w-5 ${isSelected ? 'text-orange-600' : 'text-gray-400'}`} />
          <span className="font-medium text-gray-900">{amenity.label}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/listing/step1" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Step 2 of 5: Amenities & Features
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-8">
        <Progress value={40} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                What amenities do you offer?
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Choose the amenities and features that make your space special
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Smart Suggestions */}
                {suggestedAmenities.length > 0 && (
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-orange-800">
                        <Sparkles className="h-5 w-5 inline mr-2" />
                        Recommended for your location & property
                      </h3>
                      <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                        Smart Suggestions
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {suggestedAmenities.map(amenityId => {
                        const amenity = [...coreAmenities, ...uniqueFeatures, ...safetyFeatures]
                          .find(a => a.id === amenityId);
                        if (!amenity) return null;
                        
                        return (
                          <AmenityButton
                            key={amenity.id}
                            amenity={amenity}
                            isSelected={selectedAmenities.includes(amenity.id)}
                            onClick={() => toggleAmenity(amenity.id)}
                          />
                        );
                      })}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSuggestMore}
                      className="mt-4 border-orange-300 text-orange-600 hover:bg-orange-100"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Suggest Me More!
                    </Button>
                  </div>
                )}

                {/* Core Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {coreAmenities.map(amenity => (
                      <AmenityButton
                        key={amenity.id}
                        amenity={amenity}
                        isSelected={selectedAmenities.includes(amenity.id)}
                        onClick={() => toggleAmenity(amenity.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Unique Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Unique Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {uniqueFeatures.map(amenity => (
                      <AmenityButton
                        key={amenity.id}
                        amenity={amenity}
                        isSelected={selectedAmenities.includes(amenity.id)}
                        onClick={() => toggleAmenity(amenity.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Safety Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Features</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    These help guests feel secure and are often required by local regulations
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {safetyFeatures.map(amenity => (
                      <AmenityButton
                        key={amenity.id}
                        amenity={amenity}
                        isSelected={selectedAmenities.includes(amenity.id)}
                        onClick={() => toggleAmenity(amenity.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Selected Count */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Selected amenities: <strong>{selectedAmenities.length}</strong>
                    </span>
                    {selectedAmenities.length > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setSelectedAmenities([])}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl"
                  >
                    Save & Continue
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostStep2;