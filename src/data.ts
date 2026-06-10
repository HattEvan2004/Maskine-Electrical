import { Service, EstimateItem, Testimonial, FAQItem, SafetyTip } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'panel-upgrades',
    title: 'Service Panel Upgrades',
    description: 'Transitioning older 60A or 100A services to modern, reliable 200A panels to support modern home appliances, heat pumps, and hot tubs safely.',
    iconName: 'Zap',
    category: 'residential',
    popular: true,
  },
  {
    id: 'ev-chargers',
    title: 'EV Charger Installation',
    description: 'Professional installation of Level 2 home and workplace electric vehicle charging stations, including utility permits and load calculations.',
    iconName: 'PlugZap',
    category: 'residential',
    popular: true,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Repairs',
    description: 'Pinpointing flickering lights, dead outlets, mystery trips in your circuit breakers, and warm switches to restore perfect safety and function.',
    iconName: 'AlertTriangle',
    category: 'both',
  },
  {
    id: 'renovations',
    title: 'Renovations & Additions',
    description: 'Comprehensive rewiring for kitchens, bathrooms, basement apartments, and custom home additions built perfectly to Canadian Electrical Code (CEC).',
    iconName: 'Home',
    category: 'residential',
  },
  {
    id: 'commercial-fitouts',
    title: 'Commercial Improvements',
    description: 'Office, retail, and restaurant electrical fitouts, specialty commercial ledger lighting, emergency exit fixtures, and heavy load branch wiring.',
    iconName: 'Briefcase',
    category: 'commercial',
  },
  {
    id: 'smart-fixtures',
    title: 'Fixtures & Smart Lighting',
    description: 'Lutron dimmers, smart-home automation integrations, decorative chandeliers, modern flush-mount LED retrofits, and beautiful accent under-cabinet light design.',
    iconName: 'Lightbulb',
    category: 'both',
  },
  {
    id: 'emergency-247',
    title: '24/7 Emergency Repairs',
    description: 'Immediate dispatch for lost power, water exposure, burning smells, sparking outlets, or total electrical safety failure. Available day or night.',
    iconName: 'ShieldAlert',
    category: 'emergency',
    popular: true,
  },
  {
    id: 'surge-protection',
    title: 'Whole-Home Surge Protection',
    description: 'Installing heavy-duty surge protection directly at your main panel to guard expensive central electronics, heating units, and appliances.',
    iconName: 'ShieldCheck',
    category: 'residential',
  }
];

export const ESTIMATE_ITEMS: EstimateItem[] = [
  {
    id: 'est-panel-100-200',
    name: '100A to 200A Service Upgrade',
    basePrice: 3200,
    timeframe: '1-2 Days',
    category: 'upgrade',
    description: 'Upgrade your main panel, outdoor meter base, weather head, and ground system to 200 Amp service. High safety yield.'
  },
  {
    id: 'est-ev-charger',
    name: 'Level 2 EV Charger Install',
    basePrice: 850,
    timeframe: '2-4 Hours',
    category: 'installation',
    description: 'Install a dedicated 50A breaker, professional conduit run, and mount/configure your Level 2 EV charging station.'
  },
  {
    id: 'est-trouble-1h',
    name: 'Standard Diagnostic & Trouble Investigation',
    basePrice: 150,
    timeframe: '1-2 Hours',
    category: 'troubleshooting',
    description: 'Up to 1 hour of comprehensive on-site circuit testing, safety checks, and finding the root cause of circuit issues.'
  },
  {
    id: 'est-smart-switch-5',
    name: 'Smart Dimmers & Switches (Multi-Location)',
    basePrice: 350,
    timeframe: '2-3 Hours',
    category: 'installation',
    description: 'Replace up to 5 existing traditional switches with high-quality smart-dimmers compatible with Apple Home, Alexa, or Google.'
  },
  {
    id: 'est-fixture-replace',
    name: 'Ceiling Fan or Chandelier Install',
    basePrice: 200,
    timeframe: '1-2 Hours',
    category: 'installation',
    description: 'Remove existing fixture, reinforce support box as required for weight, and safely hang a beautiful new custom chandelier or fan.'
  },
  {
    id: 'est-rec-outlet',
    name: 'Add New Outlets (Pack of 3)',
    basePrice: 450,
    timeframe: '3-5 Hours',
    category: 'installation',
    description: 'Fish new wiring through finished drywall to install up to 3 brand new convenient wall outlets with minimal disruption.'
  },
  {
    id: 'est-breaker-replace',
    name: 'Identify & Swap Tripped Breaker',
    basePrice: 180,
    timeframe: '1 Hour',
    category: 'repair',
    description: 'Diagnose a failing panel element, confirm no underlying branch short, and exchange a worn circuit breaker with a direct brand replacement.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marc G.',
    role: 'Homeowner',
    content: 'Anthony and his partner from MaskinE Electric did an outstanding job upgrading our home panel from 100A. They walked us through every step of the NS Power hookup, finished the inspection on record time, and didn’t leave a single speck of dust. Professional, polite, and exceptionally fair on pricing.',
    rating: 5,
    location: 'Halifax Peninsula, NS'
  },
  {
    id: 'test-2',
    name: 'Sarah L.',
    role: 'Retail Store Manager',
    content: 'We had an outlet failure right before our grand reopening. Mich was on-site in Dartmouth within 45 minutes, found the electrical fault in the backup circuit, and had us fully powered up. They are our official team of choice going forward!',
    rating: 5,
    location: 'Dartmouth (HRM), NS'
  },
  {
    id: 'test-3',
    name: 'Derek & Kate',
    role: 'Kitchen Remodel Customers',
    content: 'We called MaskinE for our complex kitchen renovation layout. They placed under-counter LED tracks, wired custom dual-GFCIs, and added pendant lights over our new island. The final outcome is glowing! Beautiful workmanship and absolute craftsmen.',
    rating: 5,
    location: 'Bedford, NS'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I know if my electrical panel needs an upgrade?',
    answer: 'Signs include flickering lights when major appliances kick on, circuit breakers frequently tripping, fuses blowing, presence of older and smaller services (like a 60A panel), or having an older fuse panel. If you are adding a modern heat pump, hot tub, or electric vehicle charger, your electrical load calculation will commonly require a 200 Amp service upgrade.'
  },
  {
    id: 'faq-2',
    question: 'What areas do you service in Nova Scotia?',
    answer: 'We proudly serve the entire Halifax Regional Municipality (HRM) and surrounding areas, including Halifax, Dartmouth, Bedford, Sackville, Timberlea, Cole Harbour, Eastern Passage, and down to the South Shore & St. Margaret’s Bay.'
  },
  {
    id: 'faq-3',
    question: 'Are you fully licensed, insured, and certified with Nova Scotia Power?',
    answer: 'Absolutely. We are fully certified, licensed, and registered with the Nova Scotia Department of Labour as qualified master/journeyperson electricians. We carry comprehensive commercial general liability insurance and hold an active connection bond for fast electric permits and utility turn-ons.'
  },
  {
    id: 'faq-4',
    question: 'How should I handle an electrical emergency before you arrive?',
    answer: 'If you smell electrical smoke (like burning plastic), hear crackling/buzzing in walls, or see sparks, first locate your main breaker and flip it completely to the "OFF" position if it is safe to do so. This shuts down power to the entire house. Avoid contact with any water near electrical sockets and call Anthony or Mich immediately at our emergency lines.'
  },
  {
    id: 'faq-5',
    question: 'Do you charge a flat hourly rate or by project estimates?',
    answer: 'We provide clear, flat-rate, transparent pricing on standard installations (like EV chargers, panel upgrades, or fixture swaps) so you know your cost of work upfront. For complex diagnostic troubleshooting and emergency service calls, we charge an initial dispatch & diagnostic fee followed by a transparent hourly rate.'
  }
];

export const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 'tip-1',
    title: 'The GFCI Test',
    category: 'Kitchens & Bathrooms',
    content: 'Test your Ground Fault Circuit Interrupter (GFCI) outlets monthly. Pressing the "TEST" button should snap and shut off power. This button prevents lethal water-to-electricity shocks in kitchens, bathrooms, and wet environments.'
  },
  {
    id: 'tip-2',
    title: 'Never Overload Power Strips',
    category: 'Living Rooms & Offices',
    content: 'Power strips only expand wall plug capacity—they do NOT increase actual circuit limit capacities. Heavy current appliances like heaters, portable AC units, and hair dryers should always be plugged directly into wall outlets.'
  },
  {
    id: 'tip-3',
    title: 'Warm Outlets are Warnings',
    category: 'Bedroom & Safe Haven',
    content: 'If an outlet cover feels warm, has discoloration, or emits a faint buzzing sound, do not use it. This indicates loose connections, which generate dangerous heat arcs and are a primary cause of home fires. Contact an electrician immediately.'
  }
];
