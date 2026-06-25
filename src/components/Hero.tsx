import { Phone, CalendarCheck, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import heroImg from '../assets/images/regenerated_image_1782383400452.png';

export default function Hero() {
  const primaryPhone = "tel:+917023107808";
  const whatsappUrl = "https://wa.me/917023107808?text=Hello!%20I'm%20interested%20in%20visiting%20Aadarsh%20PG%20%26%20Hostel%20near%20VGU.";

  const handleBookVisitClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/50 dark:bg-blue-950/20 rounded-bl-full -z-10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full -z-10 blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="w-4 h-4" />
              <span>Just 2 Minutes Walk from VGU Jaipur</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Comfortable Living for <br className="hidden sm:inline" />
              <span className="text-blue-600 dark:text-blue-400">Students Near VGU Jaipur</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Fully Furnished Double & Triple Sharing Rooms with Hygienic Food, High-Speed Wi-Fi, Attached Bathrooms and a Safe & Productive Study Environment.
            </motion.p>

            {/* Quick Metrics */}
            <motion.div 
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2 Min</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">To VGU Campus</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3x</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hygienic Meals</div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Power & Water</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={handleBookVisitClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-5 h-5" />
                Book a Visit
              </button>

              <a
                href={primaryPhone}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Graphical / Image Layout */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              className="relative mx-auto max-w-md lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Outer visual framing */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative bg-white dark:bg-slate-900 p-2.5 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <img 
                  src={heroImg}
                  alt="Aadarsh PG Double Sharing Room" 
                  className="rounded-2xl w-full h-[320px] sm:h-[400px] object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Floating badging */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-white/20 dark:border-slate-800 shadow-lg flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">ADMISSIONS OPEN</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">Session 2026 - 2027</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm block font-medium text-slate-500 dark:text-slate-400 leading-none">Starting from</span>
                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">₹90,000/yr</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
