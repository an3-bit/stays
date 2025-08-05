import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const phoneNumber = "+254720353670"; // Using the number from your contact page

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, "")}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform duration-200 hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppFloat;
