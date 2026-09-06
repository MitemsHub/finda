import { NextResponse } from "next/server";
import { getBusinesses } from "@/lib/data/demo";

/**
 * GET /api/businesses?q=term
 * Public, read-only feed of approved businesses for the mobile app.
 * Search matches name, category, neighborhood, and tags.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();

  const all = getBusinesses().filter((b) => b.status === "approved");

  const businesses = q
    ? all.filter((b) =>
        [b.name, b.category, b.neighborhood, b.description, ...b.tags]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : all;

  return NextResponse.json({
    count: businesses.length,
    businesses: businesses.map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      category: b.category,
      description: b.description,
      neighborhood: b.neighborhood,
      address: b.address,
      phone: b.phone,
      whatsapp: b.whatsapp,
      rating: b.rating,
      reviewCount: b.reviewCount,
      verified: b.verified,
      priceLevel: b.priceLevel,
      image: b.image,
      tags: b.tags,
      isOpen: b.isOpen,
      lat: b.lat,
      lng: b.lng,
    })),
  });
}
