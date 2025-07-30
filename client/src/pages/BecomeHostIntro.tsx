import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Home, Users, DollarSign, Shield, Star, Clock, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeHostIntro = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const quizQuestions = [
    {
      id: 0,
      question: "What best describes your space?",
      options: [
        { value: "entire-home", label: "Entire Home/Apartment", icon: Home },
        { value: "private-room", label: "Private Room", icon: Users },
        { value: "unique-stay", label: "Unique Stay (Treehouse, Boat, etc.)", icon: Star }
      ]
    },
    {
      id: 1,
      question: "How often do you plan to host?",
      options: [
        { value: "full-time", label: "Full-time (Available most days)", icon: Clock },
        { value: "weekends", label: "Weekends & Holidays", icon: Globe },
        { value: "occasionally", label: "Occasionally (When convenient)", icon: Heart }
      ]
    },
    {
      id: 2,
      question: "What's your biggest priority?",
      options: [
        { value: "maximize-earnings", label: "Maximize Earnings", icon: DollarSign },
        { value: "meet-people", label: "Meet New People", icon: Users },
        { value: "flexibility", label: "Maintain Flexibility", icon: Shield }
      ]
    }
  ];

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, show personalized message
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    // Generate personalized message based on answers
    const spaceType = quizAnswers[0];
    const frequency = quizAnswers[1];
    const priority = quizAnswers[2];

    let personalizedMessage = "Perfect! Based on your answers, ";
    
    if (spaceType === "entire-home") {
      personalizedMessage += "hosting your entire home gives you maximum earning potential. ";
    } else if (spaceType === "private-room") {
      personalizedMessage += "hosting a private room is a great way to start and meet guests personally. ";
    } else {
      personalizedMessage += "your unique space will definitely stand out to adventurous travelers! ";
    }

    if (priority === "maximize-earnings") {
      personalizedMessage += "We'll help you optimize your pricing and occupancy rates.";
    } else if (priority === "meet-people") {
      personalizedMessage += "You'll love connecting with travelers from around the world.";
    } else {
      personalizedMessage += "Our flexible hosting tools will work around your schedule.";
    }

    // Store the personalized message and navigate
    sessionStorage.setItem('hostPersonalization', JSON.stringify({
      answers: quizAnswers,
      message: personalizedMessage
    }));

    navigate('/become-host/listing/step1');
  };

  const valuePropositions = [
    {
      icon: DollarSign,
      title: "Easy Setup",
      description: "Get your listing live in under 30 minutes with our guided setup process"
    },
    {
      icon: Shield,
      title: "Dedicated Support",
      description: "24/7 host support team ready to help you succeed and resolve any issues"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join thousands of verified hosts in our secure, trusted platform"
    },
    {
      icon: Clock,
      title: "Flexible Earnings",
      description: "Set your own prices, availability, and house rules - you're in control"
    }
  ];

  if (showQuiz) {
    const currentQ = quizQuestions[currentQuestion];
    const isLastQuestion = currentQuestion === quizQuestions.length - 1;
    const hasAnswered = quizAnswers[currentQuestion] !== undefined;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setShowQuiz(false)}
                  className="text-orange-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Badge variant="secondary">
                  {currentQuestion + 1} of {quizQuestions.length}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {currentQ.question}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Help us personalize your hosting experience
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {currentQ.options.map((option) => {
                const IconComponent = option.icon;
                const isSelected = quizAnswers[currentQuestion] === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleQuizAnswer(currentQuestion, option.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:border-orange-300 hover:bg-orange-50 ${
                      isSelected 
                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                );
              })}

              <div className="pt-6">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!hasAnswered}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isLastQuestion ? 'Complete & Continue' : 'Next Question'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to TVHStays
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your Property's 
            <span className="text-orange-500"> Potential</span> with TVHStays
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome Home, Hosts! Monetize Your Space, Your Way. Join thousands of successful hosts earning extra income while sharing their unique spaces with travelers worldwide.
          </p>
          
          {/* Hero Image/Video Placeholder */}
          <div className="relative mb-12">
            <div className="aspect-video bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Home className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">Diverse Properties Thriving with Guests</p>
                  <p className="text-sm opacity-80 mt-2">From cozy apartments to unique stays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="space-y-4 mb-12">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Listing Your Space
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <div>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl"
                onClick={() => {
                  // Scroll to FAQ section
                  document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More About Hosting
              </Button>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valuePropositions.map((prop, index) => {
            const IconComponent = prop.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{prop.title}</h3>
                  <p className="text-gray-600 text-sm">{prop.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Proof */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Success Stories</h2>
            <div className="flex justify-center items-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">10K+</div>
                <div className="text-gray-600">Active Hosts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">$2.5K</div>
                <div className="text-gray-600">Avg Monthly Earnings</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Nairobi",
                text: "TVHStays made hosting so easy! I've earned over $15K in my first year.",
                rating: 5
              },
              {
                name: "James K.",
                location: "Mombasa",
                text: "The support team is amazing. They helped me optimize my listing and bookings doubled!",
                rating: 5
              },
              {
                name: "Grace W.",
                location: "Nakuru",
                text: "I love meeting travelers from around the world. It's more than just income - it's community.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-3">"{testimonial.text}"</p>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="learn-more" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How much can I earn?",
                answer: "Earnings vary by location, property type, and demand. Our hosts typically earn $500-$5000+ per month."
              },
              {
                question: "Is it safe to host?",
                answer: "Yes! We verify all guests, provide $1M host protection insurance, and offer 24/7 support."
              },
              {
                question: "How do I get started?",
                answer: "Simply complete our guided listing process - it takes about 30 minutes to get live."
              },
              {
                question: "What fees do you charge?",
                answer: "We charge a small service fee only when you get bookings. No upfront costs or monthly fees."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Hosting Journey?</h2>
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostIntro;