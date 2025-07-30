import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Home, Building, TreePine, Waves, MapPin, Users, Bed, Bath } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyType: '',
    spaceType: '',
    location: '',
    address: '',
    city: '',
    county: '',
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load personalization data if available
  useEffect(() => {
    const personalization = sessionStorage.getItem('hostPersonalization');
    if (personalization) {
      const data = JSON.parse(personalization);
      // Pre-fill property type based on quiz answers
      if (data.answers[0] === 'entire-home') {
        setFormData(prev => ({ ...prev, propertyType: 'apartment', spaceType: 'entire-place' }));
      } else if (data.answers[0] === 'private-room') {
        setFormData(prev => ({ ...prev, spaceType: 'private-room' }));
      } else if (data.answers[0] === 'unique-stay') {
        setFormData(prev => ({ ...prev, propertyType: 'unique' }));
      }
    }
  }, []);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: Building },
    { value: 'house', label: 'House', icon: Home },
    { value: 'condo', label: 'Condominium', icon: Building },
    { value: 'villa', label: 'Villa', icon: Home },
    { value: 'cottage', label: 'Cottage', icon: TreePine },
    { value: 'unique', label: 'Unique Stay', icon: Waves }
  ];

  const spaceTypes = [
    { value: 'entire-place', label: 'Entire place', description: 'Guests have the whole place to themselves' },
    { value: 'private-room', label: 'Private room', description: 'Guests have their own room in a shared space' },
    { value: 'shared-room', label: 'Shared room', description: 'Guests sleep in a room shared with others' }
  ];

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
    'Garissa', 'Kakamega', 'Machakos', 'Meru', 'Nyeri', 'Kericho', 'Embu', 'Migori',
    'Homa Bay', 'Naivasha', 'Voi', 'Kilifi', 'Lamu', 'Watamu', 'Diani', 'Nanyuki'
  ];

  // Mock location suggestions based on input
  const handleLocationChange = (value: string) => {
    setFormData({ ...formData, location: value });
    
    if (value.length > 2) {
      const suggestions = kenyanCounties.filter(county => 
        county.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectLocation = (location: string) => {
    setFormData({ ...formData, location, city: location });
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.propertyType || !formData.spaceType || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    // Save data to session storage
    sessionStorage.setItem('hostListingStep1', JSON.stringify(formData));
    
    // Navigate to step 2
    navigate('/become-host/listing/step2');
  };

  const isFormValid = formData.propertyType && formData.spaceType && formData.location;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/intro" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Step 1 of 5: Property Basics
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-8">
        <Progress value={20} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Tell us about your space
              </CardTitle>
              <p className="text-gray-600 mt-2">
                We'll help you create a listing that attracts the right guests
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Property Type */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-4 block">
                    What type of property is this? *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                      const IconComponent = type.icon;
                      const isSelected = formData.propertyType === type.value;
                      
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, propertyType: type.value })}
                          className={`p-4 rounded-lg border-2 transition-all text-center hover:border-orange-300 hover:bg-orange-50 ${
                            isSelected 
                              ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <IconComponent className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-orange-600' : 'text-gray-400'}`} />
                          <div className="font-medium text-sm">{type.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Space Type */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-4 block">
                    What will guests have access to? *
                  </Label>
                  <div className="space-y-3">
                    {spaceTypes.map((space) => {
                      const isSelected = formData.spaceType === space.value;
                      
                      return (
                        <button
                          key={space.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, spaceType: space.value })}
                          className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:border-orange-300 hover:bg-orange-50 ${
                            isSelected 
                              ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{space.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{space.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-4 block">
                    Where is your property located? *
                  </Label>
                  <div className="space-y-4">
                    <div className="relative">
                      <Label htmlFor="location">City/Area</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="e.g., Nairobi, Mombasa, Nakuru"
                          className="pl-10"
                          value={formData.location}
                          onChange={(e) => handleLocationChange(e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Location Suggestions */}
                      {showSuggestions && locationSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {locationSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectLocation(suggestion)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                {suggestion}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address">Street Address (Optional)</Label>
                        <Input
                          id="address"
                          placeholder="Street address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="county">County</Label>
                        <Select value={formData.county} onValueChange={(value) => setFormData({ ...formData, county: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select county" />
                          </SelectTrigger>
                          <SelectContent>
                            {kenyanCounties.map((county) => (
                              <SelectItem key={county} value={county.toLowerCase()}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-4 block">
                    Property Details
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="guests" className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4" />
                        Guests
                      </Label>
                      <Select value={formData.guests.toString()} onValueChange={(value) => setFormData({ ...formData, guests: parseInt(value) })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bedrooms" className="flex items-center gap-2 mb-2">
                        <Home className="h-4 w-4" />
                        Bedrooms
                      </Label>
                      <Select value={formData.bedrooms.toString()} onValueChange={(value) => setFormData({ ...formData, bedrooms: parseInt(value) })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="beds" className="flex items-center gap-2 mb-2">
                        <Bed className="h-4 w-4" />
                        Beds
                      </Label>
                      <Select value={formData.beds.toString()} onValueChange={(value) => setFormData({ ...formData, beds: parseInt(value) })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms" className="flex items-center gap-2 mb-2">
                        <Bath className="h-4 w-4" />
                        Bathrooms
                      </Label>
                      <Select value={formData.bathrooms.toString()} onValueChange={(value) => setFormData({ ...formData, bathrooms: parseInt(value) })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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

export default BecomeHostStep1;