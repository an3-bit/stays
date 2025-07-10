import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const carouselImages = [
  "slide01.jpg",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=1200",
  "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&w=1200",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=1200",
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=1200",
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1200",
];

const cities = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Naivasha",
  "Nakuru",
  "Diani",
  "Watamu",
  "Nanyuki",
  "Malindi",
  "Eldoret",
  "Thika",
  "Machakos",
  "Lamu",
  "Kericho",
  "Nyeri",
  "Kitale",
  "Voi",
  "Narok",
  "Embu",
  "Meru",
  "Kakamega",
];

const HeroSection = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [city, setCity] = useState("");
  const [locationStatus, setLocationStatus] = useState("detecting");
  const selectRef = useRef(null);
  const navigate = useNavigate();

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Try to detect location
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCity("Nairobi"); // Fallback for demo
        setLocationStatus("success");
      },
      () => {
        setLocationStatus("manual");
      }
    );
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/properties?city=${encodeURIComponent(city)}`);
    } else if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Sliding Background Images */}
      {carouselImages.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${idx === bgIndex ? "opacity-100 z-0" : "opacity-0 z-0"}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Outer white border box - reduced border and padding */}
        <div className="flex flex-col items-center justify-center p-1 sm:p-3 md:p-4 border-4 border-white bg-white/0 rounded-lg max-w-xl w-full">
          {/* Inner content box with thick border */}
          <div className="w-full flex flex-col items-center justify-center border-4 border-white bg-white/10 rounded-lg px-6 py-10 md:py-14 shadow-xl">
            <div className="mb-2 text-primary tracking-widest text-sm uppercase text-center">Welcome to Safari Stays Airbnbs</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-wide text-center drop-shadow-lg">Find Your Perfect Stay</h1>
            <div className="h-1 w-16 bg-white/70 my-4 mx-auto" />
            <div className="text-lg text-white/90 mb-8 text-center font-light drop-shadow">The easiest way to find property and unique stays across Kenya.</div>
            <form className="flex flex-col items-center w-full max-w-md mx-auto gap-6" onSubmit={handleSubmit}>
              {/* Location Detection/Selection */}
              <div className="flex flex-col w-full">
                <label className="text-xs text-white/80 mb-1 font-medium text-center">Choose your city or let us detect your location</label>
                <div className="flex w-full items-center justify-center">
                  <div className="flex w-full border-2 border-white rounded-md overflow-hidden bg-white/20">
                    <select
                      ref={selectRef}
                      className="w-full bg-transparent text-white placeholder-white/80 border-none focus:ring-0 focus:border-none h-12 px-4 text-base appearance-none"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    >
                      <option value="" className="text-black bg-white">{locationStatus === "detecting" ? "Detecting your location..." : "Select a city/region"}</option>
                      {cities.map((c) => (
                        <option key={c} value={c} className="text-black bg-white">{c}</option>
                      ))}
                    </select>
                    <Button type="submit" className="h-12 px-8 bg-secondary text-secondary-foreground font-bold text-base tracking-wider shadow-none border-l-2 border-white rounded-none rounded-r-md hover:bg-secondary/90">Find Your Perfect Stay</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;