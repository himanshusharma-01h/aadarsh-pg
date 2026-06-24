import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800">
      
      {/* Upper Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white font-bold text-lg px-2.5 py-1 rounded-lg mr-2">
                A
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aadarsh PG & Hostel
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium, comfortable, and affordable student hostel accommodation located right next to Vivekananda Global University (VGU), Jagatpura, Jaipur. Committed to standard hygiene, robust security, and wholesome food.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home Banner</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">Room Pricing Plans</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Mess Weekly Menu</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Student Reviews</a>
              </li>
            </ul>
          </div>

          {/* Major Facilities */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-5">
              Hostel Facilities
            </h3>
            <ul className="space-y-3 text-xs">
              <li>• Fully Furnished Bedrooms</li>
              <li>• Western Attached Bathrooms</li>
              <li>• High-Speed broadband Wi-Fi</li>
              <li>• RO Mineral Drinking Water</li>
              <li>• 24/7 CCTV Camera Security</li>
              <li>• Fresh, Nutritional Mess Meals</li>
              <li>• Regular Daily Room Cleaning</li>
            </ul>
          </div>

          {/* Contacts Col */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-5">
              Contact Details
            </h3>
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Sector 36, NRI Road, Jagatpura Extension, Jaipur, Rajasthan, 303012 (Near VGU Main Gate)</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <a href="tel:+917023107808" className="hover:text-white block">+91 7023107808</a>
                  <a href="tel:+918302453121" className="hover:text-white block">+91 8302453121</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:aadarshhostelvgu@gmail.com" className="hover:text-white">aadarshhostelvgu@gmail.com</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Top trigger */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium">
          
          <div>
            &copy; {currentYear} Aadarsh PG & Hostel, Jaipur. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Clean Rooms • Hygienic Food • Wi-Fi • Safe Accommodation</span>
            <button
              onClick={handleScrollToTop}
              className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
