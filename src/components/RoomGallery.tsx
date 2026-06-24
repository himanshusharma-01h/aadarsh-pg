import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';

interface RoomGalleryProps {
  items: GalleryItem[];
}

export default function RoomGallery({ items }: RoomGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'double' | 'triple' | 'bathrooms' | 'facilities'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'double', label: 'Double Sharing' },
    { value: 'triple', label: 'Triple Sharing' },
    { value: 'bathrooms', label: 'Bathrooms' },
    { value: 'facilities', label: 'Facilities' }
  ];

  // Filter items
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Visual Tour</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hostel Photo Gallery
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Take a virtual tour of our clean bedrooms, sanitized attached bathrooms, modern dining area, and study environments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value as any);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur p-3.5 rounded-full text-blue-600 dark:text-blue-400 shadow-lg scale-75 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800/40">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-0.5">
                    {item.category === 'double' ? 'Double Sharing' : item.category === 'triple' ? 'Triple Sharing' : item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">No photos found in this category.</p>
          </div>
        )}

        {/* Lightbox Module */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 md:p-8"
              onClick={closeLightbox}
            >
              {/* Header */}
              <div className="flex justify-between items-center text-white z-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {filteredItems[lightboxIndex].category.toUpperCase()}
                  </span>
                  <h4 className="text-base font-semibold">{filteredItems[lightboxIndex].title}</h4>
                </div>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Slider */}
              <div className="flex-1 flex items-center justify-between relative max-w-5xl mx-auto w-full py-4">
                {/* Prev Trigger */}
                <button
                  onClick={showPrev}
                  className="p-3.5 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer mr-2 md:mr-6"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Display Image */}
                <div 
                  className="flex-1 flex items-center justify-center max-h-[70vh] md:max-h-[80vh]"
                  onClick={(e) => e.stopPropagation()} // Stop closing on image click
                >
                  <img
                    src={filteredItems[lightboxIndex].imageUrl}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/5"
                  />
                </div>

                {/* Next Trigger */}
                <button
                  onClick={showNext}
                  className="p-3.5 rounded-full hover:bg-white/10 text-white transition-all cursor-pointer ml-2 md:ml-6"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Footer info / Navigation indicators */}
              <div className="text-center text-slate-400 text-sm font-medium pb-2 select-none">
                Image {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
