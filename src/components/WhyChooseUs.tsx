import { MapPin, IndianRupee, Utensils, Bath, Wifi, Shield, Droplets, Sparkles, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: MapPin,
      title: "Near VGU Jaipur",
      description: "Located within 2 minutes walking distance from the main gate of Vivekananda Global University, saving you commute time and transport costs."
    },
    {
      icon: IndianRupee,
      title: "Affordable Pricing",
      description: "Our plans are structured as all-inclusive yearly rentals with no hidden charges, making standard premium student living economical."
    },
    {
      icon: Utensils,
      title: "Healthy & Hygienic Food",
      description: "Freshly prepared vegetarian meals served daily. Our mess maintains high-quality ingredients, clean storage, and standard nutrition guidelines."
    },
    {
      icon: Bath,
      title: "Attached Bathrooms",
      description: "Each and every double and triple sharing room is equipped with its own clean modern western bathroom, geyser, and premium fittings."
    },
    {
      icon: Wifi,
      title: "High-Speed Wi-Fi",
      description: "Uninterrupted high-speed Internet access across all floors to enable standard study, online assignments, and streaming."
    },
    {
      icon: Shield,
      title: "CCTV Security",
      description: "24/7 CCTV surveillance cameras installed in corridors, dining spaces, and outer gates to ensure standard safety of students."
    },
    {
      icon: Droplets,
      title: "24×7 Water Supply",
      description: "Continuous running water for bathrooms, combined with specialized clean RO drinking water plants for direct hydration."
    },
    {
      icon: Sparkles,
      title: "Daily Housekeeping",
      description: "Dedicated housekeeping staff cleans rooms, passages, and bathrooms daily to maintain a high standard of hygiene."
    },
    {
      icon: GraduationCap,
      title: "Student-Friendly Environment",
      description: "A peaceful, quiet, disciplined and supportive atmosphere designed for students to study, collaborate, and grow."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Your Best Accommodation Choice</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Choose Aadarsh PG & Hostel?
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            We provide a home-away-from-home experience focusing on cleanliness, standard safety, great food, and study productivity.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="bg-slate-50 dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/20 hover:scale-[1.02] transition-all duration-300 flex flex-col items-start text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
