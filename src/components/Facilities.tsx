import { 
  Home, Users, Bath, Wifi, Droplet, Shield, Sparkles, Zap, Bed, BookOpen 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Facilities() {
  const facilityList = [
    {
      icon: Home,
      title: "Fully Furnished Rooms",
      description: "Each room is set up with standard beds, study desks, proper storage, individual power supplies, and storage wardrobes."
    },
    {
      icon: Users,
      title: "Double Sharing",
      description: "Excellent layout for two roommates with separate spaces, study setups, and storage cupboards."
    },
    {
      icon: Users,
      title: "Triple Sharing",
      description: "Affordable shared layout that balances space, individual utility, and peer engagement."
    },
    {
      icon: Bath,
      title: "Attached Bathrooms",
      description: "Western toilets, premium sanitary fittings, mirrors, and active geyser facilities for warm water."
    },
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi",
      description: "Dedicated broadband routers on each floor ensuring seamless speed for academics and streaming."
    },
    {
      icon: Droplet,
      title: "RO Drinking Water",
      description: "In-house industrial RO water purification plant providing continuous clean, safe, mineral drinking water."
    },
    {
      icon: Shield,
      title: "CCTV Security",
      description: "Strategic CCTV camera placements across entrances, corridors, and general areas for continuous security monitoring."
    },
    {
      icon: Sparkles,
      title: "Daily Housekeeping",
      description: "Dedicated maintenance staff sanitizing toilets and sweeping rooms daily to ensure cleanliness."
    },
    {
      icon: Droplet,
      title: "24×7 Water Supply",
      description: "High-capacity overhead water reservoirs for constant water availability in bathrooms."
    },
    {
      icon: Zap,
      title: "24×7 Electricity",
      description: "Continuous electric supply for lamps, fans, laptops, with power backup systems for uninterrupted study."
    },
    {
      icon: Bed,
      title: "Comfortable Beds",
      description: "High-density quality mattresses, pillows, and wooden beds designed to support healthy, peaceful sleep."
    },
    {
      icon: BookOpen,
      title: "Study Environment",
      description: "Peaceful, silent culture that helps students concentrate on competitive exams, college coursework, and online projects."
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Everything You Need</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Premium Hostel Facilities & Amenities
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Aadarsh PG & Hostel is loaded with modern features designed around a student's everyday living requirements.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilityList.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
