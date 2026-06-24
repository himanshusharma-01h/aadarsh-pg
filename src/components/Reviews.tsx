import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Testimonial } from '../types';

interface ReviewsProps {
  testimonials: Testimonial[];
}

export default function Reviews({ testimonials }: ReviewsProps) {
  return (
    <section id="reviews" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Student Testimonials</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Residents Say
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Read real, unaltered reviews from current and past residents studying at Vivekananda Global University (VGU) Jaipur.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-blue-100 dark:text-slate-800/60 pointer-events-none">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>

              {/* Review Content */}
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < t.rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-slate-200 dark:text-slate-800'
                      }`} 
                    />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-50 dark:border-slate-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {t.role}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  {t.date}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
