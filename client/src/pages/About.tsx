import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Award, Users, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const stats = [
  { label: "Properties Listed", value: "500+", icon: MapPin },
  { label: "Happy Guests", value: "10,000+", icon: Users },
  { label: "Years of Experience", value: "8+", icon: Clock },
  { label: "Average Rating", value: "4.8★", icon: Star }
];

const values = [
  {
    icon: Heart,
    title: "Authentic Kenyan Hospitality",
    description: "We believe in showcasing the warm, welcoming spirit that Kenya is famous for. Every property in our collection embodies the genuine hospitality that makes visitors feel truly at home."
  },
  {
    icon: Shield,
    title: "Trust & Safety First",
    description: "Your safety and peace of mind are our top priorities. All properties are verified, and we maintain strict quality standards to ensure every stay meets our high expectations."
  },
  {
    icon: Award,
    title: "Curated Excellence",
    description: "We handpick each property based on quality, location, and unique character. Our team personally visits and approves every accommodation to guarantee an exceptional experience."
  }
];

const team = [
  {
    name: "Sarah Wanjiku",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=300",
    bio: "A Kenyan entrepreneur passionate about showcasing the beauty of Kenya through exceptional accommodations."
  },
  {
    name: "David Kimani",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=300",
    bio: "Expert in hospitality management with over 10 years of experience in the Kenyan tourism industry."
  },
  {
    name: "Grace Akinyi",
    role: "Guest Experience Manager",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=300",
    bio: "Dedicated to ensuring every guest has an unforgettable experience during their stay in Kenya."
  }
];

const milestones = [
  { year: "2016", event: "tvhstays Kenya Founded", description: "Started with a vision to showcase Kenya's hospitality" },
  { year: "2018", event: "100 Properties Milestone", description: "Reached our first major property listing goal" },
  { year: "2020", event: "Digital Transformation", description: "Launched our modern booking platform" },
  { year: "2022", event: "Award Recognition", description: "Received Kenya Tourism Board Excellence Award" },
  { year: "2024", event: "500+ Properties", description: "Expanded to cover all major Kenyan destinations" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About tvhstays Kenya</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting travelers with authentic Kenyan experiences through 
            carefully curated accommodations that showcase the warmth, beauty, and diversity of our beloved country.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-xl text-muted-foreground">From a simple idea to Kenya's trusted accommodation platform</p>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                tvhstays Kenya was born from a simple observation: Kenya has some of the most incredible 
                accommodations in the world, but finding and booking them was often complicated and unreliable. 
                As proud Kenyans who love to travel within our own country, we knew there had to be a better way.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2016 by a team of hospitality professionals and technology enthusiasts, 
                we set out to create a platform that would make it easy for both locals and visitors 
                to discover and book amazing places to stay across Kenya. From luxury safari lodges 
                to cozy beach cottages, from mountain retreats to urban apartments – we believe 
                every traveler deserves to find their perfect home away from home.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, we're proud to work with over 500 property owners across Kenya, helping 
                thousands of guests create unforgettable memories. But our mission remains the same: 
                to showcase the best of Kenyan hospitality and make travel within Kenya accessible, 
                safe, and truly exceptional for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">The passionate people behind tvhstays Kenya</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">Key milestones in our growth story</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">Join Our Community</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're a traveler looking for your next adventure or a property owner 
              wanting to share your space, we'd love to have you as part of the tvhstays Kenya family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore Properties
                </Button>
              </Link>
              <Link to="/become-host">
                <Button size="lg" variant="outline">
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;