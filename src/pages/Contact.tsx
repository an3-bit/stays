import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, HeadphonesIcon, Users, Building } from "lucide-react";
import Footer from "@/components/Footer";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    details: "+254 700 000 000",
    availability: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    action: "Call Now"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses via WhatsApp",
    details: "+254 700 000 000",
    availability: "Available 24/7",
    action: "Chat Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a detailed message",
    details: "hello@safaristayskenya.com",
    availability: "Response within 2 hours",
    action: "Send Email"
  }
];

const offices = [
  {
    city: "Nairobi (Head Office)",
    address: "Westlands, Nairobi",
    details: "ABC Place, 5th Floor\nWaiyaki Way, Westlands\nNairobi, Kenya",
    phone: "+254 700 000 001",
    hours: "Mon-Fri: 8AM-6PM"
  },
  {
    city: "Mombasa",
    address: "Nyali, Mombasa",
    details: "Nyali Centre, 2nd Floor\nNyali Road\nMombasa, Kenya",
    phone: "+254 700 000 002",
    hours: "Mon-Fri: 8AM-5PM"
  }
];

const faqs = [
  {
    question: "How do I book a property?",
    answer: "You can book through our website by filling out the inquiry form, calling us directly, or messaging us on WhatsApp. We'll confirm availability and guide you through the process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, bank transfers, and major credit cards. Payment terms vary by property, but typically require a deposit to secure your booking."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Cancellation and modification policies vary by property. We'll provide you with specific terms when you make your booking. Generally, we offer flexible options."
  },
  {
    question: "Do you provide airport transfers?",
    answer: "Many of our properties offer airport transfer services. We can help coordinate transportation as part of your booking experience."
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have questions about booking, need assistance with your stay, or want to list your property? 
            Our friendly team is here to help you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">How to Reach Us</h2>
            <p className="text-xl text-muted-foreground">Choose the most convenient way to get in touch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                    <method.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-foreground">{method.details}</p>
                    <p className="text-sm text-muted-foreground">{method.availability}</p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 2 hours
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input placeholder="+254 700 000 000" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Property Booking</SelectItem>
                        <SelectItem value="listing">List My Property</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      rows={5}
                    />
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Office Information & FAQ */}
            <div className="space-y-8">
              {/* Office Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Our Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-foreground mb-2">{office.city}</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                          <div className="whitespace-pre-line">{office.details}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <HeadphonesIcon className="h-5 w-5 text-primary" />
                    Need Immediate Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For urgent inquiries or immediate assistance, reach out to us directly:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">24/7 Emergency Support</p>
                        <p className="text-sm text-muted-foreground">+254 700 000 999</p>
                      </div>
                      <Button size="sm">Call</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div>
                        <p className="font-medium">WhatsApp Support</p>
                        <p className="text-sm text-muted-foreground">Instant responses</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>
      {/* Add Footer at the end */}
      <Footer />
    </div>
  );
};

export default Contact;