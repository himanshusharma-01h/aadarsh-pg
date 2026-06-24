import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface ContactSectionProps {
  selectedRoomType: string;
}

export default function ContactSection({ selectedRoomType }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    roomType: '',
    moveInDate: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Sync selected room type from parent
  useEffect(() => {
    if (selectedRoomType) {
      setFormData(prev => ({ ...prev, roomType: selectedRoomType }));
    }
  }, [selectedRoomType]);

  const contactPersons = [
    { name: "Manoj Dewanda", phone: "7023107808", role: "Owner / Administrator" },
  
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.roomType || !formData.moveInDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Write to Firestore inquiries collection
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        city: '',
        roomType: '',
        moveInDate: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('Something went wrong. Please try calling or messaging us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Ready to Book?</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Us & Booking Inquiry
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Submit the inquiry form below or connect with us directly over call or WhatsApp. We respond within a few minutes!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Contact details and quick buttons */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contacts */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Hostel Administration
              </h3>

              <div className="space-y-6">
                {contactPersons.map((person) => {
                  const phoneCall = `tel:+91${person.phone}`;
                  const waLink = `https://wa.me/91${person.phone}?text=Hello%20${person.name},%20I%20am%20interested%20in%20Aadarsh%20PG%20accommodation.`;
                  return (
                    <div 
                      key={person.phone}
                      className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{person.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{person.role}</div>
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          +91 {person.phone}
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <a
                          href={phoneCall}
                          className="p-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
                          title={`Call ${person.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
                          title={`Chat with ${person.name}`}
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Details List */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hostel Address</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Aadarsh PG & Hostel, Near Vivekananda Global University (VGU) Main Gate, Sector 36, Jagatpura Extension, Jaipur, Rajasthan, 303012.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Email Address</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    aadarshhostelvgu@gmail.com
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/80">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Submit an Inquiry
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Fill out the secure form to request a room booking or scheduling a campus visit.
              </p>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    className="text-center py-12 px-4"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                  >
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Inquiry Submitted!</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                      Thank you for choosing Aadarsh PG & Hostel. Our management team will call you shortly on your provided phone number to confirm details.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {error && (
                      <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* City */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          Home Town / City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Jaipur, Jodhpur"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition"
                        />
                      </div>

                      {/* Room Type select */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          Room Sharing Type *
                        </label>
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition cursor-pointer"
                        >
                          <option value="">Select Option</option>
                          <option value="Double Sharing Room">Double Sharing Room (₹1,00,000/yr)</option>
                          <option value="Triple Sharing Room">Triple Sharing Room (₹90,000/yr)</option>
                        </select>
                      </div>
                    </div>

                    {/* Move In Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        Expected Move-In Date *
                      </label>
                      <input
                        type="date"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition cursor-pointer"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Any Questions or Specific Requirements?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Type any questions or special instructions (optional)..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting Booking Inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Booking Request
                        </>
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
