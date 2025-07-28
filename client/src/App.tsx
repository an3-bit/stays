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
              <Route path="/inspiration/:id"element={<InspirationDetails />}/>
              <Route path="/login" element={<Login />} />
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
