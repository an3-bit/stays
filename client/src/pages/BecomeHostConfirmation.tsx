import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Smartphone, Calendar, MessageSquare, BookOpen, Users, TrendingUp, Share2, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostConfirmation = () => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState<any>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const completedListing = sessionStorage.getItem('completedListing');
    if (!completedListing) {
      navigate('/become-host');
      return;
    }
    
    setListingData(JSON.parse(completedListing));
  }, [navigate]);

  const nextSteps = [
    {
      id: 'share',
      title: 'Share Your Listing',
      description: 'Get your first bookings by sharing with friends and family',
      icon: Share2,
      action: 'Share Now',
      urgent: true
    },
    {
      id: 'app',
      title: 'Download the TVHStays Host App',
      description: 'Manage bookings, communicate with guests, and track earnings on the go',
      icon: Smartphone,
      action: 'Download App',
      urgent: true
    },
    {
      id: 'dashboard',
      title: 'Explore the Host Dashboard',
      description: 'Familiarize yourself with booking management and analytics tools',
      icon: TrendingUp,
      action: 'View Dashboard',
      urgent: false
    },
    {
      id: 'resources',
      title: 'Visit the Host Resource Center',
      description: 'Learn hosting best practices, safety tips, and optimization strategies',
      icon: BookOpen,
      action: 'Browse Resources',
      urgent: false
    }
  ];

  const firstBookingChecklist = [
    {
      id: 'welcome-guide',
      title: 'Prepare Welcome Guide',
      description: 'Create a guide with WiFi password, house rules, and local recommendations',
      completed: false
    },
    {
      id: 'supplies',
      title: 'Stock Essential Supplies',
      description: 'Ensure you have clean linens, towels, toiletries, and basic amenities',
      completed: false
    },
    {
      id: 'safety-check',
      title: 'Safety Equipment Check',
      description: 'Verify smoke alarms, first aid kit, and emergency contact information',
      completed: false
    },
    {
      id: 'cleaning-schedule',
      title: 'Set Up Cleaning Schedule',
      description: 'Arrange cleaning between guests or prepare your own cleaning checklist',
      completed: false
    },
    {
      id: 'local-contacts',
      title: 'Prepare Local Contacts',
      description: 'Have contacts for maintenance, cleaning, and emergency services ready',
      completed: false
    }
  ];

  const toggleChecklistItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'share':
        // Mock sharing functionality
        if (navigator.share) {
          navigator.share({
            title: 'Check out my new listing on TVHStays!',
            text: `I just listed my ${listingData.step1?.propertyType} in ${listingData.step1?.location} on TVHStays!`,
            url: window.location.origin + '/properties/new-listing'
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(`Check out my new listing: ${window.location.origin}/properties/new-listing`);
          alert('Link copied to clipboard!');
        }
        break;
      case 'app':
        // Mock app download
        alert('Redirecting to app store...');
        break;
      case 'dashboard':
        navigate('/host-dashboard');
        break;
      case 'resources':
        // Mock resource center
        alert('Opening Host Resource Center...');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Congratulations! Your listing is live! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to the TVHStays host community! Your property is now available for booking and will appear in search results within the next few hours.
          </p>
        </div>

        {/* Listing Summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Your New Listing</CardTitle>
                <Badge className="bg-green-500 text-white">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{listingData.step3?.title}</h3>
                  <p className="text-gray-600 mb-4">{listingData.step1?.location}, {listingData.step1?.county}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{listingData.step1?.guests} guests</span>
                    <span>{listingData.step1?.bedrooms} bedrooms</span>
                    <span>{listingData.step1?.bathrooms} bathrooms</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    KES {parseInt(listingData.step4?.basePrice || '0').toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">per night</div>
                  <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Listing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.id} className={`shadow-lg border-0 hover:shadow-xl transition-shadow ${step.urgent ? 'ring-2 ring-orange-200 bg-orange-50' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${step.urgent ? 'bg-orange-500' : 'bg-blue-500'}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          {step.urgent && <Badge variant="secondary" className="bg-orange-200 text-orange-800 text-xs">Priority</Badge>}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                        <Button
                          onClick={() => handleAction(step.id)}
                          className={`${step.urgent ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        >
                          {step.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* First Booking Checklist */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Your First Booking Checklist
              </CardTitle>
              <p className="text-gray-600">
                Get ready to welcome your first guests with these essential preparations
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {firstBookingChecklist.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        checkedItems[item.id] 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle className="h-3 w-3" />}
                    </button>
                    <div className="flex-1">
                      <h4 className={`font-medium ${checkedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${checkedItems[item.id] ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">Pro Tip: Smart Pre-Arrival Checklist</h5>
                    <p className="text-sm text-blue-800">
                      Once you receive your first booking, we'll provide a personalized checklist based on your specific guest details (number of guests, length of stay, special requests, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Host Dashboard Preview */}
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl">Your Host Dashboard</CardTitle>
              <p className="text-gray-600">
                Here's a preview of what you'll see once bookings start coming in
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">Pending Bookings</h4>
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-blue-700">Awaiting your response</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900">Total Earnings</h4>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">KES 0</div>
                  <div className="text-sm text-green-700">This month</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-orange-900">Messages</h4>
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-orange-700">Unread messages</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-purple-900">Reviews</h4>
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">-</div>
                  <div className="text-sm text-purple-700">Average rating</div>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={() => navigate('/host-dashboard')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Card className="shadow-lg border-0 bg-gray-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Our host support team is here to help you succeed. Get in touch anytime!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-gray-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="border-gray-300">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Host Resources
                </Button>
                <Button variant="outline" className="border-gray-300">
                  <Users className="h-4 w-4 mr-2" />
                  Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostConfirmation;