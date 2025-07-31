import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HostNavbarProps {
  title?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

const HostNavbar = ({ 
  title = "Become a Host",
  onBack,
  showBackButton = true
}: HostNavbarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button */}
          <div className="flex items-center">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Button>
            )}
          </div>

          {/* Center - Title */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-medium text-gray-900">{title}</h1>
          </div>

          {/* Right side - Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-red-500">
              TVHStays
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HostNavbar;
