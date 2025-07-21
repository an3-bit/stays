import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import herob2 from "@/assets/bg.jpg"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const GEOAPIFY_API_KEY = "b94fe224744f45c9a7a4594e148726f0";

const popularDestinations = [
  {
    name: "Mombasa, Kenya",
    description: "For its seaside allure",
    icon: (
      <span role="img" aria-label="beach">🏖️</span>
    )
  },
  {
    name: "Nanyuki, Kenya",
    description: "For nature-lovers",
    icon: (
      <span role="img" aria-label="mountain">⛰️</span>
    )
  },
  {
    name: "Nakuru, Kenya",
    description: "Known for its lakes",
    icon: (
      <span role="img" aria-label="lake">🌊</span>
    )
  }
];

const HeroSection = () => {
  const [destination, setDestination] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showCommand, setShowCommand] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const destinations = [
    "Nairobi",
    "Mombasa",
    "Diani Beach",
    "Maasai Mara",
    "Nanyuki",
    "Naivasha",
    "Kisumu",
    "Lamu",
    "Malindi",
    "Amboseli"
  ];
  const filtered = destination
    ? destinations.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
    : destinations;

  // Remove Google Maps/Places API code
  // Use OpenStreetMap Nominatim for all location search and reverse geocoding

  // Live search for Kenyan cities using Geoapify
  useEffect(() => {
    if (!destination) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(destination)}&filter=countrycode:ke&limit=5&apiKey=${GEOAPIFY_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(
          (data.features || []).map(item => ({
            description: item.properties.formatted,
            place_id: item.properties.place_id
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [destination]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Geolocation for 'Nearby' using Geoapify reverse geocoding
  function handleNearby() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEOAPIFY_API_KEY}`)
            .then(res => res.json())
            .then(data => {
              if (data.features && data.features.length > 0) {
                const city = data.features[0].properties.city || data.features[0].properties.formatted;
                setSuggestions([{ description: city, place_id: 'nearby' }]);
              } else {
                setSuggestions([]);
              }
              setLoading(false);
            })
            .catch(() => setLoading(false));
        },
        () => {
          alert("Unable to get your location");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileStep, setMobileStep] = useState<'destination' | 'dates' | 'guests' | null>(null);
  // Add state for date picker tab and flexible options
  const [dateTab, setDateTab] = useState<'specific' | 'flexible'>('specific');
  const [flexibleDuration, setFlexibleDuration] = useState<string | null>(null);
  const [flexibleMonths, setFlexibleMonths] = useState<string[]>([]);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  // Replace monthsToShow with all 12 months
  const monthsToShow = Array.from({ length: 12 }, (_, i) => i); // 0 to 11 for Jan to Dec
  const [dateFlexibility, setDateFlexibility] = useState<'exact' | '+1' | '+2' | '+3' | '+7'>('exact');

  // Mobile search bar click handler
  function openMobileSheet(step: 'destination' | 'dates' | 'guests' = 'destination') {
    setMobileSheetOpen(true);
    setMobileStep(step);
  }

  function closeMobileSheet() {
    setMobileSheetOpen(false);
    setMobileStep(null);
  }

  // Mobile step navigation
  function goToStep(step: 'destination' | 'dates' | 'guests') {
    setMobileStep(step);
  }

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${herob2})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, zIndex: 20 }} className="w-full flex justify-center pointer-events-none select-none">
        <span
          className="text-white"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontWeight: 700,
            fontSize: '1.35rem',
            letterSpacing: '0.08em',
            textShadow: '0 2px 16px rgba(0,0,0,0.28)',
            lineHeight: 1.1,
          }}
        >
          Safari Stays
        </span>
      </div>
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Brand name at the top */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">
        
        </h1>
        {/* Mobile search bar */}
        {isMobile ? (
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <div className="text-center text-xl font-semibold mb-4">Stay in the world's most remarkable Safari Airbnbs</div>
            <div className="flex flex-col gap-3">
              <button onClick={() => openMobileSheet('destination')} className="flex items-center gap-3 px-4 py-3 border rounded-lg text-left w-full">
                <span className="text-lg">🔍</span>
                <span className="text-gray-500 flex-1">{destination ? destination : 'Where are you going?'}</span>
              </button>
              <button onClick={() => openMobileSheet('dates')} className="flex items-center gap-3 px-4 py-3 border rounded-lg text-left w-full">
                <span className="text-lg">📅</span>
                <span className="text-gray-500 flex-1">{dateRange.from && dateRange.to ? `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}` : 'Add dates'}</span>
              </button>
              <button onClick={() => openMobileSheet('guests')} className="flex items-center gap-3 px-4 py-3 border rounded-lg text-left w-full">
                <span className="text-lg">👤</span>
                <span className="text-gray-500 flex-1">{guests.adults + guests.children + guests.infants + guests.pets > 0 ? `${guests.adults + guests.children + guests.infants + guests.pets} guest${guests.adults + guests.children + guests.infants + guests.pets > 1 ? 's' : ''}` : 'Add guests'}</span>
              </button>
            </div>
            <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg">Search</button>
          </div>
        ) : (
          // ... existing desktop form ...
          <form className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden relative">
              {/* Destination (Google Places Autocomplete) */}
              <div className="flex-1 px-0 relative">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full px-6 py-4 text-base outline-none border-none bg-transparent min-w-0"
                  placeholder="Search destinations..."
                  value={destination}
                  onChange={e => {
                    setDestination(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  autoComplete="off"
                />
                {showDropdown && (
                  <div ref={dropdownRef} className="absolute left-0 top-full w-full z-50 bg-white border border-gray-200 rounded shadow-lg mt-1 max-h-80 overflow-y-auto">
                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground">Suggested destinations</div>
                    {/* Nearby option */}
                    <div
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                      onMouseDown={handleNearby}
                    >
                      <span className="text-xl">📍</span>
                      <div>
                        <div className="font-medium">Nearby</div>
                        <div className="text-xs text-muted-foreground">Find what’s around you</div>
                      </div>
                    </div>
                    {/* Popular destinations */}
                    {popularDestinations.map(dest => (
                      <div
                        key={dest.name}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                        onMouseDown={() => {
                          setDestination(dest.name);
                          setShowDropdown(false);
                        }}
                      >
                        <span className="text-xl">{dest.icon}</span>
                        <div>
                          <div className="font-medium">{dest.name}</div>
                          <div className="text-xs text-muted-foreground">{dest.description}</div>
                        </div>
                      </div>
                    ))}
                    {/* Google Places suggestions */}
                    {loading && <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>}
                    {suggestions.map(s => (
                      <div
                        key={s.place_id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded"
                        onMouseDown={() => {
                          setDestination(s.description);
                          setShowDropdown(false);
                        }}
                      >
                        <span className="text-base mr-2">📌</span>{s.description}
                      </div>
                    ))}
                    {(!loading && suggestions.length === 0 && destination) && (
                      <div className="px-4 py-2 text-sm text-muted-foreground">No results. Press Enter to use "{destination}"</div>
                    )}
                  </div>
                )}
              </div>
              {/* Dates (dropdown calendar) */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 px-6 py-4 text-base outline-none border-none bg-transparent min-w-0 border-t md:border-t-0 md:border-l border-gray-200 text-left"
                  >
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
                      : 'Add dates'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              {/* Guests (dropdown with counters) */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 px-6 py-4 text-base outline-none border-none bg-transparent min-w-0 border-t md:border-t-0 md:border-l border-gray-200 text-left"
                  >
                    {guests.adults + guests.children + guests.infants + guests.pets > 0
                      ? `${guests.adults + guests.children + guests.infants + guests.pets} guest${guests.adults + guests.children + guests.infants + guests.pets > 1 ? 's' : ''}`
                      : 'Add guests'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-xs text-muted-foreground">Age 13+</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, adults: Math.max(0, g.adults - 1) }))}><Minus /></button>
                        <span>{guests.adults}</span>
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, adults: g.adults + 1 }))}><Plus /></button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-xs text-muted-foreground">Age 1 to 12</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, children: Math.max(0, g.children - 1) }))}><Minus /></button>
                        <span>{guests.children}</span>
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, children: g.children + 1 }))}><Plus /></button>
                      </div>
                    </div>
                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Infants</div>
                        <div className="text-xs text-muted-foreground">Under 1</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, infants: Math.max(0, g.infants - 1) }))}><Minus /></button>
                        <span>{guests.infants}</span>
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, infants: g.infants + 1 }))}><Plus /></button>
                      </div>
                    </div>
                    {/* Pets */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Pets</div>
                        <div className="text-xs text-muted-foreground">An extra fee may apply</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, pets: Math.max(0, g.pets - 1) }))}><Minus /></button>
                        <span>{guests.pets}</span>
                        <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, pets: g.pets + 1 }))}><Plus /></button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <button
                type="submit"
                className="px-8 py-4 bg-orange-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-none md:rounded-r-xl transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        )}
        {/* Mobile Sheet for step-by-step flow */}
        {isMobile && (
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetContent className="p-0 max-w-full w-full h-full flex flex-col">
              <SheetHeader className="flex-shrink-0">
                <SheetTitle className="text-center py-4 border-b text-lg font-bold">Safari Stays</SheetTitle>
              </SheetHeader>
              {/* Step content */}
              {mobileStep === 'destination' && (
                <div className="flex-1 flex flex-col">
                  <button className="text-left px-4 py-4 flex items-center gap-2 text-gray-700 font-medium border-b" onClick={closeMobileSheet}>&larr; <span>Back</span></button>
                  <div className="px-4 py-4">
                    <div className="text-lg font-semibold mb-2">Find your destination</div>
                    <input
                      ref={inputRef}
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg text-base mb-4"
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={e => {
                        setDestination(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      autoComplete="off"
                    />
                    <div className="text-xs text-muted-foreground mb-2">Popular destinations</div>
                    <div className="flex flex-col gap-2">
                      {popularDestinations.map(dest => (
                        <button
                          key={dest.name}
                          className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 text-left"
                          onClick={() => {
                            setDestination(dest.name);
                            setShowDropdown(false);
                            goToStep('dates');
                          }}
                        >
                          <span className="text-lg">{dest.icon}</span>
                          <span>{dest.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto p-4">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg" onClick={() => goToStep('dates')}>Next</button>
                  </div>
                </div>
              )}
              {mobileStep === 'dates' && (
                <div className="flex-1 flex flex-col">
                  <button className="text-left px-4 py-4 flex items-center gap-2 text-gray-700 font-medium border-b" onClick={() => goToStep('destination')}>&larr; <span>Back</span></button>
                  <div className="px-4 py-4 flex flex-col gap-4 h-full">
                    <div className="flex gap-2">
                      <button
                        className={`flex-1 py-2 rounded-full border ${dateTab === 'specific' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                        onClick={() => setDateTab('specific')}
                      >
                        Search specific dates
                      </button>
                      <button
                        className={`flex-1 py-2 rounded-full border ${dateTab === 'flexible' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                        onClick={() => setDateTab('flexible')}
                      >
                        I'm flexible
                      </button>
                    </div>
                    {dateTab === 'specific' ? (
                      <>
                        {/* Flexibility buttons always visible */}
                        <div className="flex gap-2 justify-center mb-2">
                          <button type="button" className={`px-3 py-2 rounded border text-sm ${dateFlexibility === 'exact' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border-gray-300'}`} onClick={() => setDateFlexibility('exact')}>Exact dates</button>
                          <button type="button" className={`px-3 py-2 rounded border text-sm ${dateFlexibility === '+1' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border-gray-300'}`} onClick={() => setDateFlexibility('+1')}>± 1 day</button>
                          <button type="button" className={`px-3 py-2 rounded border text-sm ${dateFlexibility === '+2' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border-gray-300'}`} onClick={() => setDateFlexibility('+2')}>± 2 days</button>
                          <button type="button" className={`px-3 py-2 rounded border text-sm ${dateFlexibility === '+3' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border-gray-300'}`} onClick={() => setDateFlexibility('+3')}>± 3 days</button>
                          <button type="button" className={`px-3 py-2 rounded border text-sm ${dateFlexibility === '+7' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 border-gray-300'}`} onClick={() => setDateFlexibility('+7')}>± 7 days</button>
                        </div>
                        <div className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
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
                            numberOfMonths={2}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-6">
                          <div className="font-semibold mb-2">Go for...</div>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              className={`flex flex-col items-center border rounded-lg p-4 ${flexibleDuration === 'weekend' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                              onClick={() => setFlexibleDuration('weekend')}
                              type="button"
                            >
                              <span className="text-3xl mb-2">🏡</span>
                              <span className="font-medium">A weekend</span>
                              <span className="text-xs text-gray-500">Fri - Sun</span>
                              <span className="mt-2"><input type="radio" checked={flexibleDuration === 'weekend'} readOnly /></span>
                            </button>
                            <button
                              className={`flex flex-col items-center border rounded-lg p-4 ${flexibleDuration === 'week' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                              onClick={() => setFlexibleDuration('week')}
                              type="button"
                            >
                              <span className="text-3xl mb-2">🖼️</span>
                              <span className="font-medium">A week</span>
                              <span className="text-xs text-gray-500">7 days</span>
                              <span className="mt-2"><input type="radio" checked={flexibleDuration === 'week'} readOnly /></span>
                            </button>
                            <button
                              className={`flex flex-col items-center border rounded-lg p-4 ${flexibleDuration === 'two_weeks' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                              onClick={() => setFlexibleDuration('two_weeks')}
                              type="button"
                            >
                              <span className="text-3xl mb-2">🏖️</span>
                              <span className="font-medium">Two weeks</span>
                              <span className="text-xs text-gray-500">14 days</span>
                              <span className="mt-2"><input type="radio" checked={flexibleDuration === 'two_weeks'} readOnly /></span>
                            </button>
                            <button
                              className={`flex flex-col items-center border rounded-lg p-4 ${flexibleDuration === 'month' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                              onClick={() => setFlexibleDuration('month')}
                              type="button"
                            >
                              <span className="text-3xl mb-2">⛰️</span>
                              <span className="font-medium">A month</span>
                              <span className="text-xs text-gray-500">30 days</span>
                              <span className="mt-2"><input type="radio" checked={flexibleDuration === 'month'} readOnly /></span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold mb-2">Travel in...</div>
                          <div className="grid grid-cols-3 gap-2">
                            {monthsToShow.map(m => (
                              <button
                                key={m}
                                className={`border rounded-lg py-3 ${flexibleMonths.includes(`${monthNames[m]} ${currentYear}`) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}
                                onClick={() => {
                                  setFlexibleMonths(flexibleMonths.includes(`${monthNames[m]} ${currentYear}`)
                                    ? flexibleMonths.filter(val => val !== `${monthNames[m]} ${currentYear}`)
                                    : [...flexibleMonths, `${monthNames[m]} ${currentYear}`]);
                                }}
                                type="button"
                              >
                                <div className="font-medium">{monthNames[m]}</div>
                                <div className="text-xs text-gray-500">{currentYear}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-auto p-4 flex gap-2">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg" onClick={() => { goToStep('guests'); }}>Next</button>
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg" onClick={closeMobileSheet}>Apply</button>
                  </div>
                </div>
              )}
              {mobileStep === 'guests' && (
                <div className="flex-1 flex flex-col">
                  <button className="text-left px-4 py-4 flex items-center gap-2 text-gray-700 font-medium border-b" onClick={() => goToStep('dates')}>&larr; <span>Back</span></button>
                  <div className="px-4 py-4">
                    <div className="text-lg font-semibold mb-2">Who's coming along?</div>
                    <div className="flex flex-col gap-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Adults</div>
                          <div className="text-xs text-muted-foreground">Age 13+</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, adults: Math.max(0, g.adults - 1) }))}><Minus /></button>
                          <span>{guests.adults}</span>
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, adults: g.adults + 1 }))}><Plus /></button>
                        </div>
                      </div>
                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Children</div>
                          <div className="text-xs text-muted-foreground">Age 1 to 12</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, children: Math.max(0, g.children - 1) }))}><Minus /></button>
                          <span>{guests.children}</span>
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, children: g.children + 1 }))}><Plus /></button>
                        </div>
                      </div>
                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Infants</div>
                          <div className="text-xs text-muted-foreground">Under 1</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, infants: Math.max(0, g.infants - 1) }))}><Minus /></button>
                          <span>{guests.infants}</span>
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, infants: g.infants + 1 }))}><Plus /></button>
                        </div>
                      </div>
                      {/* Pets */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Pets</div>
                          <div className="text-xs text-muted-foreground">An extra fee may apply</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, pets: Math.max(0, g.pets - 1) }))}><Minus /></button>
                          <span>{guests.pets}</span>
                          <button type="button" className="border rounded-full w-8 h-8 flex items-center justify-center" onClick={() => setGuests(g => ({ ...g, pets: g.pets + 1 }))}><Plus /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto p-4">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg" onClick={closeMobileSheet}>Apply</button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        )}
      </div>
    </section>
  );
};

export default HeroSection;