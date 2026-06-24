import { collection, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { Room, GalleryItem, Testimonial, Menu } from './types';

const INITIAL_ROOMS: Room[] = [
  {
    id: 'double-sharing',
    type: 'double',
    name: 'Premium Double Sharing Room',
    price: 100000,
    available: true,
    features: [
      'Fully Furnished Room',
      'Attached Bathroom',
      'High-Speed Wi-Fi Included',
      'RO Drinking Water',
      'Daily Housekeeping',
      '3 Hygienic Meals (Breakfast, Lunch & Dinner)'
    ],
    description: 'Perfect balance of privacy and companionship. Comes with individual beds, study tables, wardrobes, and separate power sockets.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'triple-sharing',
    type: 'triple',
    name: 'Comfort Triple Sharing Room',
    price: 90000,
    available: true,
    features: [
      'Fully Furnished Room',
      'Attached Bathroom',
      'High-Speed Wi-Fi Included',
      'RO Drinking Water',
      'Daily Housekeeping',
      '3 Hygienic Meals (Breakfast, Lunch & Dinner)',
      'Spacious Shared Wardrobes'
    ],
    description: 'Our most popular choice for students looking for an affordable, highly social, and secure lodging experience near VGU Jaipur.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800'
  }
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-double-1',
    category: 'double',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
    title: 'Double Sharing Bedroom Layout',
    description: 'Spacious setup with dual study tables and beds'
  },
  {
    id: 'g-double-2',
    category: 'double',
    imageUrl: 'https://images.unsplash.com/photo-1617315031121-3df721482a0b?auto=format&fit=crop&q=80&w=800',
    title: 'Bright and Airy Rooms',
    description: 'Excellent ventilation and natural sunlight'
  },
  {
    id: 'g-triple-1',
    category: 'triple',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
    title: 'Triple Sharing Bed Configuration',
    description: 'Comfortable and affordable shared layout'
  },
  {
    id: 'g-triple-2',
    category: 'triple',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    title: 'Individual Storage Units',
    description: 'Dedicated wardrobes for all roommates'
  },
  {
    id: 'g-bath-1',
    category: 'bathrooms',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    title: 'Attached Modern Bathroom',
    description: 'Sanitized with western toilets and premium fittings'
  },
  {
    id: 'g-bath-2',
    category: 'bathrooms',
    imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&q=80&w=800',
    title: 'Clean Hot Water Facilities',
    description: 'Geyser fittings installed for cold winter mornings'
  },
  {
    id: 'g-fac-1',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    title: 'Study Environment',
    description: 'Quiet learning space ideal for exam preparation'
  },
  {
    id: 'g-fac-2',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    title: 'CCTV Secure Campus',
    description: '24/7 security monitoring for complete peace of mind'
  },
  {
    id: 'g-fac-3',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    title: 'Mess and Dining Hall',
    description: 'Spacious dining area where hygienic fresh food is served'
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Suresh Kumar',
    rating: 5,
    review: 'Aadarsh PG has been my home for the last two years. The distance to VGU is just a 2-minute walk! The food quality is excellent and tastes just like home.',
    role: 'VGU B.Tech Student',
    date: 'May 2026'
  },
  {
    id: 't2',
    name: 'Amit Sharma',
    rating: 5,
    review: 'The best thing about this hostel is the study environment and the superfast Wi-Fi. The owners, Manoj ji and Ramraj ji, are extremely supportive and helpful.',
    role: 'VGU MBA Student',
    date: 'April 2026'
  },
  {
    id: 't3',
    name: 'Rahul Choudhary',
    rating: 4,
    review: 'Very clean and safe PG. Housekeeping is done daily, bathrooms are always sparkling. The CCTV and RO drinking water facilities are perfect.',
    role: 'VGU BCA Student',
    date: 'June 2026'
  }
];

const INITIAL_MENUS: Menu[] = [
  {
    id: 'summer',
    name: 'Summer Menu',
    days: {
      'Sunday': { breakfast: 'No Breakfast', lunch: 'Special Meal + Dal + Roti + Rice', dinner: 'Aloo Jeera + Dal + Roti + Rice' },
      'Monday': { breakfast: 'Idli Sambar', lunch: 'Palak Aloo + Dal + Roti + Rice', dinner: 'Sev Tamatar + Dal + Roti + Rice' },
      'Tuesday': { breakfast: 'Poha', lunch: 'Mix Veg + Dal + Roti + Rice', dinner: 'Chana Masala + Dal + Roti + Rice' },
      'Wednesday': { breakfast: 'Bread Pakoda', lunch: 'Kaddu + Dal + Roti + Rice', dinner: 'Aloo Chhole + Dal + Roti + Rice' },
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

export async function seedDatabaseIfNeeded() {
  try {
    // Check Rooms
    const roomsSnap = await getDocs(collection(db, 'rooms'));
    if (roomsSnap.empty) {
      console.log('Seeding initial rooms...');
      for (const room of INITIAL_ROOMS) {
        await setDoc(doc(db, 'rooms', room.id), room);
      }
    }

    // Check Gallery
    const gallerySnap = await getDocs(collection(db, 'gallery'));
    if (gallerySnap.empty) {
      console.log('Seeding initial gallery items...');
      for (const item of INITIAL_GALLERY) {
        await setDoc(doc(db, 'gallery', item.id), item);
      }
    }

    // Check Testimonials
    const testSnap = await getDocs(collection(db, 'testimonials'));
    if (testSnap.empty) {
      console.log('Seeding initial testimonials...');
      for (const t of INITIAL_TESTIMONIALS) {
        await setDoc(doc(db, 'testimonials', t.id), t);
      }
    }

    // Check/Sync Menus (Always write latest menus to match user requirements)
    console.log('Syncing latest mess menus...');
    for (const menu of INITIAL_MENUS) {
      await setDoc(doc(db, 'menus', menu.id), menu);
    }

    console.log('Database verification and seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
