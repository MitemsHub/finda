/**
 * finda API client.
 * Reads from the web platform's public API. Point EXPO_PUBLIC_FINDA_API
 * at a deployed finda instance; falls back to localhost for dev.
 */
const BASE = process.env.EXPO_PUBLIC_FINDA_API || "http://localhost:3000";

export interface ApiBusiness {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  neighborhood: string;
  address: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  priceLevel: 1 | 2 | 3;
  image: string;
  tags: string[];
  isOpen: boolean;
  lat: number;
  lng: number;
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number | null;
  image: string;
  soldOut: boolean;
}

export interface ApiReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verifiedVisit: boolean;
  reply: string | null;
}

export interface ApiBusinessDetail extends ApiBusiness {
  email: string;
  website: string;
  gallery: string[];
  hours: { day: string; open: string; close: string }[];
  services: { name: string; price: string; duration: string; description: string }[];
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`finda API ${res.status}`);
  return res.json();
}

export function fetchBusinesses(q?: string): Promise<{ count: number; businesses: ApiBusiness[] }> {
  return getJson(`/api/businesses${q ? `?q=${encodeURIComponent(q)}` : ""}`);
}

export function fetchBusiness(slug: string): Promise<{
  business: ApiBusinessDetail;
  products: ApiProduct[];
  reviews: ApiReview[];
}> {
  return getJson(`/api/businesses/${encodeURIComponent(slug)}`);
}

export function whatsappUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
