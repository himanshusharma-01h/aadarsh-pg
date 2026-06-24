import { Phone, MessageCircle, CalendarDays, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Room } from '../types';

interface RoomPricingProps {
  rooms: Room[];
  onSelectRoom: (roomType: string) => void;
}

export default function RoomPricing({ rooms, onSelectRoom }: RoomPricingProps) {
  const primaryPhone = "tel:+917023107808";

  const handleBookNow = (type: 'double' | 'triple') => {
    const label = type === 'double' ? 'Double Sharing Room' : 'Triple Sharing Room';
    onSelectRoom(label);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getWhatsAppLink = (roomName: string) => {
    return `https://wa.me/917023107808?text=Hello!%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(roomName)}%20at%20Aadarsh%20PG%20%26%20Hostel.`;
  };

  // Sort triple to be second, double first, or find most popular
  const sortedRooms = [...rooms].sort((a, b) => b.price - a.price); // Double (100k) first, Triple (90k) second

  return (
    <section id="rooms" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Affordable Accommodation plans</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Room Pricing & Sharing Plans
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Choose between double sharing or triple sharing rooms. All pricing is inclusive of meals, high-speed internet, housekeeping, and facilities.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sortedRooms.map((room) => {
            const isTriple = room.type === 'triple';
            return (
              <motion.div
                key={room.id}
                className={`relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border ${
                  isTriple 
                    ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/10' 
                    : 'border-slate-100 dark:border-slate-800 shadow-md'
                } flex flex-col justify-between`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Popularity Badge */}
                {isTriple && (
                  <span className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md z-10">
                    Most Popular
                  </span>
                )}

                {/* Card Header & Image */}
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-6 text-white">
                      <span className="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mr-2">
                        {room.type === 'double' ? 'Double Sharing' : 'Triple Sharing'}
                      </span>
                      <h3 className="text-xl font-bold mt-1.5">{room.name}</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Price section */}
                    <div className="flex items-baseline mb-6 border-b border-slate-100 dark:border-slate-800 pb-5">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ₹{room.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2 text-sm font-semibold">
                        / Year (All Inclusive)
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-3">
                      {room.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-8 pt-0 border-t border-slate-50 dark:border-slate-800/50 mt-6 bg-slate-50/50 dark:bg-slate-900/30">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6">
                    <button
                      onClick={() => handleBookNow(room.type)}
                      className="sm:col-span-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all"
                    >
                      <CalendarDays className="w-4 h-4" />
                      Book Now
                    </button>

                    <a
                      href={primaryPhone}
                      className="px-4 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Now
                    </a>

                    <a
                      href={getWhatsAppLink(room.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      WhatsApp
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
