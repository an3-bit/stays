
import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertySection from "@/components/PropertySection";
import HeroSection from "@/components/HeroSection";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Users, BedDouble, Bath, Home } from "lucide-react";
import { format } from "date-fns";

// Modal component for property details
function PropertyModal({ property, onClose }: { property: any, onClose: () => void }) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(1);
  if (!property) return null;
  // Placeholder facts
  const facts = {
    guests: property.guests || 2,
    bedrooms: property.bedrooms || 1,
    beds: property.beds || 1,
    bathrooms: property.bathrooms || 1,
    location: property.location || "Kenya",
    region: property.region || "Coast"
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 py-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold z-10">&times;</button>
        {/* Left: Images and details */}
        <div className="md:w-2/3 w-full p-6 flex flex-col">
          <div className="relative w-full aspect-[3/2] mb-4">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-lg" />
            {/* If more images, show a 'View photos' button */}
            {/* <button className="absolute bottom-3 right-3 bg-white/80 px-4 py-2 rounded shadow text-sm font-semibold">View photos</button> */}
          </div>
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-2">
            {facts.location} &gt; {facts.region}
          </div>
          {/* Title */}
          <h2 className="text-3xl font-serif font-bold mb-2">{property.title}</h2>
          {/* Key facts */}
          <div className="flex flex-wrap gap-6 mb-4 text-gray-700 text-base items-center">
            <span className="flex items-center gap-1"><Users className="w-5 h-5" /> {facts.guests} guests</span>
            <span className="flex items-center gap-1"><BedDouble className="w-5 h-5" /> {facts.bedrooms} bedroom{facts.bedrooms > 1 ? 's' : ''}, {facts.beds} bed{facts.beds > 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1"><Bath className="w-5 h-5" /> {facts.bathrooms} bathroom{facts.bathrooms > 1 ? 's' : ''}</span>
          </div>
          {/* Description */}
          <p className="text-gray-600 mb-6">{property.desc}</p>
        </div>
        {/* Right: Booking panel */}
        <div className="md:w-1/3 w-full p-6 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-start">
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
            <div className="mb-4 text-gray-700 font-semibold">Add dates for price</div>
            {/* Date picker */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Select dates</label>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  if (range && range.from && range.to) {
                    setDateRange({ from: range.from, to: range.to });
                  } else if (range && range.from) {
                    setDateRange({ from: range.from, to: range.from });
                  } else {
                    setDateRange({ from: undefined, to: undefined });
                  }
                }}
                numberOfMonths={1}
              />
            </div>
            {/* Guest selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Guests</label>
              <div className="flex items-center gap-2">
                <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center text-lg" onClick={() => setGuests(g => Math.max(1, g - 1))}>-</button>
                <span>{guests}</span>
                <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center text-lg" onClick={() => setGuests(g => g + 1)}>+</button>
              </div>
            </div>
            <button className="w-full py-3 bg-orange-500 text-white rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors">Check availability</button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
    let isMounted = true;
    const fetchProperties = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBase}/api/properties`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        const sorted = data.sort((a, b) => {
          if (a.updatedAt && b.updatedAt) {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          }
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return 0;
        });
        if (isMounted) setProperties(sorted);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
        // Set up the next poll with a random interval between 10-15 seconds
        clearInterval(intervalId);
        const nextInterval = Math.floor(Math.random() * 5000) + 10000; // 10000-15000 ms
        intervalId = setInterval(fetchProperties, nextInterval);
      }
    };
    fetchProperties();
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
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

      {/* Book Your Dream Stay Section */}
      <section className="w-full bg-gray-50 py-16" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-extrabold mb-8 text-orange-500 text-center">Book your dream stay today</h3>
          {loading ? (
            <div className="text-center py-8">Loading properties...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((stay) => (
                <Link
                  key={stay._id || stay.id}
                  to={`/property/${stay._id || stay.id}`}
                  className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:scale-[1.025] transition-transform transition-shadow duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-orange-400"
                  tabIndex={0}
                  aria-label={`View details for ${stay.title}`}
                  style={{ textDecoration: 'none' }}
                >
                  <img src={stay.image} alt={stay.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-5">
                    <span className="inline-block mb-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">{stay.type}</span>
                    <h4 className="text-xl font-semibold mb-2 text-foreground">{stay.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{stay.desc}</p>
                    <span className="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded-full font-semibold text-sm group-hover:bg-orange-600 transition-colors">View Details</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Peace of Mind Section */}
      <section className="w-full bg-white py-16" data-aos="fade-up">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          {/* Left: Heading and horizontal property cards */}
          <div>
            <h3 className="text-3xl font-bold mb-2 text-orange-500">Why choose tvhstays Airbnbs</h3>
            <p className="mb-8 text-gray-600 text-lg">We promise expert-vetted homes, total transparency and exceptional service.</p>
            <div className="flex space-x-6 overflow-x-auto pb-2">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=600',
                  location: 'MOUNT KENYA',
                  name: 'Alpine View Cabin',
                },
                {
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=compress&w=600',
                  location: 'DIANI BEACH',
                  name: 'Oceanfront Treehouse',
                },
                {
                  image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&w=600',
                  location: 'MAASAI MARA',
                  name: 'Savannah Panorama Lodge',
                },
                {
                  image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=compress&w=600',
                  location: 'LAKE NAIVASHA',
                  name: 'Lakeview Glass House',
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
                <div className="text-5xl font-bold text-orange-500 leading-none">1</div>
                <div>
                  <div className="font-bold text-lg mb-1">Expert-Vetted Homes</div>
                  <div className="text-gray-600 text-base">Our experts have meticulously vetted every available rental, filtering out the thousands that don’t meet our standards - saving you from disappointment.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-5xl font-bold text-orange-500 leading-none">2</div>
                <div>
                  <div className="font-bold text-lg mb-1">In-house Care</div>
                  <div className="text-gray-600 text-base">Efficient and empowered home experts, whose sole task is to make your stay exceptional.</div>
                </div>
              </div>
              <div className="flex items-start gap-4"> 
                <div className="text-5xl font-bold text-orange-500 leading-none">3</div>
                <div>
                  <div className="font-bold text-lg mb-1">Total Reassurance</div>
                  <div className="text-gray-600 text-base">If you get stranded, we’ll help you find a new stay immidiately. Within 5 days of check-in, it’s up to 50% cheaper.</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-72 h-80">
                <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=600" alt="The Plum Promise" className="rounded-xl w-full h-full object-cover" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-300 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg text-lg border-4 border-white">The tvhstays Airbnbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings/Testimonial Section */}
      <section className="w-full bg-orange-400 py-14 flex flex-col items-center text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Rated "EXCELLENT" for a reason.</h2>
        <p className="text-lg text-black max-w-2xl mx-auto mb-8">
          <span className="font-semibold">We don’t just list homes—we <span className='underline underline-offset-4'>scrutinise them</span></span>, rejecting thousands that don’t meet our standards. When you book with tvhstays Airbnbs, you’re guaranteed the best.
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
          <img src="/logos/citizen_tv.png" alt="Citizen TV" className="h-12 w-auto max-w-[160px] object-contain" />
          <img src="/logos/ktn_news.png" alt="KTN News" className="h-12 w-auto max-w-[120px] object-contain" />
          <img src="/logos/ntv_kenya.png" alt="NTV Kenya" className="h-12 w-auto max-w-[120px] object-contain" />
          <img src="/logos/the_standard.png" alt="The Standard" className="h-12 w-auto max-w-[160px] object-contain" />
          <img src="/logos/k24_news.png" alt="K24 News" className="h-12 w-auto max-w-[180px] object-contain shadow-lg" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
