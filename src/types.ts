export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'residential' | 'commercial' | 'both' | 'emergency';
  popular?: boolean;
}

export interface EstimateItem {
  id: string;
  name: string;
  basePrice: number;
  timeframe: string;
  category: 'installation' | 'repair' | 'upgrade' | 'troubleshooting';
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  location: string;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  preferredElectrician: 'anthony' | 'mich' | 'either';
  urgency: 'routine' | 'urgent' | 'emergency';
  address: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  category: string;
  content: string;
}
