import { useState } from 'react';
import { 
  Utensils, 
  CalendarDays, 
  Leaf, 
  Clock, 
  ChefHat, 
  Soup, 
  Sparkles, 
  Salad, 
  ShieldCheck, 
  Home, 
  Crown,
  CheckCircle2, 
  Info,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from '../types';

interface FoodSectionProps {
  menus: Menu[];
}

const STATIC_FALLBACK_MENUS: Menu[] = [
  {
    id: 'summer',
    name: 'Summer Menu',
    days: {
      'Sunday': { breakfast: 'No Breakfast', lunch: 'Special Meal + Dal + Roti + Rice', dinner: 'Aloo Jeera + Dal + Roti + Rice' },
      'Monday': { breakfast: 'Idli Sambar', lunch: 'Palak Aloo + Dal + Roti + Rice', dinner: 'Sev Tamatar + Dal + Roti + Rice' },
      'Tuesday': { breakfast: 'Poha', lunch: 'Mix Veg + Dal + Roti + Rice', dinner: 'Chana Masala + Dal + Roti + Rice' },
      'Wednesday': { breakfast: 'Bread Pakoda', lunch: 'PANEER+ Dal + Roti + Rice', dinner: 'Aloo Chhole + Dal + Roti + Rice' },
      'Thursday': { breakfast: 'Pasta', lunch: 'Shimla Aloo + Dal + Roti + Rice', dinner: 'Besan Gatta + Dal + Roti + Rice' },
      'Friday': { breakfast: 'Aloo Paratha', lunch: 'Lauki Tamatar + Dal + Roti + Rice', dinner: 'Aloo Soyabean + Dal + Roti + Rice' },
      'Saturday': { breakfast: 'White Pasta', lunch: 'Bhindi Tamatar + Dal + Roti + Rice', dinner: 'Rajma + Dal + Roti + Rice' }
    }
  },
  {
    id: 'winter',
    name: 'Winter Menu',
    days: {
      'Sunday': { breakfast: 'No Breakfast', lunch: 'Special Meal + Dal + Roti + Rice', dinner: 'Rajma + Dal + Roti + Rice' },
      'Monday': { breakfast: 'Sandwich', lunch: 'Gajar Tamatar + Dal + Roti + Rice', dinner: 'Aloo Jeera + Dal + Roti + Rice' },
      'Tuesday': { breakfast: 'Poha', lunch: 'Sev Tamatar + Dal + Roti + Rice', dinner: 'Kaddu + Dal + Roti + Rice' },
      'Wednesday': { breakfast: 'Pasta', lunch: 'Mix Veg + Dal + Roti + Rice', dinner: 'Besan Gatta + Dal + Roti + Rice' },
      'Thursday': { breakfast: 'Bread Pakoda', lunch: 'Kadhi + Dal + Roti + Rice', dinner: 'Aloo Methi + Dal + Roti + Rice' },
      'Friday': { breakfast: 'Aloo Paratha', lunch: 'Aloo Chhola + Dal + Roti + Rice', dinner: 'Tinda Tamatar + Dal + Roti + Rice' },
      'Saturday': { breakfast: 'Pasta', lunch: 'Gobhi Aloo + Dal + Roti + Rice', dinner: 'Kadhi + Dal + Roti + Rice' }
    }
  }
];

const HIGHLIGHT_CARDS = [
  {
    title: 'Fresh Vegetarian Meals',
    desc: '100% pure vegetarian homestyle recipes prepared daily with fresh ingredients.',
    icon: Leaf,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    title: 'Daily Breakfast, Lunch & Dinner',
    desc: 'Punctual and consistent meal schedules to support students\' daily routines.',
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
  },
  {
    title: 'Unlimited Roti',
    desc: 'Fresh, warm, hand-rolled Tawa Rotis served without limit during dining hours.',
    icon: ChefHat,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
  },
  {
    title: 'Fresh Dal Daily',
    desc: 'Nutritious dal preparation every single day, cooked to perfection.',
    icon: Soup,
    color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30'
  },
  {
    title: 'Rice Served Daily',
    desc: 'Premium quality steamed rice served alongside every lunch and dinner.',
    icon: Sparkles,
    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30'
  },
  {
    title: 'Seasonal Vegetables',
    desc: 'Rich variety of seasonal produce handpicked daily from local markets.',
    icon: Salad,
    color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30'
  },
  {
    title: 'Hygienic Kitchen',
    desc: 'Spotless daily sanitation protocols, pest-controlled dining halls, and RO-purified water.',
    icon: ShieldCheck,
    color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30'
  },
  {
    title: 'Home Style Cooking',
    desc: 'Mild spices and balanced oils, mimicking a mother\'s kitchen to ensure everyday digestion.',
    icon: Home,
    color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30'
  },
  {
    title: 'Weekly Special Sunday Meal',
    desc: 'An extra special feast served on Sundays for a delightful end-of-week treat.',
    icon: Crown,
    color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30'
  }
];

export default function FoodSection({ menus }: FoodSectionProps) {
  const [activeTab, setActiveTab] = useState<'summer' | 'winter'>('summer');

  // Use Firestore menu if available, otherwise fallback to the highly accurate static defaults
  const displayMenus = menus && menus.length > 0 ? menus : STATIC_FALLBACK_MENUS;
  const selectedMenu = displayMenus.find(m => m.id === activeTab) || displayMenus[0];

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return (
    <section id="menu" className="py-24 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-100/50 dark:border-orange-900/30">
            <Utensils className="w-3.5 h-3.5" />
            <span>Mess & Dining Facility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            🍽️ Healthy & Hygienic Food
          </h2>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Fresh Home-Style Vegetarian Meals Prepared Daily for Students.
          </p>
          <div className="mt-5 h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Core Food Details & Premium Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Core Food Details */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-100/40 dark:shadow-none flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Utensils className="w-5 h-5" />
                </span>
                Daily Meal Includes:
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { name: 'Fresh Roti', desc: 'Hand-rolled, light' },
                  { name: 'Dal', desc: 'Protein rich, nutritious' },
                  { name: 'Rice (Chawal)', desc: 'Premium quality grain' },
                  { name: 'Seasonal Veg', desc: 'Local fresh produce' },
                  { name: 'Breakfast', desc: '8:00 AM - 9:30 AM' },
                  { name: 'Lunch & Dinner', desc: '1:00 PM / 8:00 PM' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 p-4.5 rounded-2xl flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                <span className="font-bold">Important Notice:</span> Every single Lunch and Dinner is systematically served with <span className="underline">Dal + Roti + Rice</span> along with the main seasonal vegetable listed in the menu below.
              </p>
            </div>
          </div>

          {/* Premium Badges Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Our Promise</div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-6">Pure & Nutritious Dining</h3>
              
              <div className="space-y-4">
                {[
                  'Food Included in Hostel Fees',
                  'Daily Roti, Dal & Rice Included',
                  'Hygienic Kitchen',
                  'Home Style Vegetarian Food'
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-slate-100">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-4 flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Sourced from grade-A local suppliers and prepared with pure RO drinking water.</span>
            </div>
          </div>
        </div>

        {/* Menu Schedule Title & Tab Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xl overflow-hidden mb-16">
          <div className="p-6 sm:p-8 bg-slate-900 text-white dark:bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                <span>Weekly Mess Schedule</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Alternate seasonal schedules optimized for digestive comfort
              </p>
            </div>

            {/* Summer/Winter Tab Toggle Buttons */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 w-full sm:w-auto max-w-sm">
              <button
                onClick={() => setActiveTab('summer')}
                className={`flex-1 sm:flex-none py-2 px-6 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'summer'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Summer Menu</span>
              </button>
              <button
                onClick={() => setActiveTab('winter')}
                className={`flex-1 sm:flex-none py-2 px-6 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'winter'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Winter Menu</span>
              </button>
            </div>
          </div>

          {/* Schedule Table (Desktop) & Cards (Mobile) */}
          <div className="p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {selectedMenu ? (
                  <>
                    {/* Desktop View */}
                    <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                            <th className="py-4.5 px-6 font-bold text-sm uppercase tracking-wider w-40">Day</th>
                            <th className="py-4.5 px-6 font-bold text-sm uppercase tracking-wider">
                              <span className="flex items-center gap-2">
                                <Coffee className="w-4 h-4 text-orange-500" />
                                <span>Breakfast</span>
                                <span className="text-[10px] text-slate-400 normal-case font-normal">(8:00 AM - 9:30 AM)</span>
                              </span>
                            </th>
                            <th className="py-4.5 px-6 font-bold text-sm uppercase tracking-wider">
                              <span className="flex items-center gap-2">
                                <Sun className="w-4 h-4 text-amber-500" />
                                <span>Lunch</span>
                                <span className="text-[10px] text-slate-400 normal-case font-normal">(1:00 PM - 2:30 PM)</span>
                              </span>
                            </th>
                            <th className="py-4.5 px-6 font-bold text-sm uppercase tracking-wider">
                              <span className="flex items-center gap-2">
                                <Moon className="w-4 h-4 text-indigo-500" />
                                <span>Dinner</span>
                                <span className="text-[10px] text-slate-400 normal-case font-normal">(8:00 PM - 9:30 PM)</span>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {daysOfWeek.map((day, idx) => {
                            const meals = selectedMenu.days[day] || { breakfast: '-', lunch: '-', dinner: '-' };
                            const isSunday = day === 'Sunday';
                            return (
                              <tr 
                                key={day} 
                                className={`transition-colors duration-150 ${
                                  isSunday 
                                    ? 'bg-blue-50/30 dark:bg-blue-950/10 font-medium' 
                                    : idx % 2 === 0 
                                      ? 'bg-transparent' 
                                      : 'bg-slate-50/30 dark:bg-slate-900/10'
                                }`}
                              >
                                <td className="py-5 px-6 font-bold text-slate-900 dark:text-white">
                                  <span className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${isSunday ? 'bg-orange-500 animate-pulse' : 'bg-blue-500'}`} />
                                    {day}
                                  </span>
                                </td>
                                <td className={`py-5 px-6 text-sm ${meals.breakfast === 'No Breakfast' ? 'text-slate-400 italic font-medium' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                                  {meals.breakfast}
                                </td>
                                <td className="py-5 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                  {meals.lunch}
                                </td>
                                <td className="py-5 px-6 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                  {meals.dinner}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
                      {daysOfWeek.map((day) => {
                        const meals = selectedMenu.days[day] || { breakfast: '-', lunch: '-', dinner: '-' };
                        const isSunday = day === 'Sunday';
                        return (
                          <div
                            key={day}
                            className={`p-6 rounded-2xl border transition-all ${
                              isSunday
                                ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/10 dark:border-amber-900/30'
                                : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800/80'
                            }`}
                          >
                            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                              <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <CalendarDays className="w-4.5 h-4.5 text-blue-500" />
                                {day}
                              </span>
                              {isSunday ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2.5 py-1 rounded-full">
                                  Weekend Special
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full">
                                  Weekday
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex gap-3">
                                <span className="p-1.5 h-8 w-8 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center shrink-0">
                                  <Coffee className="w-4 h-4" />
                                </span>
                                <div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Breakfast (8:00 AM - 9:30 AM)
                                  </div>
                                  <div className={`text-sm font-semibold mt-0.5 ${meals.breakfast === 'No Breakfast' ? 'text-slate-400 italic' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {meals.breakfast}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <span className="p-1.5 h-8 w-8 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center shrink-0">
                                  <Sun className="w-4 h-4" />
                                </span>
                                <div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Lunch (1:00 PM - 2:30 PM)
                                  </div>
                                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                    {meals.lunch}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <span className="p-1.5 h-8 w-8 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                                  <Moon className="w-4 h-4" />
                                </span>
                                <div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Dinner (8:00 PM - 9:30 PM)
                                  </div>
                                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                                    {meals.dinner}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500">No menu data found</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 9 Food Highlight Bento Cards */}
        <div className="mb-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Mess Facility Highlights
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Top quality attributes ensuring healthy and delightful dining for every student
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHT_CARDS.map((card, i) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className={`p-3 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center ${card.color}`}>
                    <IconComp className="w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {card.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
