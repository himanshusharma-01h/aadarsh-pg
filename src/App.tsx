import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, signOut, User, createUserWithEmailAndPassword 
} from 'firebase/auth';
import { collection, onSnapshot, getDocs, doc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { seedDatabaseIfNeeded } from './dbSeed';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import RoomPricing from './components/RoomPricing';
import RoomGallery from './components/RoomGallery';
import Facilities from './components/Facilities';
import FoodSection from './components/FoodSection';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Types
import { Room, GalleryItem, Testimonial, Inquiry, Menu } from './types';
import { Loader2 } from 'lucide-react';

export default function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // State values
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  // Firestore Data State
  const [rooms, setRooms] = useState<Room[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Apply dark mode theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Seeding, Default Admin Creation, & Data Fetching
  useEffect(() => {
    const initializeApp = async () => {
      // 1. Seed database with rooms, gallery, testimonials, mess menus if empty
      await seedDatabaseIfNeeded();

      // 2. Proactively create the default admin account (admin@aadarsh.com / password123)
      // to guarantee testing works out of the box in the environment.
      try {
        await createUserWithEmailAndPassword(auth, 'admin@aadarsh.com', 'password123');
        console.log("Default admin account successfully initialized.");
      } catch (err: any) {
        // Expected if already exists or if provider is disabled in Firebase Console
        if (err.code === 'auth/operation-not-allowed') {
          console.warn("Default admin setup notice: Email & Password sign-in is not enabled under Authentication in your Firebase Console yet. Please sign in with Google using your developer account, or enable the Email/Password sign-in provider.");
        } else if (err.code !== 'auth/email-already-in-use') {
          console.error("Default admin setup message:", err.message);
        }
      }
    };

    initializeApp();

    // 3. Listen to auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      if (!user) {
        setShowAdminDashboard(false);
      }
    });

    // 4. Real-time Firestore Sync
    const unsubRooms = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const roomsList: Room[] = [];
      snapshot.forEach((doc) => {
        roomsList.push({ id: doc.id, ...doc.data() } as Room);
      });
      setRooms(roomsList);
    }, (error) => console.error("Rooms sync error:", error));

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const galleryList: GalleryItem[] = [];
      snapshot.forEach((doc) => {
        galleryList.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      setGalleryItems(galleryList);
    }, (error) => console.error("Gallery sync error:", error));

    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const testList: Testimonial[] = [];
      snapshot.forEach((doc) => {
        testList.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      setTestimonials(testList);
    }, (error) => console.error("Testimonials sync error:", error));

    const unsubMenus = onSnapshot(collection(db, 'menus'), (snapshot) => {
      const menuList: Menu[] = [];
      snapshot.forEach((doc) => {
        menuList.push({ id: doc.id, ...doc.data() } as Menu);
      });
      setMenus(menuList);
    }, (error) => console.error("Menus sync error:", error));

    // Listen to Inquiries (only if logged in as Admin, otherwise rules block it)
    let unsubInquiries = () => {};
    if (adminUser) {
      unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
        const inqList: Inquiry[] = [];
        snapshot.forEach((doc) => {
          inqList.push({ id: doc.id, ...doc.data() } as Inquiry);
        });
        setInquiries(inqList);
      }, (error) => console.warn("Inquiries rules standard blockage / sync warning:", error));
    }

    setLoadingData(false);

    return () => {
      unsubscribeAuth();
      unsubRooms();
      unsubGallery();
      unsubTestimonials();
      unsubMenus();
      unsubInquiries();
    };
  }, [adminUser]);

  // Fetch inquiries manually on adminUser activation to ensure rule is refreshed
  useEffect(() => {
    if (adminUser) {
      const fetchInquiries = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'inquiries'));
          const inqList: Inquiry[] = [];
          snapshot.forEach((doc) => {
            inqList.push({ id: doc.id, ...doc.data() } as Inquiry);
          });
          setInquiries(inqList);
        } catch (err) {
          console.warn("Manual inquiries fetch standard safety restriction:", err);
        }
      };
      fetchInquiries();
    }
  }, [adminUser, showAdminDashboard]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowAdminDashboard(false);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const handleSelectRoomType = (type: string) => {
    setSelectedRoomType(type);
  };

  const triggerDataRefresh = async () => {
    // Standard trigger
    console.log("Triggered data refresh sync from database...");
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-sm font-semibold">Initializing Aadarsh PG Portal...</p>
      </div>
    );
  }

  // Generate SEO schema markup for LocalBusiness (Aadarsh PG & Hostel)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "name": "Aadarsh PG & Hostel",
    "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
    "@id": "https://aadarsh-pg-hostel-jaipur",
    "url": window.location.href,
    "telephone": "+917023107808",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "NRI Road, Near Vivekananda Global University (VGU) main Gate, Sector 36, Jagatpura Extension",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "303012",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.8105",
      "longitude": "75.9221"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": []
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Dynamic SEO JSON-LD injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Floating Elements */}
      <WhatsAppButton />

      {/* Login Modal */}
      <AdminLogin 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      {/* Sticky Header */}
      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        adminUser={adminUser}
        onLogout={handleLogout}
        showAdminDashboard={showAdminDashboard}
        setShowAdminDashboard={setShowAdminDashboard}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Conditional View Router */}
      {showAdminDashboard && adminUser ? (
        <AdminDashboard 
          rooms={rooms}
          galleryItems={galleryItems}
          testimonials={testimonials}
          inquiries={inquiries}
          menus={menus}
          onRefreshData={triggerDataRefresh}
          onLogout={handleLogout}
        />
      ) : (
        <main>
          {/* 1. Hero */}
          <Hero />

          {/* 2. Why Choose Us */}
          <WhyChooseUs />

          {/* 3. Room Pricing */}
          <RoomPricing 
            rooms={rooms} 
            onSelectRoom={handleSelectRoomType} 
          />

          {/* 4. Room Gallery */}
          <RoomGallery 
            items={galleryItems} 
          />

          {/* 5. Facilities Section */}
          <Facilities />

          {/* 6. Food & Mess */}
          <FoodSection 
            menus={menus} 
          />

          {/* 7. Student Reviews */}
          <Reviews 
            testimonials={testimonials} 
          />

          {/* 8. FAQ Section */}
          <FAQ />

          {/* 9. Contact & Inquiry Form */}
          <ContactSection 
            selectedRoomType={selectedRoomType} 
          />

          {/* 10. Google Maps Location */}
          <MapSection />

          {/* 11. Footer */}
          <Footer />
        </main>
      )}

    </div>
  );
}
