import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is high-speed Wi-Fi available at Aadarsh PG?",
      answer: "Yes! High-speed broadband Wi-Fi routers are installed on every floor of the hostel, providing reliable and standard coverage for all students to access course materials, stream lectures, and work online."
    },
    {
      question: "Is food included in the yearly rent?",
      answer: "Absolutely! The yearly package (₹1,00,000 for Double Sharing and ₹90,000 for Triple Sharing) includes 3 freshly-prepared vegetarian meals daily (Breakfast, Lunch, and Dinner). The menu is balanced, hygienic, and changes seasonally for summer and winter."
    },
    {
      question: "Are attached bathrooms available in the rooms?",
      answer: "Yes, every single room (both double and triple sharing) comes with a clean, fully attached modern western bathroom, geysers for hot water, proper mirrors, and quality sanitation fittings."
    },
    {
      question: "How close is Aadarsh PG & Hostel to VGU?",
      answer: "We are extremely close! The hostel is located just a 2-minute walk from the main gate of Vivekananda Global University (VGU) in Jaipur. There is no need for costly auto-rickshaws or bikes; you can easily walk to college."
    },
    {
      question: "Are both double and triple sharing rooms available?",
      answer: "Yes, we offer both Premium Double Sharing Rooms and Comfort Triple Sharing Rooms. You can choose the configuration that fits your budget and social preferences."
    },
    {
      question: "Are there any hidden costs (water, electricity, maintenance)?",
      answer: "No, there are no hidden costs. Our pricing is completely transparent and all-inclusive of water, standard electricity, housekeeping, internet, and food. You only pay the declared annual fee."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Got Questions?</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/40"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors gap-4"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/40 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white/50 dark:bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
