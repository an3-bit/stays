const Footer = () => (
  <footer className="bg-muted/30 border-t mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Inspiration */}
        <div>
          <h4 className="font-bold mb-4 text-foreground">Inspiration for future getaways</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Unique stays</li>
            <li>Categories</li>
            <li>Travel tips & inspiration</li>
            <li>Airbnb-friendly apartments</li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-bold mb-4 text-foreground">Support</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighborhood concern</li>
          </ul>
        </div>
        {/* Hosting */}
        <div>
          <h4 className="font-bold mb-4 text-foreground">Hosting</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Airbnb-friendly apartments</li>
          </ul>
        </div>
        {/* Airbnb */}
        <div>
          <h4 className="font-bold mb-4 text-foreground">Airbnb</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>Newsroom</li>
            <li>Learn about new features</li>
            <li>Letter from our founders</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Gift cards</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 text-xs text-muted-foreground">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Safari Stays Kenya. All rights reserved.</div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 