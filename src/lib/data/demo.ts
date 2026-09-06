// ─────────────────────────────────────────────────────────────
// finda demo data layer — Nigeria edition 🇳🇬
// Lagos businesses, Naira pricing, WhatsApp-first contact.
// In-memory + localStorage store. When Supabase keys are added,
// the actions layer in src/lib/actions/* switches to live
// queries — the UI contract (types) stays identical.
// ─────────────────────────────────────────────────────────────

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp: string; // digits only, for wa.me links
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  priceLevel: 1 | 2 | 3;
  image: string;
  gallery: string[];
  tags: string[];
  hours: { day: string; open: string; close: string }[];
  services: { name: string; price: string; duration: string; description: string }[];
  isOpen: boolean;
  lat: number;
  lng: number;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  verifiedVisit?: boolean; // has a completed booking at this business
  reply?: { text: string; date: string }; // owner's public reply
}

/** A user's own review of a business, if they've written one. */
export function getMyReview(businessId: string): Review | undefined {
  const session = getSession();
  if (!session) return undefined;
  const me = `${session.firstName} ${session.lastName}`;
  return load().reviews.find((r) => r.businessId === businessId && r.author === me);
}

/**
 * True when the signed-in user has a completed booking at this business —
 * the basis of the verified-visit badge. Checked live from the store.
 */
export function hasCompletedBooking(businessId: string): boolean {
  const session = getSession();
  if (!session) return false;
  return load().bookings.some(
    (b) => b.userId === session.id && b.businessId === businessId && b.status === "completed"
  );
}

export interface Booking {
  id: string;
  userId: string;
  businessId: string;
  businessName: string;
  businessImage: string;
  serviceName: string;
  date: string; // ISO
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: string;
  address: string;
  notes?: string;
}

export interface Favorite {
  userId: string;
  businessId: string;
}

/**
 * A business's post to the updates feed: offers, events, new stock,
 * announcements. scope "followers" = only followers see it in feed.
 */
export interface BusinessUpdate {
  id: string;
  businessId: string;
  type: "offer" | "event" | "product" | "news";
  text: string;
  image?: string;
  createdAt: string; // ISO
  expiresAt?: string; // ISO — offers can expire
  scope: "followers" | "public";
}

export interface Follow {
  userId: string;
  businessId: string;
  followedAt: string; // ISO
}

export interface AppNotification {
  id: string;
  type: "booking" | "review" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "business" | "admin";
  memberSince: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  price: string; // formatted Naira, e.g. "₦4,500"
  stock: number | null; // null = made to order / always available
  image?: string;
  soldOut: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: string; // formatted
  priceValue: number; // numeric Naira
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  businessId: string;
  businessName: string;
  businessSlug: string;
  businessWhatsapp: string;
  items: OrderItem[];
  subtotal: number; // ₦
  deliveryFee: number; // ₦ (0 = pickup)
  total: number; // ₦
  fulfilment: "pickup" | "delivery";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address?: string; // delivery address
  note?: string;
  payment: "paid" | "on_pickup" | "unpaid";
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled";
  createdAt: string; // ISO
}

export interface CartItem {
  productId: string;
  businessId: string;
  name: string;
  price: string; // formatted
  priceValue: number;
  quantity: number;
  stock: number | null;
}

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "business" | "admin";
  ownedBusinessId?: string;
}

const CURRENT_USER: Profile = {
  id: "u_1",
  firstName: "Adaeze",
  lastName: "Nwosu",
  email: "adaeze@finda.ng",
  role: "user",
  memberSince: "2024",
};

const IMG = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hoursDefault = (open = "8:00 AM", close = "9:00 PM") => [
  { day: "Mon–Fri", open, close },
  { day: "Saturday", open, close },
  { day: "Sunday", open: "12:00 PM", close: "8:00 PM" },
];

/** Standard Lagos delivery fee for storefront orders (₦). */
export const DELIVERY_FEE_NGN = 2000;

/** Formats a Naira amount: 4500 -> "₦4,500" */
export function naira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** Parses "₦4,500" (or "From ₦4,500") -> 4500. Returns 0 when unparseable. */
export function parsePrice(label: string): number {
  const digits = label.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

const BUSINESSES: Business[] = [
  {
    id: "b_1",
    slug: "nkwo-kitchen",
    name: "Nkwo Kitchen",
    category: "Restaurants",
    description:
      "Proper home-style Nigerian cooking in the heart of Yaba. Smoky party jollof, assorted peppered goat, ofada rice with ayamase, and Sunday pepper soup that sells out by 4 PM. The courtyard seats 40 — come early or book ahead.",
    address: "14 Herbert Macaulay Way",
    neighborhood: "Yaba",
    phone: "+234 801 234 5678",
    whatsapp: "2348012345678",
    email: "hello@nkwokitchen.ng",
    website: "nkwokitchen.ng",
    rating: 4.8,
    reviewCount: 187,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1517248135467-4c7edcad34c4"),
    gallery: [
      IMG("photo-1559339352-11d035aa65de"),
      IMG("photo-1552566626-52f8b828add9"),
      IMG("photo-1414235077428-338989a2e8c0"),
    ],
    tags: ["Jollof", "Ofada", "Pepper Soup", "Family Friendly"],
    hours: hoursDefault("11:00 AM", "11:00 PM"),
    services: [
      { name: "Table Reservation", price: "Free", duration: "2 hrs", description: "Standard table for up to 6 guests." },
      { name: "Party Tray Catering", price: "From ₦85,000", duration: "48 hrs notice", description: "Jollof, proteins, sides — feeds 25." },
      { name: "Private Event Hosting", price: "From ₦350,000", duration: "4 hrs", description: "Courtyard buy-out for 20–40 guests." },
    ],
    isOpen: true,
    lat: 6.5095,
    lng: 3.3711,
    status: "approved",
    createdAt: "2024-01-12",
  },
  {
    id: "b_2",
    slug: "kofe-haus",
    name: "Kofe Haus",
    category: "Cafés",
    description:
      "Specialty coffee bar roasting single-origin beans from Taraba and Cross River. The boli and plantain waffles are a whole conversation. Free wifi, plenty of sockets, laptop-friendly before 4 PM.",
    address: "8 Alagomeji Close",
    neighborhood: "Yaba",
    phone: "+234 802 345 6789",
    whatsapp: "2348023456789",
    email: "hi@kofehaus.ng",
    website: "kofehaus.ng",
    rating: 4.9,
    reviewCount: 243,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1497935586351-b67a49e012bf"),
    gallery: [
      IMG("photo-1445116572660-236099ec97a0"),
      IMG("photo-1442512595331-e89e73853f31"),
      IMG("photo-1501339847302-ac426a4a7cbb"),
    ],
    tags: ["Coffee", "Wifi", "Brunch", "Laptop Friendly"],
    hours: hoursDefault("7:00 AM", "7:00 PM"),
    services: [
      { name: "Cupping Session", price: "₦5,000", duration: "1 hr", description: "Guided tasting of three origins, Saturdays." },
      { name: "Barista Basics Class", price: "₦25,000", duration: "2 hrs", description: "Hands-on espresso and milk science." },
      { name: "Office Coffee Supply", price: "Free consult", duration: "30 min", description: "Beans + equipment for your office." },
    ],
    isOpen: true,
    lat: 6.5125,
    lng: 3.3745,
    status: "approved",
    createdAt: "2024-02-03",
  },
  {
    id: "b_3",
    slug: "sharp-trims",
    name: "Sharp Trims Barbershop",
    category: "Beauty & Spas",
    description:
      "Precision cuts, clean fades, and hot-towel shaves in Surulere. The barbers here do for your hairline what Lagos traffic does for patience — the opposite. Walk-ins before noon, bookings after.",
    address: "22 Adeniran Ogunsanya Street",
    neighborhood: "Surulere",
    phone: "+234 803 456 7890",
    whatsapp: "2348034567890",
    email: "book@sharptrims.ng",
    website: "sharptrims.ng",
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    priceLevel: 1,
    image: IMG("photo-1503951914875-452162b0f3f1"),
    gallery: [
      IMG("photo-1585747860715-2ba37e788b70"),
      IMG("photo-1519500099198-fd81846b8f03"),
      IMG("photo-1599351431202-1e0f0137899a"),
    ],
    tags: ["Barbershop", "Fades", "Shaves", "Walk-ins"],
    hours: hoursDefault("8:00 AM", "8:00 PM"),
    services: [
      { name: "Signature Cut", price: "₦5,000", duration: "45 min", description: "Consultation, cut, line-up, style." },
      { name: "Hot Towel Shave", price: "₦4,000", duration: "30 min", description: "Straight razor, steam, balm." },
      { name: "Cut + Beard Combo", price: "₦8,000", duration: "75 min", description: "The full works." },
    ],
    isOpen: true,
    lat: 6.4928,
    lng: 3.3508,
    status: "approved",
    createdAt: "2024-02-18",
  },
  {
    id: "b_4",
    slug: "ile-iya-spa",
    name: "Ile Iyá Spa & Wellness",
    category: "Beauty & Spas",
    description:
      "A quiet sanctuary off the Ikoyi grind: deep-tissue and prenatal massage by certified therapists, shea-based facials blended in-house, and a calm that survives even Third Mainland traffic.",
    address: "34 Bourdillon Road",
    neighborhood: "Ikoyi",
    phone: "+234 804 567 8901",
    whatsapp: "2348045678901",
    email: "book@ileiya.ng",
    website: "ileiya.ng",
    rating: 4.6,
    reviewCount: 198,
    verified: true,
    priceLevel: 3,
    image: IMG("photo-1544161515-4ab6ce6db874"),
    gallery: [
      IMG("photo-1540555700478-4be289fbecef"),
      IMG("photo-1600334089648-b0d9d3028eb2"),
      IMG("photo-1519823551278-64ac92734fb1"),
    ],
    tags: ["Spa", "Massage", "Facials", "Prenatal"],
    hours: hoursDefault("9:00 AM", "8:00 PM"),
    services: [
      { name: "Deep Tissue Massage", price: "₦45,000", duration: "60 min", description: "Targeted pressure work." },
      { name: "Iyá Signature Facial", price: "₦60,000", duration: "75 min", description: "Shea and hibiscus, LED finish." },
      { name: "Couples Retreat", price: "₦120,000", duration: "90 min", description: "Side-by-side massage and soak." },
    ],
    isOpen: true,
    lat: 6.455,
    lng: 3.435,
    status: "approved",
    createdAt: "2024-03-05",
  },
  {
    id: "b_5",
    slug: "fitlane-lekki",
    name: "FitLane Gym Lekki",
    category: "Health & Fitness",
    description:
      "Strength-first gym with certified coaches, programmed blocks, and monthly re-tests. Open floor, turf lane, steam room, and a community that will absolutely notice when you skip leg day.",
    address: "82 Admiralty Way",
    neighborhood: "Lekki",
    phone: "+234 805 678 9012",
    whatsapp: "2348056789012",
    email: "front@fitlane.ng",
    website: "fitlane.ng",
    rating: 4.8,
    reviewCount: 134,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1534438327276-14e5300c3a48"),
    gallery: [
      IMG("photo-1571019613454-1cb2f99b2d8b"),
      IMG("photo-1571902943202-507ec2618e8f"),
      IMG("photo-1517836357463-d25dfeac3438"),
    ],
    tags: ["Gym", "Personal Training", "Strength", "Steam Room"],
    hours: hoursDefault("5:30 AM", "10:00 PM"),
    services: [
      { name: "Free Trial Day Pass", price: "Free", duration: "1 day", description: "Full access, one trainer check-in." },
      { name: "1:1 Coaching Session", price: "₦15,000", duration: "60 min", description: "Individual programming block." },
      { name: "Monthly Membership", price: "₦45,000", duration: "30 days", description: "Unlimited access + classes." },
    ],
    isOpen: false,
    lat: 6.44,
    lng: 3.47,
    status: "approved",
    createdAt: "2024-03-22",
  },
  {
    id: "b_6",
    slug: "bookshelf-corner",
    name: "Bookshelf Corner",
    category: "Shopping",
    description:
      "Independent bookshop and reading café in Yaba. Staffed recommendation desk, strong African literature wall, and Friday evening readings with small-chops. They will find you your next favourite book.",
    address: "5 Alagbado Street",
    neighborhood: "Yaba",
    phone: "+234 806 789 0123",
    whatsapp: "2348067890123",
    email: "desk@bookshelfcorner.ng",
    website: "bookshelfcorner.ng",
    rating: 4.9,
    reviewCount: 221,
    verified: true,
    priceLevel: 1,
    image: IMG("photo-1507842217343-583bb7270b66"),
    gallery: [
      IMG("photo-1521587760476-6c12a4b040da"),
      IMG("photo-1524578271613-d550eacf6090"),
      IMG("photo-1512820790803-83ca734da794"),
    ],
    tags: ["Bookstore", "Café", "Readings", "African Literature"],
    hours: hoursDefault("9:00 AM", "8:00 PM"),
    services: [
      { name: "Book Concierge", price: "Free", duration: "20 min", description: "Tell us three books you loved." },
      { name: "Friday Reading Night", price: "Free", duration: "2 hrs", description: "Author readings, small-chops by donation." },
      { name: "Bulk School Orders", price: "Discounted", duration: "3–5 days", description: "School and book-club supply." },
    ],
    isOpen: true,
    lat: 6.5069,
    lng: 3.3688,
    status: "approved",
    createdAt: "2024-04-10",
  },
  {
    id: "b_7",
    slug: "lagos-auto-clinic",
    name: "Lagos Auto Clinic",
    category: "Automotive",
    description:
      "Honest diagnostics for Toyota, Honda, Lexus and Mercedes in Ikeja. Digital inspection reports with photos — no mysterious 'engine issues', no upsell theatre. Free collection within Ikeja.",
    address: "17 Obafemi Awolowo Way",
    neighborhood: "Ikeja",
    phone: "+234 807 890 1234",
    whatsapp: "2348078901234",
    email: "service@lagosautoclinic.ng",
    website: "lagosautoclinic.ng",
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1487754180451-c456f719a1fc"),
    gallery: [
      IMG("photo-1486262715619-67b85e0b08d3"),
      IMG("photo-1530046339160-ce3e530c7d2f"),
      IMG("photo-1493238792000-8113da705763"),
    ],
    tags: ["Auto Repair", "Diagnostics", "Toyota", "Free Pickup"],
    hours: hoursDefault("7:30 AM", "6:00 PM"),
    services: [
      { name: "Digital Inspection", price: "Free with service", duration: "45 min", description: "Photos and prioritised report." },
      { name: "Oil & Filter Service", price: "₦35,000", duration: "1 hr", description: "OEM filters, synthetic oil." },
      { name: "Pre-Purchase Inspection", price: "₦50,000", duration: "90 min", description: "Lift + road test + scan." },
    ],
    isOpen: true,
    lat: 6.6018,
    lng: 3.3515,
    status: "approved",
    createdAt: "2024-04-28",
  },
  {
    id: "b_8",
    slug: "petals-and-stems",
    name: "Petals & Stems Lagos",
    category: "Shopping",
    description:
      "Florist on the Island working with local growers and imported stems. Same-day delivery before 2 PM across Lagos, wedding installs, and wreath workshops that sell out every month.",
    address: "9A Adeola Odeku Street",
    neighborhood: "Victoria Island",
    phone: "+234 808 901 2345",
    whatsapp: "2348089012345",
    email: "stem@petalsandstems.ng",
    website: "petalsandstems.ng",
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    priceLevel: 3,
    image: IMG("photo-1487530811176-3780de880c2d"),
    gallery: [
      IMG("photo-1508610048659-a06b669e3321"),
      IMG("photo-1526047932273-341f2a7631f9"),
      IMG("photo-1563241527-3004b7be0ffd"),
    ],
    tags: ["Florist", "Same-Day Delivery", "Weddings", "Workshops"],
    hours: hoursDefault("8:00 AM", "7:00 PM"),
    services: [
      { name: "Seasonal Bouquet", price: "From ₦25,000", duration: "Ready in 2 hrs", description: "Grower's choice, wrapped." },
      { name: "Wreath Workshop", price: "₦35,000", duration: "2 hrs", description: "All materials included." },
      { name: "Event Installation", price: "By quote", duration: "Varies", description: "Weddings and launches." },
    ],
    isOpen: true,
    lat: 6.4281,
    lng: 3.4219,
    status: "approved",
    createdAt: "2024-05-15",
  },
  {
    id: "b_9",
    slug: "the-pour-deck",
    name: "The Pour Deck",
    category: "Nightlife",
    description:
      "Rooftop bar on the Island with a serious mocktail game, live afrobeats bands on Fridays, and suya from the grill until close. Zero TVs — the views of the Lagoon are the entertainment.",
    address: "1 Ozumba Mbadiwe Avenue",
    neighborhood: "Victoria Island",
    phone: "+234 809 012 3456",
    whatsapp: "2348090123456",
    email: "pours@thepourdeck.ng",
    website: "thepourdeck.ng",
    rating: 4.6,
    reviewCount: 178,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1514933651103-005eec06c04b"),
    gallery: [
      IMG("photo-1535958636474-b021ee887b13"),
      IMG("photo-1574096079513-d8259312b785"),
      IMG("photo-1544145945-f90425340c7e"),
    ],
    tags: ["Rooftop", "Live Music", "Suya", "Mocktails"],
    hours: hoursDefault("4:00 PM", "12:00 AM"),
    services: [
      { name: "Table Reservation", price: "Free", duration: "2 hrs", description: "For parties of 2–8." },
      { name: "Friday Band Night Table", price: "₦20,000 min. spend", duration: "3 hrs", description: "Reserved seating + welcome drink." },
      { name: "Private Rooftop", price: "From ₦500,000", duration: "4 hrs", description: "Up to 50 guests." },
    ],
    isOpen: true,
    lat: 6.4304,
    lng: 3.4319,
    status: "approved",
    createdAt: "2024-06-02",
  },
  {
    id: "b_10",
    slug: "zenflex-yoga",
    name: "ZenFlex Yoga Studio",
    category: "Health & Fitness",
    description:
      "Hot yoga, vinyasa and prenatal classes in Lekki Phase 1. Mats provided, first class free, and instructors who actually correct your form. Saturday community class is pay-what-you-can.",
    address: "27 Fola Osibo Road",
    neighborhood: "Lekki",
    phone: "+234 810 123 4567",
    whatsapp: "2348101234567",
    email: "namaste@zenflex.ng",
    website: "zenflex.ng",
    rating: 4.7,
    reviewCount: 143,
    verified: false,
    priceLevel: 2,
    image: IMG("photo-1545205597-3d9d02c29597"),
    gallery: [
      IMG("photo-1575052814086-f385e2e2ad1b"),
      IMG("photo-1599901860904-17e6ed7083a0"),
      IMG("photo-1506126613408-eca07ce68773"),
    ],
    tags: ["Yoga", "Hot Yoga", "Prenatal", "Community Class"],
    hours: hoursDefault("6:00 AM", "9:00 PM"),
    services: [
      { name: "Drop-in Class", price: "₦10,000", duration: "75 min", description: "Any class, mats provided." },
      { name: "10-Class Pack", price: "₦80,000", duration: "Valid 3 months", description: "Save ₦20k vs drop-in." },
      { name: "Prenatal Series", price: "₦60,000", duration: "6 weeks", description: "Trimester-safe movement." },
    ],
    isOpen: true,
    lat: 6.4433,
    lng: 3.4644,
    status: "approved",
    createdAt: "2024-06-20",
  },
  {
    id: "b_11",
    slug: "bright-smile-dental",
    name: "Bright Smile Dental",
    category: "Health & Medical",
    description:
      "Modern dental practice in Gbagada with same-week appointments, transparent pricing before any treatment, and a hygienist team people genuinely ask for by name. HMO-friendly.",
    address: "46 Gbagada Expressway",
    neighborhood: "Gbagada",
    phone: "+234 811 234 5678",
    whatsapp: "2348112345678",
    email: "front@brightsmile.ng",
    website: "brightsmile.ng",
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    priceLevel: 2,
    image: IMG("photo-1629909613654-28e377c37b09"),
    gallery: [
      IMG("photo-1588776814546-1ffcf47267a5"),
      IMG("photo-1606811841689-23dfddce3e95"),
      IMG("photo-1445527815219-ecbfec67492e"),
    ],
    tags: ["Dentist", "Same-Week", "HMO Accepted", "Transparent Pricing"],
    hours: hoursDefault("8:00 AM", "5:00 PM"),
    services: [
      { name: "New Patient Exam", price: "₦25,000", duration: "60 min", description: "X-rays, cleaning, treatment plan." },
      { name: "Cleaning & Polish", price: "₦30,000", duration: "45 min", description: "Routine prophylaxis." },
      { name: "Whitening Session", price: "₦90,000", duration: "90 min", description: "In-office treatment." },
    ],
    isOpen: true,
    lat: 6.5556,
    lng: 3.3889,
    status: "approved",
    createdAt: "2024-07-08",
  },
  {
    id: "b_12",
    slug: "fixhub",
    name: "FixHub Phone & Laptop Repair",
    category: "Home Services",
    description:
      "Component-level phone, tablet and laptop repair in Maryland. Most fixes same-day, free diagnostics, and your data never leaves your device unless you ask. Six-month warranty on screen work.",
    address: "73 Ikorodu Road",
    neighborhood: "Maryland",
    phone: "+234 812 345 6789",
    whatsapp: "2348123456789",
    email: "fix@fixhub.ng",
    website: "fixhub.ng",
    rating: 4.5,
    reviewCount: 76,
    verified: false,
    priceLevel: 1,
    image: IMG("photo-1581092921461-eab62e97a783"),
    gallery: [
      IMG("photo-1591799264318-7e6ef8ddb7ea"),
      IMG("photo-1602080858428-57174f9431cf"),
      IMG("photo-1518770660439-4636190af475"),
    ],
    tags: ["Phone Repair", "Laptop", "Same-Day", "Warranty"],
    hours: hoursDefault("9:00 AM", "7:00 PM"),
    services: [
      { name: "Screen Replacement", price: "From ₦25,000", duration: "Same day", description: "OEM-grade parts, 6-month warranty." },
      { name: "Battery Service", price: "₦18,000", duration: "1 hr", description: "Calibrated to the board." },
      { name: "Free Diagnostic", price: "Free", duration: "30 min", description: "Assessment credited to any repair." },
    ],
    isOpen: true,
    lat: 6.573,
    lng: 3.3667,
    status: "approved",
    createdAt: "2024-07-25",
  },
];

const REVIEWS: Review[] = [
  { id: "r_1", businessId: "b_1", author: "Chiamaka Obi", initials: "CO", rating: 5, text: "The party jollof tastes like an actual owambe. Booked a table for six and the service was on point from start to finish.", date: "2025-08-30" },
  { id: "r_2", businessId: "b_1", author: "Tunde Bakare", initials: "TB", rating: 4, text: "Pepper soup is elite. Only knock — Friday night wait is real. Book ahead or sit at the courtyard bar.", date: "2025-08-22" },
  { id: "r_3", businessId: "b_1", author: "Adaeze Nwosu", initials: "AN", rating: 5, text: "Came here for my mum's birthday. They remembered the reservation note and brought cake with a candle. Small thing, big difference.", date: "2025-07-11" },
  { id: "r_4", businessId: "b_2", author: "Femi Alabi", initials: "FA", rating: 5, text: "Their Taraba single-origin cortado is the best coffee between here and anywhere. The boli waffles are not a gimmick — they're a masterpiece.", date: "2025-08-28" },
  { id: "r_5", businessId: "b_2", author: "Ngozi Eze", initials: "NE", rating: 4, text: "Great for remote work before 4 PM. Gets busy with the Yaba tech crowd after that, which tells you everything.", date: "2025-08-15" },
  { id: "r_6", businessId: "b_3", author: "Emeka Duru", initials: "ED", rating: 5, text: "Izzy has cut my hair for three years. Cleanest fade in Surulere, no debate. The hot towel shave is a whole ritual.", date: "2025-08-25" },
  { id: "r_7", businessId: "b_4", author: "Halima Bello", initials: "HB", rating: 5, text: "Best deep tissue in Lagos, full stop. They actually listen to problem areas instead of running a generic routine.", date: "2025-08-20", reply: { text: "Thank you Halima! Iya sends her regards — we look forward to your next visit.", date: "2025-08-21" } },

  { id: "r_8", businessId: "b_5", author: "Kelechi Amadi", initials: "KA", rating: 5, text: "The movement screen changed how I train. Coaches know their stuff and the monthly re-tests keep me honest.", date: "2025-08-18" },
  { id: "r_9", businessId: "b_6", author: "Aisha Musa", initials: "AM", rating: 5, text: "Asked the desk for 'Nigerian sci-fi and something atmospheric' and walked out with three perfect picks. This place gets readers.", date: "2025-08-27" },
  { id: "r_10", businessId: "b_7", author: "Yemi Ogunleye", initials: "YO", rating: 4, text: "Honest shop. The photo inspection report meant zero surprises on my Honda. Slightly pricier than roadside mechanics, completely worth it.", date: "2025-08-10", verifiedVisit: true },
  { id: "r_11", businessId: "b_11", author: "Ifeoma Kalu", initials: "IK", rating: 5, text: "First dentist that explains costs before touching anything. Got a same-week appointment through Finda — it actually worked.", date: "2025-08-29" },
  { id: "r_12", businessId: "b_12", author: "Sadiq Ibrahim", initials: "SI", rating: 4, text: "Two other shops declared my laptop dead. FixHub revived it same-day for a fair price. Clear WhatsApp updates throughout.", date: "2025-08-05" },
];

const BOOKINGS: Booking[] = [
  {
    id: "bk_1",
    userId: "u_1",
    businessId: "b_1",
    businessName: "Nkwo Kitchen",
    businessImage: BUSINESSES[0].image,
    serviceName: "Table Reservation",
    date: "2025-09-06",
    time: "7:00 PM",
    status: "confirmed",
    price: "Free",
    address: "14 Herbert Macaulay Way, Yaba",
  },
  {
    id: "bk_2",
    userId: "u_1",
    businessId: "b_4",
    businessName: "Ile Iyá Spa & Wellness",
    businessImage: BUSINESSES[3].image,
    serviceName: "Deep Tissue Massage",
    date: "2025-09-09",
    time: "10:00 AM",
    status: "pending",
    price: "₦45,000",
    address: "34 Bourdillon Road, Ikoyi",
  },
  {
    id: "bk_3",
    userId: "u_1",
    businessId: "b_2",
    businessName: "Kofe Haus",
    businessImage: BUSINESSES[1].image,
    serviceName: "Barista Basics Class",
    date: "2025-08-24",
    time: "2:00 PM",
    status: "completed",
    price: "₦25,000",
    address: "8 Alagomeji Close, Yaba",
  },
  {
    id: "bk_4",
    userId: "u_1",
    businessId: "b_5",
    businessName: "FitLane Gym Lekki",
    businessImage: BUSINESSES[4].image,
    serviceName: "Free Trial Day Pass",
    date: "2025-08-02",
    time: "6:00 PM",
    status: "cancelled",
    price: "Free",
    address: "82 Admiralty Way, Lekki",
  },
];

const FAVORITES: Favorite[] = [
  { userId: "u_1", businessId: "b_2" },
  { userId: "u_1", businessId: "b_6" },
  { userId: "u_1", businessId: "b_9" },
];

const UPDATES: BusinessUpdate[] = [
  {
    id: "u_1",
    businessId: "b_1",
    type: "offer",
    text: "Weekend special: free small-chops with every party tray ordered before Saturday. WhatsApp us your order — 6 trays left.",
    createdAt: "2025-09-05T09:00:00.000Z",
    expiresAt: "2025-09-07T23:59:00.000Z",
    scope: "public",
  },
  {
    id: "u_2",
    businessId: "b_2",
    type: "event",
    text: "Cupping Saturday is back! This month we taste three origins from Taraba. ₦5,000, 10 AM — link in our storefront.",
    createdAt: "2025-09-04T14:30:00.000Z",
    scope: "followers",
  },
  {
    id: "u_3",
    businessId: "b_8",
    type: "product",
    text: "Fresh stems just landed from the growers in Oyo. Same-day bouquets back on — order before 2 PM for evening delivery.",
    createdAt: "2025-09-05T11:15:00.000Z",
    scope: "public",
  },
  {
    id: "u_4",
    businessId: "b_6",
    type: "news",
    text: "Friday reading night returns this week: Nnedi's new novel + small-chops. Free entry, 6 PM. Seats go fast.",
    createdAt: "2025-09-03T17:00:00.000Z",
    scope: "followers",
  },
  {
    id: "u_5",
    businessId: "b_3",
    type: "offer",
    text: "Student promo: 20% off all cuts with a valid ID, weekdays before noon. Walk-ins welcome.",
    createdAt: "2025-09-01T08:00:00.000Z",
    expiresAt: "2025-09-30T23:59:00.000Z",
    scope: "public",
  },
  {
    id: "u_6",
    businessId: "b_10",
    type: "event",
    text: "New prenatal series starts next week — six Thursday mornings, trimester-safe. Two spots left.",
    createdAt: "2025-09-02T12:00:00.000Z",
    scope: "followers",
  },
];

const DEFAULT_FOLLOWS: Follow[] = [
  { userId: "u_1", businessId: "b_2", followedAt: "2025-06-01T10:00:00.000Z" },
  { userId: "u_1", businessId: "b_6", followedAt: "2025-06-15T10:00:00.000Z" },
  { userId: "u_1", businessId: "b_10", followedAt: "2025-07-01T10:00:00.000Z" },
];

const NOTIFICATIONS: AppNotification[] = [  { id: "n_1", type: "booking", title: "Booking confirmed", message: "Your table at Nkwo Kitchen is confirmed for tonight at 7:00 PM.", time: "2 hours ago", read: false },
  { id: "n_2", type: "review", title: "Your review got a reply", message: "Ile Iyá Spa & Wellness replied to your review of the deep tissue massage.", time: "1 day ago", read: false },
  { id: "n_3", type: "promo", title: "Weekend offer", message: "Petals & Stems has same-day bouquets at 15% off until Sunday.", time: "2 days ago", read: true },
  { id: "n_4", type: "system", title: "Welcome to Finda", message: "Save your favourite spots and we'll keep you posted on their openings.", time: "1 week ago", read: true },
];

const PRODUCTS: Product[] = [
  { id: "p_1", businessId: "b_1", name: "Party Jollof Tray (Serves 25)", description: "Smoky firewood jollof, fried plantain, coleslaw.", price: "₦85,000", stock: 8, image: IMG("photo-1547592180-85f173990554", 600), soldOut: false },
  { id: "p_2", businessId: "b_1", name: "Ofada Rice & Ayamase", description: "Local rice, green pepper sauce, assorted meat.", price: "₦6,500", stock: null, image: IMG("photo-1512058564366-18510be2db19", 600), soldOut: false },
  { id: "p_3", businessId: "b_1", name: "Goat Pepper Soup", description: "Saturday special — sells out early.", price: "₦5,500", stock: 12, image: IMG("photo-1543353071-873f17a7a088", 600), soldOut: false },
  { id: "p_4", businessId: "b_2", name: "Taraba Single-Origin Beans (250g)", description: "Medium roast, notes of cocoa and citrus.", price: "₦9,000", stock: 24, image: IMG("photo-1559056199-641a0ac8b55e", 600), soldOut: false },
  { id: "p_5", businessId: "b_2", name: "Boli & Plantain Waffle Box", description: "Weekend brunch box for two.", price: "₦7,500", stock: 10, image: IMG("photo-1484723091739-30a097e8f929", 600), soldOut: false },
  { id: "p_6", businessId: "b_3", name: "Beard Oil — Shea & Black Seed", description: "House blend, 50ml.", price: "₦4,500", stock: 30, image: IMG("photo-1571781926291-c477ebfd024b", 600), soldOut: false },
  { id: "p_7", businessId: "b_6", name: "Signed Nigerian Fiction Bundle", description: "Three signed titles from Lagos authors.", price: "₦18,000", stock: 6, image: IMG("photo-1544947950-fa07a98d237f", 600), soldOut: false },
  { id: "p_8", businessId: "b_6", name: "Friday Reading Ticket", description: "Includes small-chops plate.", price: "₦5,000", stock: 40, image: IMG("photo-1476275466078-4007374efbbe", 600), soldOut: false },
  { id: "p_9", businessId: "b_8", name: "Same-Day Bouquet (Medium)", description: "Seasonal stems, wrapped with ribbon.", price: "₦35,000", stock: 15, image: IMG("photo-1508610048659-a06b669e3321", 600), soldOut: false },
  { id: "p_10", businessId: "b_10", name: "Yoga Mat (Studio Grade)", description: "6mm non-slip, carry strap included.", price: "₦22,000", stock: 9, image: IMG("photo-1592432678016-e910b452f9a2", 600), soldOut: false },
];

const ORDERS: Order[] = [
  {
    id: "o_1",
    userId: "u_1",
    businessId: "b_1",
    businessName: "Nkwo Kitchen",
    businessSlug: "nkwo-kitchen",
    businessWhatsapp: "2348012345678",
    items: [
      { productId: "p_2", name: "Ofada Rice & Ayamase", price: "₦6,500", priceValue: 6500, quantity: 2 },
      { productId: "p_1", name: "Party Jollof Tray (Serves 25)", price: "₦85,000", priceValue: 85000, quantity: 1 },
    ],
    subtotal: 98000,
    deliveryFee: 2000,
    total: 100000,
    fulfilment: "delivery",
    customerName: "Adaeze Nwosu",
    customerPhone: "0803 111 2222",
    customerEmail: "adaeze@finda.ng",
    address: "5 Fanibi Street, Yaba, Lagos",
    note: "Extra ayamase on the side, please.",
    payment: "paid",
    status: "confirmed",
    createdAt: "2025-09-04T11:30:00.000Z",
  },
  {
    id: "o_2",
    userId: "u_1",
    businessId: "b_2",
    businessName: "Kofe Haus",
    businessSlug: "kofe-haus",
    businessWhatsapp: "2348023456789",
    items: [
      { productId: "p_4", name: "Taraba Single-Origin Beans (250g)", price: "₦9,000", priceValue: 9000, quantity: 1 },
    ],
    subtotal: 9000,
    deliveryFee: 0,
    total: 9000,
    fulfilment: "pickup",
    customerName: "Adaeze Nwosu",
    customerPhone: "0803 111 2222",
    customerEmail: "adaeze@finda.ng",
    payment: "on_pickup",
    status: "ready",
    createdAt: "2025-09-05T09:12:00.000Z",
  },
  {
    id: "o_3",
    userId: "u_1",
    businessId: "b_6",
    businessName: "Bookshelf Corner",
    businessSlug: "bookshelf-corner",
    businessWhatsapp: "2348067890123",
    items: [
      { productId: "p_8", name: "Friday Reading Ticket", price: "₦5,000", priceValue: 5000, quantity: 2 },
    ],
    subtotal: 10000,
    deliveryFee: 0,
    total: 10000,
    fulfilment: "pickup",
    customerName: "Adaeze Nwosu",
    customerPhone: "0803 111 2222",
    customerEmail: "adaeze@finda.ng",
    payment: "paid",
    status: "completed",
    createdAt: "2025-08-29T16:45:00.000Z",
  },
];

// ── Store ────────────────────────────────────────────────────

const STORAGE_KEY = "finda_store_v1";
const CART_KEY = "finda_cart_v1";

interface StoreShape {
  bookings: Booking[];
  favorites: Favorite[];
  notifications: AppNotification[];
  pendingBusinesses: Business[];
  reviews: Review[];
  products: Product[];
  orders: Order[];
  updates: BusinessUpdate[];
  follows: Follow[];
}

function defaultStore(): StoreShape {
  return {
    bookings: BOOKINGS,
    favorites: FAVORITES,
    notifications: NOTIFICATIONS,
    pendingBusinesses: [],
    reviews: REVIEWS,
    products: PRODUCTS,
    orders: ORDERS,
    updates: UPDATES,
    follows: DEFAULT_FOLLOWS,
  };
}

function load(): StoreShape {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    return { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    return defaultStore();
  }
}

function save(store: StoreShape) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage unavailable — session-only mode
  }
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

// ── Public API ───────────────────────────────────────────────

export const currentUser = CURRENT_USER;

export function getBusinesses(): Business[] {
  return BUSINESSES;
}

export function getApprovedBusinesses(): Business[] {
  const submitted = getPendingBusinesses().filter((b) => b.status === "approved");
  return [...BUSINESSES.filter((b) => b.status === "approved"), ...submitted];
}

export function getPendingBusinesses(): Business[] {
  return load().pendingBusinesses.filter((b) => b.status === "pending");
}

export function getBusinessById(id: string): Business | undefined {
  // Search all submitted businesses (any status) first, then the seeds.
  return (
    load().pendingBusinesses.find((b) => b.id === id) ||
    BUSINESSES.find((b) => b.id === id)
  );
}

export function getReviewsForBusiness(businessId: string): Review[] {
  return load().reviews.filter((r) => r.businessId === businessId);
}

/**
 * Adds or updates the signed-in user's review of a business.
 * One honest review per person — editing replaces their text/rating.
 * The verified-visit badge comes from real completed bookings.
 */
export function addReview(businessId: string, rating: number, text: string): Review {
  const session = getSession();
  const author = session
    ? `${session.firstName} ${session.lastName}`
    : `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`;
  const initials = author
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const store = load();
  const existing = store.reviews.find(
    (r) => r.businessId === businessId && r.author === author
  );
  if (existing) {
    existing.rating = rating;
    existing.text = text;
    existing.date = new Date().toISOString().slice(0, 10);
    existing.verifiedVisit = hasCompletedBooking(businessId);
    save(store);
    emit();
    return existing;
  }
  const review: Review = {
    id: `r_${Date.now()}`,
    businessId,
    author,
    initials,
    rating,
    text,
    date: new Date().toISOString().slice(0, 10),
    verifiedVisit: hasCompletedBooking(businessId),
  };
  store.reviews.unshift(review);
  save(store);
  emit();
  return review;
}

/** Owner's public reply to a review. */
export function replyToReview(reviewId: string, text: string) {
  const store = load();
  const review = store.reviews.find((r) => r.id === reviewId);
  if (!review || !text.trim()) return;
  review.reply = { text: text.trim(), date: new Date().toISOString().slice(0, 10) };
  save(store);
  emit();
}

export function getBookings(): Booking[] {
  return load().bookings;
}

export function addBooking(input: {
  businessId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const business = getBusinessById(input.businessId);
  if (!business) return;
  const store = load();
  store.bookings.unshift({
    id: `bk_${Date.now()}`,
    userId: CURRENT_USER.id,
    businessId: business.id,
    businessName: business.name,
    businessImage: business.image,
    serviceName: input.serviceName,
    date: input.date,
    time: input.time,
    status: "pending",
    price:
      business.services.find((s) => s.name === input.serviceName)?.price ??
      "—",
    address: `${business.address}, ${business.neighborhood}`,
    notes: input.notes,
  });
  save(store);
  emit();
}

export function cancelBooking(id: string) {
  const store = load();
  const booking = store.bookings.find((b) => b.id === id);
  if (booking && booking.status === "pending") {
    booking.status = "cancelled";
    save(store);
    emit();
  }
}

export function confirmBooking(id: string) {
  const store = load();
  const booking = store.bookings.find((b) => b.id === id);
  if (booking && booking.status === "pending") {
    booking.status = "confirmed";
    save(store);
    emit();
  }
}

export function completeBooking(id: string) {
  const store = load();
  const booking = store.bookings.find((b) => b.id === id);
  if (booking && booking.status === "confirmed") {
    booking.status = "completed";
    save(store);
    emit();
  }
}

export function getFavorites(): string[] {
  return load()
    .favorites.filter((f) => f.userId === CURRENT_USER.id)
    .map((f) => f.businessId);
}

export function toggleFavorite(businessId: string) {
  const store = load();
  const existing = store.favorites.find(
    (f) => f.userId === CURRENT_USER.id && f.businessId === businessId
  );
  if (existing) {
    store.favorites = store.favorites.filter((f) => f !== existing);
  } else {
    store.favorites.push({ userId: CURRENT_USER.id, businessId });
  }
  save(store);
  emit();
}

export function getFavoriteBusinesses(): Business[] {
  const ids = new Set(getFavorites());
  return BUSINESSES.filter((b) => ids.has(b.id));
}

export function getNotifications(): AppNotification[] {
  return load().notifications;
}

/** Live in-app notification: used by checkout, bookings, and console actions. */
export function pushNotification(input: {
  type: AppNotification["type"];
  title: string;
  message: string;
}) {
  const store = load();
  store.notifications.unshift({
    id: `n_${Date.now()}`,
    type: input.type,
    title: input.title,
    message: input.message,
    time: "just now",
    read: false,
  });
  save(store);
  emit();
}

export function markAllNotificationsRead() {
  const store = load();
  store.notifications = store.notifications.map((n) => ({ ...n, read: true }));
  save(store);
  emit();
}

export function submitBusiness(input: {
  name: string;
  description: string;
  category: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  services: { name: string; price: string; duration: string; description: string }[];
  products: { name: string; description?: string; price: string; stock: number | null; image?: string }[];
}) {
  const store = load();
  const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const id = `b_${Date.now()}`;
  store.pendingBusinesses.push({
    id,
    slug,
    name: input.name,
    category: input.category,
    description: input.description,
    address: input.address,
    neighborhood: input.neighborhood || "Lagos",
    phone: input.phone,
    whatsapp: input.phone.replace(/\D/g, ""),
    email: input.email,
    website: "",
    rating: 0,
    reviewCount: 0,
    verified: false,
    priceLevel: 2,
    image: IMG("photo-1441986300917-64674bd600d8", 900),
    gallery: [],
    tags: [],
    hours: hoursDefault(),
    services: input.services,
    isOpen: false,
    lat: 6.5244,
    lng: 3.3792,
    status: "pending",
    createdAt: new Date().toISOString().slice(0, 10),
  });
  // Attach submitted products so admin can review them
  for (const p of input.products) {
    store.products.push({
      id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      businessId: id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      image: p.image,
      soldOut: false,
    });
  }
  save(store);
  emit();
  return id;
}

export function approveBusiness(id: string) {
  const store = load();
  const idx = store.pendingBusinesses.findIndex((b) => b.id === id);
  if (idx >= 0) {
    const [approved] = store.pendingBusinesses.splice(idx, 1);
    approved.status = "approved";
    // Keep the approved business queryable in this browser session.
    store.pendingBusinesses.push(approved);
    save(store);
    emit();
  }
}

export function rejectBusiness(id: string) {
  const store = load();
  store.pendingBusinesses = store.pendingBusinesses.filter((b) => b.id !== id);
  save(store);
  emit();
}

// Merge approved demo submissions into the search list for the session
export function getAllVisibleBusinesses(): Business[] {
  return getApprovedBusinesses();
}

export function getBusinessBySlug(slug: string): Business | undefined {
  const s = slug.toLowerCase();
  return (
    load().pendingBusinesses.find((b) => b.slug === s) ||
    BUSINESSES.find((b) => b.slug === s)
  );
}

// ── Cart (single-business, localStorage-backed) ──────────────

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable — session-only mode
  }
  emit();
}

/** Adds a product to the cart, clamping to stock. Single-business carts. */
export function addToCart(product: Product, business: Business, quantity = 1) {
  const cart = getCart();
  if (cart.length > 0 && cart[0].businessId !== business.id) {
    // Starting a new store's cart replaces the old one.
    const replaced = cart[0].businessId;
    const prev = getBusinessById(replaced);
    if (prev && prev.id !== business.id) {
      // intentional replacement — single-business carts keep checkout simple
    }
  }
  const max = product.stock === null ? 99 : product.stock;
  const existing = cart.find((c) => c.productId === product.id);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, max);
  } else {
    cart.push({
      productId: product.id,
      businessId: business.id,
      name: product.name,
      price: product.price,
      priceValue: parsePrice(product.price),
      quantity: Math.min(quantity, max),
      stock: product.stock,
    });
  }
  saveCart(cart);
}

export function setCartQuantity(productId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((c) => c.productId === productId);
  if (!item) return;
  const max = item.stock === null ? 99 : item.stock;
  const next = Math.min(Math.max(1, quantity), max);
  item.quantity = next;
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  saveCart(getCart().filter((c) => c.productId !== productId));
}

export function clearCart() {
  saveCart([]);
}

export function getCartBusiness(): Business | undefined {
  const cart = getCart();
  if (cart.length === 0) return undefined;
  return getBusinessById(cart[0].businessId);
}

// ── Orders ──────────────────────────────────────────────────

export function placeOrder(input: {
  fulfilment: "pickup" | "delivery";
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address?: string;
  note?: string;
  payment: "paid" | "on_pickup";
}): Order {
  const cart = getCart();
  const business = getCartBusiness();
  if (cart.length === 0 || !business) {
    throw new Error("Cart is empty");
  }
  const items: OrderItem[] = cart.map((c) => ({
    productId: c.productId,
    name: c.name,
    price: c.price,
    priceValue: c.priceValue,
    quantity: c.quantity,
  }));
  const subtotal = items.reduce((sum, i) => sum + i.priceValue * i.quantity, 0);
  const deliveryFee = input.fulfilment === "delivery" ? DELIVERY_FEE_NGN : 0;
  const session = getSession();
  const order: Order = {
    id: `o_${Date.now()}`,
    userId: session?.id ?? "guest",
    businessId: business.id,
    businessName: business.name,
    businessSlug: business.slug,
    businessWhatsapp: business.whatsapp,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    fulfilment: input.fulfilment,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerEmail: input.customerEmail,
    address: input.address,
    note: input.note,
    payment: input.payment,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const store = load();
  store.orders.unshift(order);
  // Decrement stock
  for (const item of items) {
    const p = store.products.find((p) => p.id === item.productId);
    if (p && p.stock !== null) {
      p.stock = Math.max(0, p.stock - item.quantity);
      if (p.stock <= 0) p.soldOut = true;
    }
  }
  // Live in-app notification for the buyer
  store.notifications.unshift({
    id: `n_${Date.now()}`,
    type: "booking",
    title: "Order placed",
    message: `Your order with ${business.name} (${naira(order.total)}) is in — track it under My orders.`,
    time: "just now",
    read: false,
  });
  save(store);
  clearCart();
  return order;
}

export function getOrders(): Order[] {
  return load().orders;
}

export function getOrdersForBusiness(businessId: string): Order[] {
  return load().orders.filter((o) => o.businessId === businessId);
}

export function getOrderById(id: string): Order | undefined {
  return load().orders.find((o) => o.id === id);
}

export function setOrderStatus(id: string, status: Order["status"]) {
  const store = load();
  const order = store.orders.find((o) => o.id === id);
  if (!order) return;
  // Restock when an owner cancels a pending/confirmed order.
  if (status === "cancelled" && (order.status === "pending" || order.status === "confirmed")) {
    for (const item of order.items) {
      const p = store.products.find((p) => p.id === item.productId);
      if (p && p.stock !== null) {
        p.stock += item.quantity;
        p.soldOut = false;
      }
    }
  }
  order.status = status;
  // Live in-app notification for the buyer on lifecycle changes
  const titles: Record<Order["status"], string> = {
    pending: "Order pending",
    confirmed: "Order confirmed",
    ready: "Order ready",
    completed: "Order completed",
    cancelled: "Order cancelled",
  };
  store.notifications.unshift({
    id: `n_${Date.now()}_o`,
    type: "booking",
    title: titles[status],
    message: `${order.businessName}: order #${order.id.slice(-6).toUpperCase()} is now ${status}.`,
    time: "just now",
    read: false,
  });
  save(store);
  emit();
}

export function markOrderPaid(id: string) {
  const store = load();
  const order = store.orders.find((o) => o.id === id);
  if (order && order.payment === "unpaid") {
    order.payment = "paid";
    save(store);
    emit();
  }
}

// ── Products ─────────────────────────────────────────────────

export function getProductsForBusiness(businessId: string): Product[] {
  return load().products.filter((p) => p.businessId === businessId);
}

export function addProduct(input: {
  businessId: string;
  name: string;
  description?: string;
  price: string;
  stock: number | null;
  image?: string;
}) {
  const store = load();
  store.products.push({
    id: `p_${Date.now()}`,
    businessId: input.businessId,
    name: input.name,
    description: input.description,
    price: input.price,
    stock: input.stock,
    image: input.image,
    soldOut: false,
  });
  save(store);
  emit();
}

export function updateProductStock(productId: string, stock: number | null) {
  const store = load();
  const p = store.products.find((p) => p.id === productId);
  if (p) {
    p.stock = stock;
    if (stock !== null) p.soldOut = stock <= 0;
    save(store);
    emit();
  }
}

export function toggleProductSoldOut(productId: string) {
  const store = load();
  const p = store.products.find((p) => p.id === productId);
  if (p) {
    p.soldOut = !p.soldOut;
    save(store);
    emit();
  }
}

// ── Session (demo) ──────────────────────────────────────────

const SESSION_KEY = "finda_session_v1";

const DEMO_SESSIONS: Record<string, SessionUser> = {
  user: {
    id: "u_1",
    firstName: "Adaeze",
    lastName: "Nwosu",
    email: "adaeze@finda.ng",
    role: "user",
  },
  business: {
    id: "u_biz",
    firstName: "Ifeanyi",
    lastName: "Okafor",
    email: "ifeanyi@nkwokitchen.ng",
    role: "business",
    ownedBusinessId: "b_1",
  },
  admin: {
    id: "u_admin",
    firstName: "Ngozi",
    lastName: "Adeleke",
    email: "ngozi@finda.ng",
    role: "admin",
  },
};

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Demo sign-in. Without options, the email determines the role:
 * contains "owner"/"biz" → business owner (Nkwo Kitchen);
 * contains "admin" → platform admin; anything else → neighborhood user.
 * Options let the signup flows create a session that matches the
 * person who just signed up (their name, their new business).
 * Live mode: replaced by supabase.auth.signInWithPassword().
 */
export function signIn(
  email: string,
  opts?: { ownedBusinessId?: string; firstName?: string; lastName?: string }
): SessionUser {
  const lower = email.toLowerCase();
  let session: SessionUser;
  if (opts?.ownedBusinessId) {
    const base = DEMO_SESSIONS.business;
    session = {
      ...base,
      id: `u_${opts.ownedBusinessId}`,
      firstName: opts.firstName || "Owner",
      lastName: opts.lastName || base.lastName,
      email,
      ownedBusinessId: opts.ownedBusinessId,
    };
  } else if (opts?.firstName) {
    const base = DEMO_SESSIONS.user;
    session = {
      ...base,
      id: `u_${Date.now()}`,
      firstName: opts.firstName,
      lastName: opts.lastName || base.lastName,
      email,
    };
  } else {
    session =
      lower.includes("owner") || lower.includes("biz") || lower.includes("business")
        ? DEMO_SESSIONS.business
        : lower.includes("admin")
        ? DEMO_SESSIONS.admin
        : DEMO_SESSIONS.user;
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  emit();
  return session;
}

export function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(SESSION_KEY);
  }
  emit();
}

export function updateSessionProfile(input: { firstName: string; lastName: string }) {
  const session = getSession();
  if (!session) return;
  const updated = { ...session, firstName: input.firstName, lastName: input.lastName };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  }
  emit();
}
