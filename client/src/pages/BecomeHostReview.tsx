import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Eye, Edit, MapPin, Users, Bed, Bath, Wifi, Car, Star, DollarSign, Calendar, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostReview = () => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState<any>({});
  const [showPreview, setShowPreview] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Load all step data
  useEffect(() => {
    const step1Data = sessionStorage.getItem('hostListingStep1');
    const step2Data = sessionStorage.getItem('hostListingStep2');
    const step3Data = sessionStorage.getItem('hostListingStep3');
    const step4Data = sessionStorage.getItem('hostListingStep4');
    const step5Data = sessionStorage.getItem('hostListingStep5');
    
    if (!step1Data || !step2Data || !step3Data || !step4Data || !step5Data) {
      navigate('/become-host/listing/step1');
      return;
    }

    const combinedData = {
      step1: JSON.parse(step1Data),
      step2: JSON.parse(step2Data),
      step3: JSON.parse(step3Data),
      step4: JSON.parse(step4Data),
      step5: JSON.parse(step5Data)
    };
    
    setListingData(combinedData);
  }, [navigate]);

  const getAmenityIcon = (amenityId: string) => {
    const iconMap: Record<string, any> = {
      wifi: Wifi,
      parking: Car,
      // Add more mappings as needed
    };
    return iconMap[amenityId] || Star;
  };

  const handleGoLive = () => {
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }

    // Save final listing data
    sessionStorage.setItem('completedListing', JSON.stringify(listingData));
    
    // Navigate to confirmation page
    navigate('/become-host/confirmation');
  };

  const LivePreview = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {/* Mock photo gallery */}
        <div className="aspect-video bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-lg font-medium">Photo Gallery</div>
            <div className="text-sm opacity-80">{listingData.step3?.photos?.length || 0} photos uploaded</div>
          </div>
        </div>
        <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
          New Listing
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {listingData.step3?.title || 'Your Listing Title'}
            </h2>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {listingData.step1?.location}, {listingData.step1?.county}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {listingData.step1?.guests} guests
              </span>
              <span className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {listingData.step1?.bedrooms} bedrooms
              </span>
              <span className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {listingData.step1?.bathrooms} bathrooms
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              KES {parseInt(listingData.step4?.basePrice || '0').toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">per night</div>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {listingData.step3?.description || 'Your property description will appear here...'}
          </p>
        </div>

        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {listingData.step2?.amenities?.slice(0, 6).map((amenity: string, index: number) => {
              const IconComponent = getAmenityIcon(amenity);
              return (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <IconComponent className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="capitalize">{amenity.replace('-', ' ')}</span>
                </div>
              );
            })}
          </div>
          {listingData.step2?.amenities?.length > 6 && (
            <div className="text-sm text-orange-600 mt-2">
              +{listingData.step2.amenities.length - 6} more amenities
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Host Information</h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <div className="font-medium">
                {listingData.step5?.firstName} {listingData.step5?.lastName}
              </div>
              <div className="text-sm text-gray-600">Host</div>
              {listingData.step5?.languages?.length > 0 && (
                <div className="text-xs text-gray-500">
                  Speaks: {listingData.step5.languages.slice(0, 2).join(', ')}
                  {listingData.step5.languages.length > 2 && ` +${listingData.step5.languages.length - 2} more`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowPreview(false)}
              className="text-orange-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Review
            </Button>
            <Badge variant="secondary">Live Preview</Badge>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LivePreview />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/listing/step5" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Review & Launch
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Review your listing
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Make sure everything looks perfect before going live
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Preview Button */}
              <div className="text-center">
                <Button
                  onClick={() => setShowPreview(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Live Preview
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  See how your listing will appear to guests
                </p>
              </div>

              {/* Summary Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Property Basics */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Property Basics</CardTitle>
                      <Link to="/become-host/listing/step1">
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {listingData.step1?.propertyType}</div>
                    <div><strong>Space:</strong> {listingData.step1?.spaceType}</div>
                    <div><strong>Location:</strong> {listingData.step1?.location}</div>
                    <div><strong>Capacity:</strong> {listingData.step1?.guests} guests, {listingData.step1?.bedrooms} bedrooms</div>
                  </CardContent>
                </Card>

                {/* Amenities */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Amenities</CardTitle>
                      <Link to="/become-host/listing/step2">
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {listingData.step2?.amenities?.slice(0, 8).map((amenity: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity.replace('-', ' ')}
                        </Badge>
                      ))}
                      {listingData.step2?.amenities?.length > 8 && (
                        <Badge variant="outline" className="text-xs">
                          +{listingData.step2.amenities.length - 8} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Photos & Description */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Photos & Description</CardTitle>
                      <Link to="/become-host/listing/step3">
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>Title:</strong> {listingData.step3?.title}</div>
                    <div><strong>Photos:</strong> {listingData.step3?.photos?.length || 0} uploaded</div>
                    <div><strong>Description:</strong> {listingData.step3?.description?.substring(0, 100)}...</div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Pricing & Availability</CardTitle>
                      <Link to="/become-host/listing/step4">
                        <Button variant="ghost" size="sm" className="text-orange-600">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>Base Price:</strong> KES {parseInt(listingData.step4?.basePrice || '0').toLocaleString()}/night</div>
                    <div><strong>Min Nights:</strong> {listingData.step4?.minNights}</div>
                    <div><strong>Cancellation:</strong> {listingData.step4?.cancellationPolicy}</div>
                    <div><strong>Smart Pricing:</strong> {listingData.step4?.smartPricing ? 'Enabled' : 'Disabled'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Host Profile Summary */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Host Profile</CardTitle>
                    <Link to="/become-host/listing/step5">
                      <Button variant="ghost" size="sm" className="text-orange-600">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {listingData.step5?.firstName} {listingData.step5?.lastName}</div>
                  <div><strong>Languages:</strong> {listingData.step5?.languages?.join(', ') || 'None specified'}</div>
                  <div><strong>Payout Method:</strong> {listingData.step5?.payoutMethod}</div>
                  <div><strong>Bio:</strong> {listingData.step5?.bio?.substring(0, 100)}...</div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="terms" className="text-sm font-medium text-gray-900 cursor-pointer">
                      I agree to TVHStays' Terms & Conditions
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      By publishing this listing, you agree to our{' '}
                      <Link to="/terms" className="text-orange-600 hover:underline">Terms of Service</Link>,{' '}
                      <Link to="/host-guarantee" className="text-orange-600 hover:underline">Host Guarantee</Link>, and{' '}
                      <Link to="/community-standards" className="text-orange-600 hover:underline">Community Standards</Link>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Go Live Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleGoLive}
                  disabled={!agreeToTerms}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Go Live!
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Your listing will be reviewed and published within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostReview;