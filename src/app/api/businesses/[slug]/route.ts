import { NextResponse } from "next/server";
import { getBusinessBySlug, getReviewsForBusiness, getProductsForBusiness } from "@/lib/data/demo";

/**
 * GET /api/businesses/[slug]
 * Full public detail for one business: services, storefront products,
 * and reviews. Powers the mobile business screen.
 */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const business = getBusinessBySlug(params.slug);
  if (!business || business.status !== "approved") {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const products = getProductsForBusiness(business.id).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? "",
    price: p.price,
    stock: p.stock,
    image: p.image ?? "",
    soldOut: p.soldOut,
  }));

  const reviews = getReviewsForBusiness(business.id).map((r) => ({
    id: r.id,
    author: r.author,
    rating: r.rating,
    text: r.text,
    date: r.date,
    verifiedVisit: Boolean(r.verifiedVisit),
    reply: r.reply?.text ?? null,
  }));

  return NextResponse.json({
    business: {
      id: business.id,
      slug: business.slug,
      name: business.name,
      category: business.category,
      description: business.description,
      neighborhood: business.neighborhood,
      address: business.address,
      phone: business.phone,
      whatsapp: business.whatsapp,
      email: business.email,
      website: business.website,
      rating: business.rating,
      reviewCount: business.reviewCount,
      verified: business.verified,
      priceLevel: business.priceLevel,
      image: business.image,
      gallery: business.gallery,
      tags: business.tags,
      hours: business.hours,
      services: business.services,
      isOpen: business.isOpen,
      lat: business.lat,
      lng: business.lng,
    },
    products,
    reviews,
  });
}
