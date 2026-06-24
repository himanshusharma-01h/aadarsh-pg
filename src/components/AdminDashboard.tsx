import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, Calendar, Image as ImageIcon, MessageSquare, Plus, Trash2, 
  Check, X, Edit2, Loader2, Save, LogOut, CheckSquare, Eye, RefreshCw, Upload
} from 'lucide-react';
import { 
  collection, getDocs, doc, updateDoc, deleteDoc, addDoc, setDoc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Room, GalleryItem, Testimonial, Inquiry, Menu, DayMenu } from '../types';

interface AdminDashboardProps {
  rooms: Room[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  menus: Menu[];
  onRefreshData: () => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  rooms,
  galleryItems,
  testimonials,
  inquiries,
  menus,
  onRefreshData,
  onLogout
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'rooms' | 'menus' | 'gallery' | 'testimonials'>('inquiries');
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // --- Rooms Tab State ---
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomForm, setRoomForm] = useState<{
    price: number;
    available: boolean;
    description: string;
    features: string;
  }>({ price: 0, available: true, description: '', features: '' });

  // --- Menus Tab State ---
  const [selectedMenuSeason, setSelectedMenuSeason] = useState<'summer' | 'winter'>('summer');
  const [editingMenuDay, setEditingMenuDay] = useState<string | null>(null);
  const [menuForm, setMenuForm] = useState<DayMenu>({ breakfast: '', lunch: '', dinner: '' });

  // --- Gallery Tab State ---
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'double' as 'double' | 'triple' | 'bathrooms' | 'facilities',
    imageUrl: '',
    description: ''
  });
  const [imageFileLoading, setImageFileLoading] = useState(false);

  // --- Testimonial Tab State ---
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    review: '',
    rating: 5,
    date: ''
  });

  // Load room data for editing
  const startEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomForm({
      price: room.price,
      available: room.available,
      description: room.description,
      features: room.features.join(', ')
    });
  };

  // Save edited room
  const handleSaveRoom = async (roomId: string) => {
    setLoadingAction(`save-room-${roomId}`);
    try {
      const roomRef = doc(db, 'rooms', roomId);
      const parsedFeatures = roomForm.features.split(',').map(f => f.trim()).filter(Boolean);
      await updateDoc(roomRef, {
        price: Number(roomForm.price),
        available: roomForm.available,
        description: roomForm.description,
        features: parsedFeatures
      });
      setEditingRoomId(null);
      onRefreshData();
    } catch (err) {
      console.error('Error saving room:', err);
      alert('Error updating room data.');
    } finally {
      setLoadingAction(null);
    }
  };

  // --- Inquiries State Updates ---
  const handleUpdateInquiryStatus = async (id: string, newStatus: 'Pending' | 'Contacted' | 'Closed') => {
    setLoadingAction(`inquiry-status-${id}`);
    try {
      const docRef = doc(db, 'inquiries', id);
      await updateDoc(docRef, { status: newStatus });
      onRefreshData();
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setLoadingAction(`inquiry-delete-${id}`);
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      onRefreshData();
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  // --- Menu Editing ---
  const startEditMenu = (day: string, dayMenu: DayMenu) => {
    setEditingMenuDay(day);
    setMenuForm({ ...dayMenu });
  };

  const handleSaveMenu = async () => {
    if (!editingMenuDay) return;
    setLoadingAction(`save-menu-${editingMenuDay}`);
    try {
      const menuId = selectedMenuSeason;
      const menuDoc = menus.find(m => m.id === menuId);
      if (menuDoc) {
        const updatedDays = {
          ...menuDoc.days,
          [editingMenuDay]: menuForm
        };
        await setDoc(doc(db, 'menus', menuId), {
          ...menuDoc,
          days: updatedDays
        });
        setEditingMenuDay(null);
        onRefreshData();
      }
    } catch (err) {
      console.error('Error saving menu:', err);
      alert('Failed to update food menu.');
    } finally {
      setLoadingAction(null);
    }
  };

  // --- Gallery Image Upload & Manage ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewGallery(prev => ({ ...prev, imageUrl: reader.result as string }));
      setImageFileLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.imageUrl) {
      alert('Please provide a title and image.');
      return;
    }
    setLoadingAction('add-gallery');
    try {
      await addDoc(collection(db, 'gallery'), {
        title: newGallery.title,
        category: newGallery.category,
        imageUrl: newGallery.imageUrl,
        description: newGallery.description
      });
      setNewGallery({ title: '', category: 'double', imageUrl: '', description: '' });
      onRefreshData();
    } catch (err) {
      console.error('Error adding gallery item:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    setLoadingAction(`delete-gallery-${id}`);
    try {
      await deleteDoc(doc(db, 'gallery', id));
      onRefreshData();
    } catch (err) {
      console.error('Error deleting photo:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  // --- Testimonial Manage ---
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.review || !newTestimonial.role) {
      alert('Please fill out all required fields.');
      return;
    }
    setLoadingAction('add-testimonial');
    try {
      const today = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dateStr = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;

      await addDoc(collection(db, 'testimonials'), {
        name: newTestimonial.name,
        role: newTestimonial.role,
        review: newTestimonial.review,
        rating: Number(newTestimonial.rating),
        date: newTestimonial.date || dateStr
      });

      setNewTestimonial({ name: '', role: '', review: '', rating: 5, date: '' });
      onRefreshData();
    } catch (err) {
      console.error('Error adding testimonial:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setLoadingAction(`delete-testimonial-${id}`);
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      onRefreshData();
    } catch (err) {
      console.error('Error deleting review:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  // Quick statistics
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
  const contactedInquiries = inquiries.filter(i => i.status === 'Contacted').length;

  return (
    <div id="admin-dashboard-container" className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              Secure Admin Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Aadarsh PG Control Room
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live updates reflect instantly across the public landing page.
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onRefreshData}
              className="px-4 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Sync Data
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 text-xs font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Dynamic Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Requests</div>
            <div className="text-3xl font-black text-amber-500">{pendingInquiries}</div>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Awaiting initial phone callback</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total inquiries</div>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{inquiries.length}</div>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Total submissions in system</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Room listings</div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{rooms.length}</div>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Sharing categories published</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Gallery Images</div>
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100">{galleryItems.length}</div>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Total active photo assets</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { value: 'inquiries', label: 'Booking Inquiries', icon: Users, badge: pendingInquiries },
            { value: 'rooms', label: 'Rooms & Pricing', icon: DollarSign },
            { value: 'menus', label: 'Mess Weekly Menus', icon: Calendar },
            { value: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
            { value: 'testimonials', label: 'Student Reviews', icon: MessageSquare }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`py-4 px-6 border-b-2 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-[10px] bg-red-500 text-white font-extrabold rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* --- Content Tabs --- */}
        <div className="min-h-[400px]">
          
          {/* 1. INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Student inquiries received</h2>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total: {inquiries.length}</span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-24 text-slate-400 dark:text-slate-500 font-semibold">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-slate-500 font-bold">
                        <th className="py-4 px-6 font-bold uppercase tracking-wider">Student Details</th>
                        <th className="py-4 px-6 font-bold uppercase tracking-wider">Preferences</th>
                        <th className="py-4 px-6 font-bold uppercase tracking-wider">Message</th>
                        <th className="py-4 px-6 font-bold uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {[...inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((inq) => {
                        return (
                          <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                            <td className="py-5 px-6">
                              <div className="font-bold text-slate-900 dark:text-white">{inq.name}</div>
                              <div className="text-slate-500 dark:text-slate-400 font-medium mt-1">Phone: +91 {inq.phone}</div>
                              <div className="text-slate-400 text-[10px] font-medium mt-0.5">City: {inq.city || 'Not provided'}</div>
                            </td>
                            <td className="py-5 px-6">
                              <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold px-2.5 py-1 rounded-md text-[11px] inline-block mb-1">
                                {inq.roomType}
                              </span>
                              <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
                                Move-in: {inq.moveInDate}
                              </div>
                              <div className="text-slate-400 text-[10px] font-medium mt-0.5">
                                Submitted: {new Date(inq.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="py-5 px-6 max-w-xs">
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed truncate hover:text-clip hover:whitespace-normal transition-all" title={inq.message}>
                                {inq.message || <span className="text-slate-300">No message</span>}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold leading-none ${
                                inq.status === 'Pending' 
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' 
                                  : inq.status === 'Contacted'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                                    : 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  inq.status === 'Pending' 
                                    ? 'bg-amber-500 animate-pulse' 
                                    : inq.status === 'Contacted' 
                                      ? 'bg-blue-500' 
                                      : 'bg-green-500'
                                }`} />
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-5 px-6 text-right space-y-1.5">
                              <div className="flex justify-end gap-1.5">
                                {inq.status !== 'Contacted' && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(inq.id, 'Contacted')}
                                    className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md transition"
                                  >
                                    Mark Contacted
                                  </button>
                                )}
                                {inq.status !== 'Closed' && (
                                  <button
                                    onClick={() => handleUpdateInquiryStatus(inq.id, 'Closed')}
                                    className="px-2.5 py-1 text-[10px] font-bold bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-md transition"
                                  >
                                    Mark Closed
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 2. ROOMS TAB */}
          {activeTab === 'rooms' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {rooms.map((room) => {
                const isEditing = editingRoomId === room.id;
                return (
                  <div key={room.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                          ID: {room.id}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{room.name}</h3>
                      </div>
                      {!isEditing ? (
                        <button
                          onClick={() => startEditRoom(room)}
                          className="px-4 py-2 text-xs font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition flex items-center gap-1.5"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit Details & Pricing
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveRoom(room.id)}
                            disabled={loadingAction === `save-room-${room.id}`}
                            className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center gap-1.5 disabled:opacity-75"
                          >
                            {loadingAction === `save-room-${room.id}` ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                            Save Updates
                          </button>
                          <button
                            onClick={() => setEditingRoomId(null)}
                            className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl transition"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Price */}
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Yearly Rental Pricing (₹)
                            </label>
                            <input
                              type="number"
                              value={roomForm.price}
                              onChange={(e) => setRoomForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm outline-none"
                            />
                          </div>

                          {/* Availability */}
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Availability Status
                            </label>
                            <select
                              value={roomForm.available ? 'true' : 'false'}
                              onChange={(e) => setRoomForm(prev => ({ ...prev, available: e.target.value === 'true' }))}
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm outline-none cursor-pointer"
                            >
                              <option value="true">Available / Accepting Bookings</option>
                              <option value="false">Fully Booked / Sold Out</option>
                            </select>
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Description
                          </label>
                          <textarea
                            value={roomForm.description}
                            onChange={(e) => setRoomForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm outline-none resize-none"
                          />
                        </div>

                        {/* Features */}
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Features (comma-separated list)
                          </label>
                          <input
                            type="text"
                            value={roomForm.features}
                            onChange={(e) => setRoomForm(prev => ({ ...prev, features: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm outline-none"
                            placeholder="Attached Bathroom, Wi-Fi Included, RO Water"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-3">
                          <img 
                            src={room.image} 
                            alt={room.name} 
                            className="w-full h-36 object-cover rounded-2xl border border-slate-100 dark:border-slate-800"
                          />
                        </div>
                        <div className="md:col-span-9 space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                              ₹{room.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">/ Year All Inclusive</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-400 font-bold">Status:</span>
                            <span className={`text-xs font-bold ${room.available ? 'text-green-500' : 'text-red-500'}`}>
                              {room.available ? '● Accepting Bookings' : '● Fully Occupied'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {room.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {room.features.map((feat, i) => (
                              <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. MESS MENUS TAB */}
          {activeTab === 'menus' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Manage Seasonal Food Menus</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Select a season to customize the daily breakfast, lunch, and dinner list.</p>
                </div>
                
                {/* Season selector */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setSelectedMenuSeason('summer');
                      setEditingMenuDay(null);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedMenuSeason === 'summer'
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Summer Menu
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMenuSeason('winter');
                      setEditingMenuDay(null);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedMenuSeason === 'winter'
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Winter Menu
                  </button>
                </div>
              </div>

              {/* Day Listings */}
              {menus.find(m => m.id === selectedMenuSeason) ? (
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    const activeMenu = menus.find(m => m.id === selectedMenuSeason)!;
                    const meals = activeMenu.days[day] || { breakfast: '', lunch: '', dinner: '' };
                    const isEditing = editingMenuDay === day;

                    return (
                      <div key={day} className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{day}</span>
                          {!isEditing ? (
                            <button
                              onClick={() => startEditMenu(day, meals)}
                              className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md transition"
                            >
                              Edit Meal Plan
                            </button>
                          ) : (
                            <div className="flex gap-1.5">
                              <button
                                onClick={handleSaveMenu}
                                disabled={loadingAction === `save-menu-${day}`}
                                className="px-2.5 py-1 text-[10px] font-bold bg-blue-600 text-white rounded-md transition flex items-center gap-1 disabled:opacity-75"
                              >
                                {loadingAction === `save-menu-${day}` ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Check className="w-3.5 h-3.5" />
                                )}
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMenuDay(null)}
                                className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 rounded-md transition"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Breakfast</label>
                              <input
                                type="text"
                                value={menuForm.breakfast}
                                onChange={(e) => setMenuForm(prev => ({ ...prev, breakfast: e.target.value }))}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lunch</label>
                              <input
                                type="text"
                                value={menuForm.lunch}
                                onChange={(e) => setMenuForm(prev => ({ ...prev, lunch: e.target.value }))}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dinner</label>
                              <input
                                type="text"
                                value={menuForm.dinner}
                                onChange={(e) => setMenuForm(prev => ({ ...prev, dinner: e.target.value }))}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-xs outline-none"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Breakfast</span>
                              <span className="text-slate-700 dark:text-slate-300">{meals.breakfast}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Lunch</span>
                              <span className="text-slate-700 dark:text-slate-300">{meals.lunch}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Dinner</span>
                              <span className="text-slate-700 dark:text-slate-300">{meals.dinner}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 font-semibold">
                  Loading menu listings...
                </div>
              )}
            </div>
          )}

          {/* 4. GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
              
              {/* Add New photo */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-blue-500" />
                    Publish New Photo
                  </h3>

                  <form onSubmit={handleAddGalleryItem} className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Photo Title *</label>
                      <input
                        type="text"
                        required
                        value={newGallery.title}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Spacious Triple Bedroom"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category *</label>
                      <select
                        value={newGallery.category}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
                      >
                        <option value="double">Double Sharing Rooms</option>
                        <option value="triple">Triple Sharing Rooms</option>
                        <option value="bathrooms">Bathrooms</option>
                        <option value="facilities">Facilities</option>
                      </select>
                    </div>

                    {/* Image Upload Input */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Upload className="w-3 h-3 text-blue-500" />
                        Upload Local File
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 dark:file:bg-blue-950 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer"
                      />
                      {imageFileLoading && (
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">Converting image file...</span>
                      )}
                    </div>

                    {/* Image URL input (Alternative) */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Or Paste Image URL *</label>
                      <input
                        type="url"
                        value={newGallery.imageUrl}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Caption / Description</label>
                      <textarea
                        value={newGallery.description}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                        placeholder="Optional short description..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none resize-none"
                      />
                    </div>

                    {/* Preview box */}
                    {newGallery.imageUrl && (
                      <div className="pt-2">
                        <span className="text-[9px] font-bold text-slate-400 block mb-1">IMAGE PREVIEW:</span>
                        <img 
                          src={newGallery.imageUrl} 
                          alt="preview" 
                          className="w-full h-24 object-cover rounded-lg border border-slate-100 dark:border-slate-800"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loadingAction === 'add-gallery' || !newGallery.imageUrl || !newGallery.title}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loadingAction === 'add-gallery' ? 'Publishing...' : 'Add to Gallery'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Photo Listings Grid */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Published Photos ({galleryItems.length})</h3>

                {galleryItems.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 font-semibold">No photos in gallery yet.</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 h-40">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                          <span className="text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide w-max mb-1">
                            {item.category}
                          </span>
                          <h4 className="text-[10px] font-bold text-white line-clamp-1">{item.title}</h4>
                          
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            disabled={loadingAction === `delete-gallery-${item.id}`}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 5. STUDENT REVIEWS TAB */}
          {activeTab === 'testimonials' && (
            <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
              
              {/* Add review */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm sticky top-24">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-blue-500" />
                    Write New Review
                  </h3>

                  <form onSubmit={handleAddTestimonial} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Suresh Kumar"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                      />
                    </div>

                    {/* Role / Course */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Student Course/Role *</label>
                      <input
                        type="text"
                        required
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                        placeholder="e.g. VGU B.Tech Student"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Rating select */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Rating *</label>
                        <select
                          value={newTestimonial.rating}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: Number(e.target.value) }))}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none cursor-pointer"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Review Date</label>
                        <input
                          type="text"
                          value={newTestimonial.date}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, date: e.target.value }))}
                          placeholder="e.g. May 2026"
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Message / Review */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Student Review Text *</label>
                      <textarea
                        required
                        value={newTestimonial.review}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, review: e.target.value }))}
                        rows={3}
                        placeholder="Type the student's review..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loadingAction === 'add-testimonial'}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition disabled:opacity-75 cursor-pointer"
                    >
                      {loadingAction === 'add-testimonial' ? 'Publishing...' : 'Publish Testimonial'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Review list */}
              <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">Published Reviews ({testimonials.length})</h3>

                {testimonials.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 font-semibold">No reviews published yet.</div>
                ) : (
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">{t.name}</span>
                            <span className="text-[10px] text-slate-400">{t.role} ({t.date})</span>
                          </div>
                          <div className="flex gap-0.5 text-amber-500 text-[10px] font-bold">
                            {'★'.repeat(t.rating)}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                            "{t.review}"
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          disabled={loadingAction === `delete-testimonial-${t.id}`}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded transition shrink-0 cursor-pointer"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
