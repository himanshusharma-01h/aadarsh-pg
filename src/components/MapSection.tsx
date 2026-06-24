import { MapPin, Navigation, Car, Footprints } from 'lucide-react';
import { motion } from 'motion/react';

export default function MapSection() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.4237512808066!2d75.92211917631379!3d26.810534276709844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9572b9a7c3d%3A0xb3ca3739bf872439!2sVivekananda%20Global%20University!5e0!3m2!1sen!2sin!4v1719210000000!5m2!1sen!2sin";
  const directionsUrl = "https://maps.google.com/?q=Vivekananda+Global+University+Jaipur";

  return (
    <section id="location" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Map Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Prime Student Hub</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Our Location & Proximity
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Aadarsh PG & Hostel is strategically situated in Jagatpura Extension, Jaipur, just a few meters from the gates of **Vivekananda Global University (VGU)**.
            </p>

            {/* Travel metrics */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                  <Footprints className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">VGU Campus Main Gate</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">2 Minutes Walk (approx. 100 meters)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Jagatpura Railway Station</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">10 Minutes Drive (approx. 5.5 km)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Jaipur International Airport</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">20 Minutes Drive (approx. 12 km)</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition"
              >
                <Navigation className="w-4 h-4 fill-white" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Interactive Map Iframe */}
          <div className="lg:col-span-7">
            <div className="relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
              <iframe
                title="Aadarsh PG & Hostel Location near VGU Jaipur"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter dark:invert-[90%] dark:hue-rotate-[180deg]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
