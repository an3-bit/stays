import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertySection from "@/components/PropertySection";
import HeroSection from "@/components/HeroSection";
import React from "react";

// Refined property data with Pexels images and more properties per section
const propertyGroups = [
  {
    title: "Popular homes in Nairobi",
    properties: [
      {
        id: 1,
        name: "Cottage in Nairobi",
        location: "Nairobi",
        price: "KSh 8,537 for 2 nights · 4.87",
        rating: 4.87,
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800",
      },
      {
        id: 2,
        name: "Apartment in Nairobi",
        location: "Nairobi",
        price: "KSh 10,500 for 2 nights · 4.95",
        rating: 4.95,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800",
      },
      {
        id: 3,
        name: "Modern Loft in Nairobi",
        location: "Nairobi",
        price: "KSh 12,000 for 2 nights · 4.90",
        rating: 4.90,
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=800",
      },
      {
        id: 4,
        name: "Luxury Apartment",
        location: "Nairobi",
        price: "KSh 13,464 for 2 nights · 4.93",
        rating: 4.93,
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800",
      },
      {
        id: 5,
        name: "Bright City Flat",
        location: "Nairobi",
        price: "KSh 17,064 for 2 nights · 4.95",
        rating: 4.95,
        image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&w=800",
      },
      {
        id: 6,
        name: "Cozy Studio",
        location: "Nairobi",
        price: "KSh 8,533 for 2 nights · 4.93",
        rating: 4.93,
        image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&w=800",
      },
    ]
  },
  {
    title: "Available in Mombasa this weekend",
    properties: [
      {
        id: 7,
        name: "Apartment in Mombasa",
        location: "Mombasa",
        price: "KSh 7,136 for 2 nights · 4.92",
        rating: 4.92,
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=800",
      },
      {
        id: 8,
        name: "Beachfront Suite",
        location: "Nyali, Mombasa",
        price: "KSh 9,507 for 2 nights · 4.87",
        rating: 4.87,
        image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
      },
      {
        id: 9,
        name: "Home in Nyali",
        location: "Nyali, Mombasa",
        price: "KSh 9,507 for 2 nights · 4.92",
        rating: 4.92,
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
      },
      {
        id: 10,
        name: "Room in Nyali",
        location: "Nyali, Mombasa",
        price: "KSh 3,167 for 2 nights · 4.85",
        rating: 4.85,
        image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&w=800",
      },
      {
        id: 11,
        name: "Apartment in Nyali",
        location: "Nyali, Mombasa",
        price: "KSh 3,167 for 2 nights · 4.86",
        rating: 4.86,
        image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
      },
      {
        id: 12,
        name: "Apartment in Nyali",
        location: "Nyali, Mombasa",
        price: "KSh 3,097 for 2 nights · 4.93",
        rating: 4.93,
        image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
      },
    ]
  },
  // Add more groups for Nakuru, Kwale, Kilifi, Machakos, Laikipia, Kisumu, Kajiado, etc. with at least 6 properties each and relevant Pexels images
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <main className="container mx-auto px-4 pt-8 pb-16">
        {propertyGroups.map((group, idx) => (
          <PropertySection key={idx} title={group.title} properties={group.properties} />
        ))}
        {/* Inspiration for future getaways section */}
        <section className="mt-16 mb-8">
          <h3 className="text-lg font-bold mb-4 text-foreground">Inspiration for future getaways</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Unique stays</span>
            <span>Categories</span>
            <span>Travel tips & inspiration</span>
            <span>Airbnb-friendly apartments</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
