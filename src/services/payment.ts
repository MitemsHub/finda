// ─────────────────────────────────────────────────────────────
// finda payments — Flutterwave (Nigeria-first)
//
// Demo mode: transactions are simulated locally.
// Live mode: set FLUTTERWAVE_SECRET_KEY (and NEXT_PUBLIC_FLUTTERWAVE_PK
// for inline checkout) and the service switches to the real Flutterwave
// API. Standard flow for server-side initialization:
//
//   POST https://api.flutterwave.com/v3/payments
//   Authorization: Bearer FLUTTERWAVE_SECRET_KEY
//   {
//     "tx_ref": "finda-<bookingId>-<timestamp>",
//     "amount": 45000,
//     "currency": "NGN",
//     "redirect_url": "https://yourdomain.com/bookings?flw_callback=1",
//     "customer": { "email", "name", "phonenumber" },
//     "customizations": { "title": "Finda", "description": "<service>" }
//   }
//
// Verify every transaction server-side before fulfilling:
//   GET https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=<tx_ref>
// ─────────────────────────────────────────────────────────────

export interface InitializePaymentInput {
  txRef: string;
  amount: number; // whole Naira
  email: string;
  name?: string;
  phone?: string;
  description: string;
  redirectUrl?: string;
  meta?: Record<string, string | number>;
}

export interface PaymentResult {
  success: boolean;
  id: string;
  checkoutUrl?: string; // live mode: Flutterwave hosted checkout
  error?: string;
}

export interface PaymentProvider {
  initializePayment(input: InitializePaymentInput): Promise<PaymentResult>;
  verifyPayment(txRef: string): Promise<{ success: boolean; amount?: number; id?: string }>;
}

const isLive = () => !!process.env.FLUTTERWAVE_SECRET_KEY;

/** Demo provider — simulates Flutterwave without network calls. */
class DemoFlutterwaveService implements PaymentProvider {
  async initializePayment(input: InitializePaymentInput): Promise<PaymentResult> {
    // In demo mode we return a fake "checkout link" so UI flows can be
    // built end-to-end. Never call this path in production.
    return {
      success: true,
      id: `demo_${Date.now()}`,
      checkoutUrl: `/checkout/demo?ref=${encodeURIComponent(input.txRef)}&amount=${input.amount}`,
    };
  }

  async verifyPayment(txRef: string) {
    return { success: true, amount: undefined, id: `demo_${txRef}` };
  }
}

/** Live provider — real Flutterwave REST calls (server-side only). */
class LiveFlutterwaveService implements PaymentProvider {
  async initializePayment(input: InitializePaymentInput): Promise<PaymentResult> {
    try {
      const res = await fetch("https://api.flutterwave.com/v3/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref: input.txRef,
          amount: input.amount,
          currency: "NGN",
          redirect_url: input.redirectUrl,
          customer: {
            email: input.email,
            name: input.name,
            phonenumber: input.phone,
          },
          customizations: {
            title: "Finda",
            description: input.description,
          },
          meta: input.meta,
        }),
      });
      const data = await res.json();
      if (data?.status === "success" && data?.data?.link) {
        return { success: true, id: data.data.id ?? input.txRef, checkoutUrl: data.data.link };
      }
      return { success: false, id: "", error: data?.message ?? "Flutterwave init failed" };
    } catch (e) {
      return { success: false, id: "", error: e instanceof Error ? e.message : "Network error" };
    }
  }

  async verifyPayment(txRef: string) {
    try {
      const res = await fetch(
        `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`,
        { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
      );
      const data = await res.json();
      const ok = data?.status === "success" && data?.data?.status === "successful";
      return {
        success: ok,
        amount: ok ? data.data.amount : undefined,
        id: ok ? data.data.id : undefined,
      };
    } catch {
      return { success: false };
    }
  }
}

export const paymentService: PaymentProvider = isLive()
  ? new LiveFlutterwaveService()
  : new DemoFlutterwaveService();

export const isPaymentsLive = isLive;
