import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertySection from "@/components/PropertySection";
import HeroSection from "@/components/HeroSection";
// @ts-expect-error: no types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';

// Refined property data with Pexels images and more properties per section
const propertyGroups = [
  {
    title: "Popular Stays in Nairobi",
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

const inspirations = [
  {
    id: 1,
    title: "Beachfront Escapes",
    image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
    description: "Relax in stunning beachfront homes along Kenya's coast, from Diani to Watamu.",
  },
  {
    id: 2,
    title: "Safari Lodges",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
    description: "Experience the wild in luxury lodges near Maasai Mara, Amboseli, and Tsavo.",
  },
  {
    id: 3,
    title: "Urban Chic Apartments",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800",
    description: "Stay in stylish city apartments in Nairobi, Mombasa, and Kisumu.",
  },
  {
    id: 4,
    title: "Mountain Retreats",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800",
    description: "Unwind in serene cabins and villas with breathtaking views of Mt. Kenya and Aberdares.",
  },
  {
    id: 5,
    title: "Family Villas",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=800",
    description: "Spacious homes perfect for family getaways and group adventures.",
  },
  {
    id: 6,
    title: "Romantic Hideaways",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800",
    description: "Cozy, private stays for couples seeking a romantic escape.",
  },
];

const Index = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);
  return (
    <>
      <div className="relative min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/bg.jpg')` }}>
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
        </div>
      </div>

      {/* Peace of Mind Section */}
      <section className="w-full bg-white py-16" data-aos="fade-up">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          {/* Left: Heading and horizontal property cards */}
          <div>
            <h3 className="text-3xl font-bold mb-2 text-gray-900">Peace of mind guaranteed with every booking</h3>
            <p className="mb-8 text-gray-600 text-lg">We promise expert-vetted homes, total transparency and exceptional service.</p>
            <div className="flex space-x-6 overflow-x-auto pb-2">
              {[
                {
                  image: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&w=600',
                  location: 'DIÀ',
                  name: 'Peach Sunlight, Majorca',
                },
                {
                  image: 'https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=600',
                  location: 'GREAT YARMOUTH',
                  name: 'The Norfolk Beacon, Norfolk',
                },
                {
                  image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=600',
                  location: 'VILA DE GRÀCIA',
                  name: 'The Epicurean Spirit, Gràcia',
                },
                {
                  image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=600',
                  location: 'LONDON',
                  name: 'The New Vibes, England',
                },
              ].map((card, i) => (
                <div key={i} className="min-w-[220px] flex-shrink-0">
                  <img src={card.image} alt={card.name} className="rounded-xl w-full h-40 object-cover mb-2" />
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">{card.location}</div>
                  <div className="text-base font-medium text-gray-900 leading-tight">{card.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Numbered features and image */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="text-5xl font-bold text-orange-300 leading-none">1</div>
                <div>
                  <div className="font-bold text-lg mb-1">Expert-Vetted Homes</div>
                  <div className="text-gray-600 text-base">Our experts have meticulously vetted every available rental, filtering out the thousands that don’t meet our standards - saving you from disappointment.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-5xl font-bold text-orange-300 leading-none">2</div>
                <div>
                  <div className="font-bold text-lg mb-1">In-house Care</div>
                  <div className="text-gray-600 text-base">Efficient and empowered home experts, whose sole task is to make your stay exceptional.</div>
                </div>
              </div>
              <div className="flex items-start gap-4"> 
                <div className="text-5xl font-bold text-orange-300 leading-none">3</div>
                <div>
                  <div className="font-bold text-lg mb-1">Total Reassurance</div>
                  <div className="text-gray-600 text-base">If you get stranded, we’ll help you find a new stay immidiately. Within 5 days of check-in, it’s up to 50% cheaper.</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-72 h-80">
                <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=600" alt="The Plum Promise" className="rounded-xl w-full h-full object-cover" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-300 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg text-lg border-4 border-white">The Safari Airbnbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings/Testimonial Section */}
      <section className="w-full bg-orange-400 py-14 flex flex-col items-center text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Rated "EXCELLENT" for a reason.</h2>
        <p className="text-lg text-black max-w-2xl mx-auto mb-8">
          <span className="font-semibold">We don’t just list homes—we <span className='underline underline-offset-4'>scrutinise them</span></span>, rejecting thousands that don’t meet our standards. When you book with Safari Airbnbs, you’re guaranteed the best.
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center mt-4">
          {/* Trustpilot badge */}
          <div className="flex flex-col items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Trustpilot_logo.png" alt="Trustpilot" className="h-8 mb-2" />
            <div className="flex items-center mb-1">
              {/* Real star icons */}
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" /></svg>
              ))}
            </div>
            <div className="text-black text-sm">TrustScore <b>4.6</b> | 3,818 reviews</div>
          </div>
          {/* Skift badge */}
          <img src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&w=120&h=120&fit=crop" alt="Skift Winner" className="h-20 w-20 rounded-full border-4 border-green-400 object-cover" />
          {/* Traveller Awards badges */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-black text-white rounded-full w-28 h-28 flex flex-col items-center justify-center px-2 text-center">
                <span className="text-xs mt-1">TRAVELLERS' CHOICE AWARDS 2023</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-black text-white rounded-full w-28 h-28 flex flex-col items-center justify-center px-2 text-center">
                <span className="text-xs mt-1">TRAVELLERS' CHOICE AWARDS 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Logos */}
      <section className="w-full bg-white py-6 border-b flex flex-col items-center" data-aos="fade-up">
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
          <span className="text-lg font-semibold">As featured in</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.png" alt="NYT" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/Forbes_logo.svg" alt="Forbes" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Logo-Architectural-Digest.png" alt="AD" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Harper%27s_Bazaar_logo.svg" alt="Bazaar" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Travel_%2B_Leisure_logo.svg" alt="Travel+Leisure" className="h-6" />
        </div>
      </section>

      {/* Book Your Dream Stay Section */}
      <section className="w-full bg-gray-50 py-16" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-orange-500">Book your dream stay today</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Diani Beach Villa',
                image: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&w=800',
                desc: 'A stunning beachfront villa in Diani, Kenya.'
              },
              {
                title: 'Maasai Mara Safari Lodge',
                image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800',
                desc: 'Experience the wild in luxury at Maasai Mara.'
              },
              {
                title: 'Nairobi City Apartment',
                image: 'https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800',
                desc: 'Modern comfort in the heart of Nairobi.'
              },
              {
                title: 'Mount Kenya Retreat',
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800',
                desc: 'A peaceful escape with breathtaking mountain views.'
              },
              {
                title: 'Watamu Beach House',
                image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800',
                desc: 'Relax in a beautiful home on Watamu’s white sands.'
              },
              {
                title: 'Lamu Island Hideaway',
                image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800',
                desc: 'Traditional Swahili charm on Lamu Island.'
              },
            ].map((stay, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow cursor-pointer group">
                <img src={stay.image} alt={stay.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-2 text-foreground">{stay.title}</h4>
                  <p className="text-muted-foreground text-sm">{stay.desc}</p>
                  <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
