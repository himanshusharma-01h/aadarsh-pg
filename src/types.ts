export interface Room {
  id: string;
  type: 'double' | 'triple';
  name: string;
  price: number; // yearly price
  available: boolean;
  features: string[];
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  category: 'double' | 'triple' | 'bathrooms' | 'facilities';
  imageUrl: string;
  title: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  role: string;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  city: string;
  roomType: string;
  moveInDate: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface DayMenu {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Menu {
  id: string; // "summer" | "winter"
  name: string;
  days: {
    [key: string]: DayMenu;
  };
}
