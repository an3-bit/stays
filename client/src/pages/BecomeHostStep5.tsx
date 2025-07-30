import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, User, Camera, CreditCard, Building, Shield, Info, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostStep5 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    languages: [] as string[],
    payoutMethod: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
    branchCode: '',
    paypalEmail: '',
    mpesaNumber: '',
    taxId: '',
    businessRegistration: ''
  });

  // Load previous step data
  useEffect(() => {
    const step1Data = sessionStorage.getItem('hostListingStep1');
    const step2Data = sessionStorage.getItem('hostListingStep2');
    const step3Data = sessionStorage.getItem('hostListingStep3');
    const step4Data = sessionStorage.getItem('hostListingStep4');
    
    if (!step1Data || !step2Data || !step3Data || !step4Data) {
      navigate('/become-host/listing/step1');
      return;
    }
  }, [navigate]);

  const payoutMethods = [
    {
      value: 'bank',
      label: 'Bank Transfer',
      description: 'Direct deposit to your bank account',
      icon: Building,
      processingTime: '1-3 business days'
    },
    {
      value: 'paypal',
      label: 'PayPal',
      description: 'Transfer to your PayPal account',
      icon: CreditCard,
      processingTime: '1-2 business days'
    },
    {
      value: 'mpesa',
      label: 'M-Pesa',
      description: 'Mobile money transfer',
      icon: CreditCard,
      processingTime: 'Instant'
    }
  ];

  const availableLanguages = [
    'English', 'Swahili', 'French', 'German', 'Spanish', 'Italian', 
    'Portuguese', 'Arabic', 'Mandarin', 'Japanese', 'Hindi', 'Russian'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const generateBioSuggestion = () => {
    const step1Data = JSON.parse(sessionStorage.getItem('hostListingStep1') || '{}');
    const suggestions = [
      `Hi! I'm ${formData.firstName || 'a'} passionate host from ${step1Data.location || 'Kenya'}. I love meeting travelers from around the world and sharing the beauty of our local area.`,
      `Welcome to my space! As a local resident, I'm excited to help you discover the best of ${step1Data.location || 'our city'} while ensuring you have a comfortable and memorable stay.`,
      `I've been hosting for several years and take pride in providing clean, comfortable accommodations with personal touches that make guests feel at home.`
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setFormData(prev => ({ ...prev, bio: randomSuggestion }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.bio) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!formData.payoutMethod) {
      alert('Please select a payout method');
      return;
    }
    
    // Validate payout method specific fields
    if (formData.payoutMethod === 'bank' && (!formData.bankName || !formData.accountNumber || !formData.accountName)) {
      alert('Please fill in all bank details');
      return;
    }
    
    if (formData.payoutMethod === 'paypal' && !formData.paypalEmail) {
      alert('Please provide your PayPal email');
      return;
    }
    
    if (formData.payoutMethod === 'mpesa' && !formData.mpesaNumber) {
      alert('Please provide your M-Pesa number');
      return;
    }
    
    // Save data to session storage
    sessionStorage.setItem('hostListingStep5', JSON.stringify({
      ...formData,
      profilePhoto
    }));
    
    // Navigate to review page
    navigate('/become-host/review');
  };

  const isFormValid = formData.firstName && formData.lastName && formData.bio && formData.payoutMethod &&
    ((formData.payoutMethod === 'bank' && formData.bankName && formData.accountNumber && formData.accountName) ||
     (formData.payoutMethod === 'paypal' && formData.paypalEmail) ||
     (formData.payoutMethod === 'mpesa' && formData.mpesaNumber));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/become-host/listing/step4" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="text-sm text-gray-600">
            Step 5 of 5: Host Profile & Payouts
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-8">
        <Progress value={100} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Complete your host profile
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Help guests get to know you and set up your payment information
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Host Profile Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Host Profile
                    </h3>

                    {/* Profile Photo */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Profile Photo
                      </Label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                              <User className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors"
                          >
                            <Camera className="h-4 w-4" />
                          </button>
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                          </Button>
                          <p className="text-sm text-gray-600 mt-1">
                            A friendly photo helps build trust with guests
                          </p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="bio">About You *</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateBioSuggestion}
                          className="border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          Generate Suggestion
                        </Button>
                      </div>
                      <Textarea
                        id="bio"
                        placeholder="Tell guests about yourself, your interests, and what you love about hosting..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        maxLength={500}
                        required
                      />
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-600">
                          Share what makes you a great host
                        </p>
                        <span className="text-sm text-gray-500">
                          {formData.bio.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        Languages You Speak
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableLanguages.map((language) => {
                          const isSelected = formData.languages.includes(language);
                          return (
                            <button
                              key={language}
                              type="button"
                              onClick={() => toggleLanguage(language)}
                              className={`p-2 rounded-lg border text-sm transition-all ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                              }`}
                            >
                              {language}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Selected: {formData.languages.length > 0 ? formData.languages.join(', ') : 'None'}
                      </p>
                    </div>
                  </div>

                  {/* Payout Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payout Information
                    </h3>

                    {/* Payout Method Selection */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">
                        How would you like to be paid? *
                      </Label>
                      <div className="space-y-3">
                        {payoutMethods.map((method) => {
                          const IconComponent = method.icon;
                          const isSelected = formData.payoutMethod === method.value;
                          
                          return (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, payoutMethod: method.value })}
                              className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:border-orange-300 hover:bg-orange-50 ${
                                isSelected 
                                  ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <IconComponent className={`h-5 w-5 ${isSelected ? 'text-orange-600' : 'text-gray-400'}`} />
                                  <div>
                                    <div className="font-medium text-gray-900">{method.label}</div>
                                    <div className="text-sm text-gray-600">{method.description}</div>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {method.processingTime}
                                </Badge>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bank Transfer Details */}
                    {formData.payoutMethod === 'bank' && (
                      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900">Bank Account Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bankName">Bank Name *</Label>
                            <Select value={formData.bankName} onValueChange={(value) => setFormData({ ...formData, bankName: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select bank" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kcb">KCB Bank</SelectItem>
                                <SelectItem value="equity">Equity Bank</SelectItem>
                                <SelectItem value="coop">Co-operative Bank</SelectItem>
                                <SelectItem value="absa">Absa Bank</SelectItem>
                                <SelectItem value="standard">Standard Chartered</SelectItem>
                                <SelectItem value="dtb">Diamond Trust Bank</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="branchCode">Branch Code</Label>
                            <Input
                              id="branchCode"
                              placeholder="001"
                              value={formData.branchCode}
                              onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountName">Account Name *</Label>
                          <Input
                            id="accountName"
                            placeholder="John Doe"
                            value={formData.accountName}
                            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Account Number *</Label>
                          <Input
                            id="accountNumber"
                            placeholder="1234567890"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* PayPal Details */}
                    {formData.payoutMethod === 'paypal' && (
                      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900">PayPal Account</h4>
                        <div>
                          <Label htmlFor="paypalEmail">PayPal Email *</Label>
                          <Input
                            id="paypalEmail"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.paypalEmail}
                            onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* M-Pesa Details */}
                    {formData.payoutMethod === 'mpesa' && (
                      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900">M-Pesa Account</h4>
                        <div>
                          <Label htmlFor="mpesaNumber">M-Pesa Number *</Label>
                          <Input
                            id="mpesaNumber"
                            placeholder="254712345678"
                            value={formData.mpesaNumber}
                            onChange={(e) => setFormData({ ...formData, mpesaNumber: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Tax Information */}
                    <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Tax Information (Optional)
                      </h4>
                      <div>
                        <Label htmlFor="taxId">Tax ID / PIN</Label>
                        <Input
                          id="taxId"
                          placeholder="A123456789B"
                          value={formData.taxId}
                          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        />
                        <p className="text-sm text-yellow-700 mt-1">
                          Required for tax reporting if earnings exceed KES 500,000 annually
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="businessRegistration">Business Registration (if applicable)</Label>
                        <Input
                          id="businessRegistration"
                          placeholder="Business registration number"
                          value={formData.businessRegistration}
                          onChange={(e) => setFormData({ ...formData, businessRegistration: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-green-900 mb-1">Your Information is Secure</h5>
                          <p className="text-sm text-green-800">
                            All payment information is encrypted and stored securely. We never share your financial details with guests or third parties.
                          </p>
                        </div>
                      </div>
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
                    Complete Profile & Review
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

export default BecomeHostStep5;