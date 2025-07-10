import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const inspirations = [
  {
    id: 1,
    title: "Beachfront Escapes",
    image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=800",
    description: "Relax in stunning beachfront homes along Kenya's coast, from Diani to Watamu.",
    highlights: ["Ocean views", "Direct beach access", "Private pools", "Family friendly"],
    price: "KSh 15,000",
    location: "Diani Beach, Kenya",
    thingsToKnow: ["Check-in after 2PM", "No pets", "Free parking", "Wi-Fi included"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=39.5%2C-4.3%2C39.7%2C-4.1&layer=mapnik",
    host: {
      name: "Amina",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      reviews: 120,
      responseRate: "98%",
      responseTime: "within an hour"
    },
    reviews: [
      { name: "John", text: "Amazing stay! The beach was right at our doorstep.", rating: 5 },
      { name: "Grace", text: "Perfect for families. Will come again!", rating: 5 }
    ]
  },
  {
    id: 2,
    title: "Safari Lodges",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=800",
    description: "Experience the wild in luxury lodges near Maasai Mara, Amboseli, and Tsavo.",
    highlights: ["Game drives", "All meals included", "Guided tours", "Wildlife views"],
    price: "KSh 22,000",
    location: "Maasai Mara, Kenya",
    thingsToKnow: ["Check-in after 3PM", "No smoking", "Guided tours included", "All meals provided"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=35.0%2C-1.5%2C35.5%2C-1.0&layer=mapnik",
    host: {
      name: "David",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      reviews: 98,
      responseRate: "95%",
      responseTime: "within 2 hours"
    },
    reviews: [
      { name: "Paul", text: "Saw the Big Five! Unforgettable experience.", rating: 5 },
      { name: "Linda", text: "The lodge was beautiful and the food was great.", rating: 4 }
    ]
  },
  {
    id: 3,
    title: "Urban Chic Apartments",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=800",
    description: "Stay in stylish city apartments in Nairobi, Mombasa, and Kisumu.",
    highlights: ["Central location", "Modern amenities", "24/7 security", "Great for business trips"],
    price: "KSh 9,500",
    location: "Nairobi, Kenya",
    thingsToKnow: ["Check-in after 1PM", "No parties", "Elevator access", "Self check-in"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=36.8%2C-1.3%2C36.9%2C-1.2&layer=mapnik",
    host: {
      name: "Lucy",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      reviews: 80,
      responseRate: "99%",
      responseTime: "within 30 minutes"
    },
    reviews: [
      { name: "Brian", text: "Perfect for my business trip. Super convenient.", rating: 5 },
      { name: "Janet", text: "Loved the decor and location!", rating: 4 }
    ]
  },
  {
    id: 4,
    title: "Mountain Retreats",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800",
    description: "Unwind in serene cabins and villas with breathtaking views of Mt. Kenya and Aberdares.",
    highlights: ["Mountain views", "Fireplace", "Nature trails", "Peaceful setting"],
    price: "KSh 12,000",
    location: "Nanyuki, Kenya",
    thingsToKnow: ["Check-in after 2PM", "Bring warm clothing", "Car recommended", "No Wi-Fi in some areas"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=37.0%2C0.0%2C37.2%2C0.2&layer=mapnik",
    host: {
      name: "Peter",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      reviews: 60,
      responseRate: "97%",
      responseTime: "within 1 hour"
    },
    reviews: [
      { name: "Alice", text: "The views were incredible. So peaceful!", rating: 5 },
      { name: "Sam", text: "Great for a weekend getaway.", rating: 4 }
    ]
  },
  {
    id: 5,
    title: "Family Villas",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=800",
    description: "Spacious homes perfect for family getaways and group adventures.",
    highlights: ["Large living spaces", "Private gardens", "Child-friendly", "BBQ area"],
    price: "KSh 18,000",
    location: "Naivasha, Kenya",
    thingsToKnow: ["Check-in after 2PM", "No loud music after 10PM", "Pets allowed", "Free parking"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=36.4%2C-0.8%2C36.6%2C-0.6&layer=mapnik",
    host: {
      name: "Mary",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      reviews: 110,
      responseRate: "96%",
      responseTime: "within 2 hours"
    },
    reviews: [
      { name: "James", text: "Perfect for our family reunion!", rating: 5 },
      { name: "Faith", text: "Kids loved the garden.", rating: 5 }
    ]
  },
  {
    id: 6,
    title: "Romantic Hideaways",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=800",
    description: "Cozy, private stays for couples seeking a romantic escape.",
    highlights: ["Secluded", "Hot tub", "Candlelit dinners", "Beautiful views"],
    price: "KSh 13,000",
    location: "Watamu, Kenya",
    thingsToKnow: ["Check-in after 3PM", "Couples only", "No children", "Breakfast included"],
    map: "https://www.openstreetmap.org/export/embed.html?bbox=40.0%2C-3.4%2C40.2%2C-3.2&layer=mapnik",
    host: {
      name: "Joseph",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      reviews: 70,
      responseRate: "99%",
      responseTime: "within 1 hour"
    },
    reviews: [
      { name: "Diana", text: "So romantic! The hot tub was a highlight.", rating: 5 },
      { name: "Kevin", text: "Perfect for our anniversary.", rating: 5 }
    ]
  },
];

const InspirationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const inspiration = useMemo(() => inspirations.find(i => i.id === Number(id)), [id]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: ""
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBookingOpen(false);
    navigate("/booking-confirmation");
  };

  if (!inspiration) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Inspiration not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header image and title */}
      <div className="w-full h-80 md:h-[400px] relative">
        <img src={inspiration.image} alt={inspiration.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-primary drop-shadow-lg">{inspiration.title}</h1>
          <p className="text-white/90 mt-2 max-w-2xl">{inspiration.description}</p>
        </div>
      </div>
      {/* Main content */}
      <div className="container mx-auto px-4 max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Details */}
        <div className="md:col-span-2 space-y-8">
          {/* Highlights */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">What makes this special</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              {inspiration.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
          {/* Things to Know */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Things to Know</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              {inspiration.thingsToKnow.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          {/* Map */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Where you'll be</h2>
            <div className="rounded-lg overflow-hidden border border-border shadow">
              <iframe
                src={inspiration.map}
                title="Map"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="text-muted-foreground mt-2">{inspiration.location}</div>
          </div>
          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary">Guest Reviews</h2>
            <div className="space-y-4">
              {inspiration.reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="font-bold text-foreground">{r.name}</div>
                  <div className="text-yellow-500">{"★".repeat(r.rating)}<span className="text-muted-foreground">{"★".repeat(5 - r.rating)}</span></div>
                  <div className="text-muted-foreground mt-1">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Booking Card & Host */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6 sticky top-28">
            <div className="text-2xl font-bold text-primary mb-2">{inspiration.price} <span className="text-base font-normal text-muted-foreground">/night</span></div>
            <div className="text-muted-foreground mb-4">{inspiration.location}</div>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">Book Now</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-primary">Book {inspiration.title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests">Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check In</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check Out</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Special Requests (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Any special requirements or requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">Confirm Booking</button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <img src={inspiration.host.image} alt={inspiration.host.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <div className="font-bold text-lg text-primary">Meet your host, {inspiration.host.name}</div>
              <div className="text-muted-foreground text-sm">{inspiration.host.reviews} reviews · Response rate: {inspiration.host.responseRate} · {inspiration.host.responseTime}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationDetails; 