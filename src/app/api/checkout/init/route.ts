import { NextResponse } from "next/server";
import { paymentService, isPaymentsLive } from "@/services/payment";

/**
 * POST /api/checkout/init
 * Initializes a Flutterwave payment for an order. The secret key never
 * leaves the server. The client sends its computed total; production
 * hardening should recompute server-side from the database.
 *
 * Demo mode (no FLUTTERWAVE_SECRET_KEY): returns mode "demo" so the
 * client completes locally — no network call, no keys needed.
 */
export async function POST(request: Request) {
  if (!isPaymentsLive()) {
    return NextResponse.json({
      mode: "demo",
      message: "Payments run in demo mode until FLUTTERWAVE_SECRET_KEY is set.",
    });
  }

  try {
    const body = await request.json();
    const { amount, email, name, phone, description, orderId } = body as {
      amount: number;
      email?: string;
      name?: string;
      phone?: string;
      description: string;
      orderId: string;
    };

    if (!amount || !orderId) {
      return NextResponse.json({ error: "amount and orderId are required" }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const txRef = `finda_${orderId}_${Date.now()}`;
    const init = await paymentService.initializePayment({
      txRef,
      amount,
      email: email || "guest@finda.ng",
      name,
      phone,
      description,
      redirectUrl: `${origin}/checkout/success?order=${encodeURIComponent(orderId)}&tx_ref=${encodeURIComponent(txRef)}`,
      meta: { orderId },
    });

    if (!init.success || !init.checkoutUrl) {
      return NextResponse.json(
        { error: init.error ?? "Payment initialization failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ mode: "redirect", checkoutUrl: init.checkoutUrl, txRef });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout init failed" },
      { status: 500 }
    );
  }
}
