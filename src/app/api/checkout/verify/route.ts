import { NextResponse } from "next/server";
import { paymentService, isPaymentsLive } from "@/services/payment";

/**
 * GET /api/checkout/verify?tx_ref=...&order=...
 * Flutterwave redirects back here after payment. Verifies the transaction
 * server-side (never trust the redirect alone) before confirming.
 * Demo mode always verifies (nothing was actually charged).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const txRef = url.searchParams.get("tx_ref") ?? "";
  const orderId = url.searchParams.get("order") ?? "";

  if (!txRef || !orderId) {
    return NextResponse.json({ error: "tx_ref and order are required" }, { status: 400 });
  }

  if (!isPaymentsLive()) {
    // Demo mode: nothing was charged; verification passes.
    return NextResponse.redirect(new URL(`/orders/${orderId}?demo_paid=1`, url.origin));
  }

  const result = await paymentService.verifyPayment(txRef);
  if (result.success) {
    return NextResponse.redirect(new URL(`/orders/${orderId}?paid=1`, url.origin));
  }
  return NextResponse.redirect(new URL(`/orders/${orderId}?payment_failed=1`, url.origin));
}
