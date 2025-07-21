import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Printer, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Separator } from "@/components/ui/separator";

const ThankYou = () => {
  const location = useLocation();
  const { booking, property, amount } = location.state || {};

  if (!booking || !property || amount === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Receipt Data Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the details for your receipt. This can happen if the page is reloaded.
          </p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const receiptElement = document.getElementById('receipt');
    if (receiptElement) {
      html2canvas(receiptElement, {
        scale: 2, // Improves resolution for better quality
        useCORS: true, 
        backgroundColor: window.getComputedStyle(document.body).backgroundColor, // Use body background for theme consistency
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in portrait orientation

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasAspectRatio = canvas.width / canvas.height;
        
        const margin = 10; // 10mm margin on each side
        const contentWidth = pdfWidth - (margin * 2);
        let contentHeight = contentWidth / canvasAspectRatio;
        
        // If content is too tall for one page, scale it down to fit
        if (contentHeight > pdfHeight - (margin * 2)) {
          contentHeight = pdfHeight - (margin * 2);
          // Re-calculate width based on new height to maintain aspect ratio
          // This part is often skipped, but it's good practice for very tall content
        }

        const x = margin;
        const y = margin;
        
        pdf.addImage(imgData, 'PNG', x, y, contentWidth, contentHeight);
        pdf.save(`SafariStays_Receipt_${booking._id.slice(-6)}.pdf`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Thank You for Your Payment!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your payment has been successfully processed. A confirmation email with your receipt has been sent.
            </p>
          </div>

          <div id="receipt" className="border-t border-b border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-800 px-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">Booking Receipt</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Booking ID:</span>
                <span className="font-medium text-gray-800 dark:text-white">{booking._id.slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Booked By:</span>
                <span className="font-medium text-gray-800 dark:text-white">{booking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Property:</span>
                <span className="font-medium text-gray-800 dark:text-white">{property.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Check-in:</span>
                <span className="font-medium text-gray-800 dark:text-white">{new Date(booking.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Check-out:</span>
                <span className="font-medium text-gray-800 dark:text-white">{new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Guests:</span>
                <span className="font-medium text-gray-800 dark:text-white">{booking.guests}</span>
              </div>
              <Separator className="my-3 dark:bg-gray-600"/>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-600 dark:text-gray-300">Amount Paid:</span>
                <span className="text-primary">KSh {amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              If you have any questions, please contact our support team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <div className="mt-6">
                <Link to="/">
                    <Button>Back to Homepage</Button>
                </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou; 