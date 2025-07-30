import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, X, MessageSquare, Calendar, Users, MapPin, Clock, Star } from "lucide-react";

interface BookingNotificationProps {
  booking: {
    id: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    propertyTitle: string;
    specialRequests?: string;
    guestProfile: {
      joinedDate: string;
      reviewCount: number;
      rating: number;
    };
  };
  onAccept: (bookingId: string) => void;
  onDecline: (bookingId: string) => void;
  onMessage: (bookingId: string) => void;
}

const FirstBookingNotification = ({ booking, onAccept, onDecline, onMessage }: BookingNotificationProps) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateNights = () => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Smart Pre-Arrival Checklist based on booking details
  const generatePreArrivalChecklist = () => {
    const checklist = [
      'Confirm property is clean and ready',
      'Check all amenities are working',
      'Prepare welcome guide with WiFi password',
      'Stock basic supplies (toilet paper, towels, etc.)'
    ];

    // Add guest-specific items
    if (booking.guests >= 4) {
      checklist.push(`Ensure ${booking.guests} sets of linens and towels are available`);
    }

    if (booking.specialRequests) {
      checklist.push(`Prepare for special request: ${booking.specialRequests}`);
    }

    const nights = calculateNights();
    if (nights >= 7) {
      checklist.push('Consider providing extra amenities for extended stay');
    }

    return checklist;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">🎉 Your First Booking!</CardTitle>
                <p className="text-green-100">Congratulations on your first booking request</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              New
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Booking Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{booking.guestName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.guestName}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {booking.guestProfile.rating} ({booking.guestProfile.reviewCount} reviews)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {booking.propertyTitle}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    {booking.guests} guests • {calculateNights()} nights
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {booking.checkIn} to {booking.checkOut}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    KES {booking.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total amount</div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <div className="flex items-center text-orange-800">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      Respond within: {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                <h5 className="font-medium text-yellow-900 mb-1">Special Request:</h5>
                <p className="text-sm text-yellow-800">{booking.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Smart Pre-Arrival Checklist */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Smart Pre-Arrival Checklist for This Guest
            </h3>
            <div className="space-y-2">
              {generatePreArrivalChecklist().map((item, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-4 h-4 border border-green-400 rounded mt-0.5 flex-shrink-0"></div>
                  <span className="text-green-800">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-green-700 mt-3">
              This checklist is personalized based on your guest count, stay duration, and special requests.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onAccept(booking.id)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Booking
            </Button>
            
            <Button
              onClick={() => onMessage(booking.id)}
              variant="outline"
              className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Guest
            </Button>
            
            <Button
              onClick={() => onDecline(booking.id)}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>

          {/* Tips for First-Time Hosts */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">💡 First Booking Tips:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Respond quickly to build trust with your guest</li>
              <li>• Ask any clarifying questions before accepting</li>
              <li>• Double-check your calendar availability</li>
              <li>• Prepare a warm welcome message</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstBookingNotification;