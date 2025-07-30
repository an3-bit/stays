import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, ArrowRight, DollarSign, Calendar as CalendarIcon, TrendingUp, Info, Sparkles, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostStep4 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    basePrice: '',
    smartPricing: false,
    minNights: 1,
    maxNights: 365,
    bookingWindow: 365,
    cleaningFee: '',
    additionalGuestFee: '',
    cancellationPolicy: 'moderate'
  });
  
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [smartPricingSuggestion, setSmartPricingSuggestion] = useState<number | null>(null);
  const [marketData, setMarketData] = useState({
    averagePrice: 0,
    occupancyRate: 0,
    seasonalTrends: [] as { month: string; multiplier: number }[]
  });

  // Load previous step data and generate pricing suggestions
  useEffect(() => {
    const step1Data = sessionStorage.getItem('hostListingStep1');
    const step2Data = sessionStorage.getItem('hostListingStep2');
    const step3Data = sessionStorage.getItem('hostListingStep3');
    
    if (!step1Data || !step2Data || !step3Data) {
      navigate('/become-host/listing/step1');
      return;
    }

    const data1 = JSON.parse(step1Data);
    const data2 = JSON.parse(step2Data);
    
    generateSmartPricing(data1, data2);
    generateMarketData(data1);
  }, [navigate]);

  const generateSmartPricing = (step1Data: any, step2Data: any) => {
    // Mock smart pricing algorithm
    let basePrice = 3000; // Base price in KES
    
    // Location adjustments
    if (step1Data.location.toLowerCase().includes('nairobi')) {
      basePrice += 1500;
    } else if (step1Data.location.toLowerCase().includes('mombasa') || 
               step1Data.location.toLowerCase().includes('diani')) {
      basePrice += 1000;
    }
    
    // Property type adjustments
    if (step1Data.propertyType === 'villa') {
      basePrice += 2000;
    } else if (step1Data.propertyType === 'house') {
      basePrice += 1000;
    }
    
    // Guest capacity adjustment
    basePrice += (step1Data.guests - 1) * 500;
    
    // Amenity adjustments
    if (step2Data.amenities?.includes('pool')) basePrice += 1000;
    if (step2Data.amenities?.includes('wifi')) basePrice += 200;
    if (step2Data.amenities?.includes('ac')) basePrice += 500;
    if (step2Data.amenities?.includes('parking')) basePrice += 300;
    
    setSmartPricingSuggestion(basePrice);
    setFormData(prev => ({ ...prev, basePrice: basePrice.toString() }));
  };

  const generateMarketData = (step1Data: any) => {
    // Mock market data based on location
    let averagePrice = 4500;
    let occupancyRate = 75;
    
    if (step1Data.location.toLowerCase().includes('nairobi')) {
      averagePrice = 5500;
      occupancyRate = 80;
    } else if (step1Data.location.toLowerCase().includes('mombasa')) {
      averagePrice = 4800;
      occupancyRate = 85;
    }
    
    const seasonalTrends = [
      { month: 'Jan', multiplier: 1.2 },
      { month: 'Feb', multiplier: 1.1 },
      { month: 'Mar', multiplier: 1.0 },
      { month: 'Apr', multiplier: 0.9 },
      { month: 'May', multiplier: 0.8 },
      { month: 'Jun', multiplier: 0.9 },
      { month: 'Jul', multiplier: 1.3 },
      { month: 'Aug', multiplier: 1.3 },
      { month: 'Sep', multiplier: 1.0 },
      { month: 'Oct', multiplier: 1.0 },
      { month: 'Nov', multiplier: 1.1 },
      { month: 'Dec', multiplier: 1.4 }
    ];
    
    setMarketData({ averagePrice, occupancyRate, seasonalTrends });
  };

  const cancellationPolicies = [
    {
      value: 'flexible',
      label: 'Flexible',
      description: 'Full refund 1 day prior to arrival',
      icon: '😊'
    },
    {
      value: 'moderate',
      label: 'Moderate',
      description: 'Full refund 5 days prior to arrival',
      icon: '⚖️'
    },
    {
      value: 'strict',
      label: 'Strict',
      description: '50% refund up until 1 week prior to arrival',
      icon: '🛡️'
    }
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(prev => {
      const isSelected = prev.some(d => d.toDateString() === date.toDateString());
      if (isSelected) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const calculateEstimatedEarnings = () => {
    const price = parseInt(formData.basePrice) || 0;
    const occupancy = marketData.occupancyRate / 100;
    const monthlyEarnings = price * 30 * occupancy;
    return monthlyEarnings;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.basePrice) {
      alert('Please set a base price');
      return;
    }
    
    // Save data to session storage
    sessionStorage.setItem('hostListingStep4', JSON.stringify({
      ...formData,
      selectedDates,
      unavailableDates
    }));
    
    // Navigate to step 5
    navigate('/become-host/listing/step5');
  };

  const isFormValid = formData.basePrice && parseInt(formData.basePrice) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/listing/step3" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Step 4 of 5: Pricing & Availability
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-8">
        <Progress value={80} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Set your price and availability
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Price competitively to attract guests and maximize your earnings
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Pricing Section */}
                  <div className="space-y-6">
                    {/* Smart Pricing Suggestion */}
                    {smartPricingSuggestion && (
                      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-orange-800">
                            <Sparkles className="h-5 w-5 inline mr-2" />
                            Smart Pricing Suggestion
                          </h3>
                          <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                            AI Powered
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600 mb-2">
                            KES {smartPricingSuggestion.toLocaleString()}
                          </div>
                          <p className="text-sm text-orange-700 mb-4">
                            Based on your location, property type, and amenities
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-3 rounded">
                              <div className="font-medium">Market Average</div>
                              <div className="text-gray-600">KES {marketData.averagePrice.toLocaleString()}</div>
                            </div>
                            <div className="bg-white p-3 rounded">
                              <div className="font-medium">Occupancy Rate</div>
                              <div className="text-gray-600">{marketData.occupancyRate}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Base Price */}
                    <div>
                      <Label htmlFor="basePrice" className="text-base font-semibold text-gray-900 mb-2 block">
                        Base Price per Night *
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="basePrice"
                          type="number"
                          placeholder="3000"
                          className="pl-10"
                          value={formData.basePrice}
                          onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                          required
                        />
                        <span className="absolute right-3 top-3 text-gray-500 text-sm">KES</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        You can adjust this anytime after publishing
                      </p>
                    </div>

                    {/* Smart Pricing Toggle */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <h4 className="font-medium text-blue-900">Smart Pricing Tool</h4>
                        <p className="text-sm text-blue-700">
                          Automatically adjust prices based on demand, seasonality, and local events
                        </p>
                      </div>
                      <Switch
                        checked={formData.smartPricing}
                        onCheckedChange={(checked) => setFormData({ ...formData, smartPricing: checked })}
                      />
                    </div>

                    {/* Additional Fees */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Additional Fees (Optional)</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cleaningFee">Cleaning Fee</Label>
                          <div className="relative">
                            <Input
                              id="cleaningFee"
                              type="number"
                              placeholder="500"
                              value={formData.cleaningFee}
                              onChange={(e) => setFormData({ ...formData, cleaningFee: e.target.value })}
                            />
                            <span className="absolute right-3 top-3 text-gray-500 text-sm">KES</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="additionalGuestFee">Extra Guest Fee</Label>
                          <div className="relative">
                            <Input
                              id="additionalGuestFee"
                              type="number"
                              placeholder="200"
                              value={formData.additionalGuestFee}
                              onChange={(e) => setFormData({ ...formData, additionalGuestFee: e.target.value })}
                            />
                            <span className="absolute right-3 top-3 text-gray-500 text-sm">KES</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Settings */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Booking Settings</h4>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="minNights" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Min Nights
                          </Label>
                          <Select value={formData.minNights.toString()} onValueChange={(value) => setFormData({ ...formData, minNights: parseInt(value) })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="maxNights">Max Nights</Label>
                          <Select value={formData.maxNights.toString()} onValueChange={(value) => setFormData({ ...formData, maxNights: parseInt(value) })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[7,14,30,60,90,180,365].map(num => (
                                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="bookingWindow">Booking Window</Label>
                          <Select value={formData.bookingWindow.toString()} onValueChange={(value) => setFormData({ ...formData, bookingWindow: parseInt(value) })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">3 months</SelectItem>
                              <SelectItem value="180">6 months</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Cancellation Policy
                      </Label>
                      <div className="space-y-3">
                        {cancellationPolicies.map((policy) => {
                          const isSelected = formData.cancellationPolicy === policy.value;
                          
                          return (
                            <button
                              key={policy.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, cancellationPolicy: policy.value })}
                              className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:border-orange-300 hover:bg-orange-50 ${
                                isSelected 
                                  ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {policy.icon} {policy.label}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">{policy.description}</div>
                                </div>
                                {isSelected && <Shield className="h-5 w-5 text-orange-600" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Availability Calendar */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Availability Calendar
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Click dates to block them. You can sync with external calendars later.
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <Calendar
                          mode="multiple"
                          selected={selectedDates}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                          className="rounded-md"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                      
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          <span>Blocked dates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Available</span>
                        </div>
                      </div>
                    </div>

                    {/* Earnings Estimate */}
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Estimated Monthly Earnings
                      </h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          KES {calculateEstimatedEarnings().toLocaleString()}
                        </div>
                        <p className="text-sm text-green-700">
                          Based on {marketData.occupancyRate}% occupancy rate
                        </p>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white p-3 rounded">
                          <div className="font-medium">Nightly Rate</div>
                          <div className="text-gray-600">KES {parseInt(formData.basePrice || '0').toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="font-medium">Potential Annual</div>
                          <div className="text-gray-600">KES {(calculateEstimatedEarnings() * 12).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Seasonal Trends */}
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Seasonal Pricing Trends
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {marketData.seasonalTrends.map((trend, index) => (
                          <div key={index} className="bg-white p-2 rounded text-center">
                            <div className="font-medium">{trend.month}</div>
                            <div className={`${trend.multiplier > 1 ? 'text-green-600' : trend.multiplier < 1 ? 'text-red-600' : 'text-gray-600'}`}>
                              {(trend.multiplier * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-blue-700 mt-2">
                        Percentage of base price during peak/off seasons
                      </p>
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

export default BecomeHostStep4;