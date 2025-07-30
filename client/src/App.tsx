import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingSubmitted from "./pages/BookingSubmitted";
import ThankYou from "./pages/ThankYou";
import InspirationDetails from "./pages/InspirationDetails";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Become a Host flow pages
import BecomeHostAuth from "./pages/BecomeHostAuth";
import BecomeHostIntro from "./pages/BecomeHostIntro";
import BecomeHostStep1 from "./pages/BecomeHostStep1";
import BecomeHostStep2 from "./pages/BecomeHostStep2";
import BecomeHostStep3 from "./pages/BecomeHostStep3";
import BecomeHostStep4 from "./pages/BecomeHostStep4";
import BecomeHostStep5 from "./pages/BecomeHostStep5";
import BecomeHostReview from "./pages/BecomeHostReview";
import BecomeHostConfirmation from "./pages/BecomeHostConfirmation";
import HostDashboard from "./pages/HostDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Toaster />
          {/* <Navigation /> Removed global nav to avoid duplicate navs */}
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/booking-submitted" element={<BookingSubmitted />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/inspiration/:id" element={<InspirationDetails />}/>
              <Route path="/login" element={<Login />} />
              
              {/* Become a Host flow routes */}
              <Route path="/become-host" element={<BecomeHostAuth />} />
              <Route path="/become-host/intro" element={<BecomeHostIntro />} />
              <Route path="/become-host/listing/step1" element={<BecomeHostStep1 />} />
              <Route path="/become-host/listing/step2" element={<BecomeHostStep2 />} />
              <Route path="/become-host/listing/step3" element={<BecomeHostStep3 />} />
              <Route path="/become-host/listing/step4" element={<BecomeHostStep4 />} />
              <Route path="/become-host/listing/step5" element={<BecomeHostStep5 />} />
              <Route path="/become-host/review" element={<BecomeHostReview />} />
              <Route path="/become-host/confirmation" element={<BecomeHostConfirmation />} />
              <Route path="/host-dashboard" element={<HostDashboard />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
