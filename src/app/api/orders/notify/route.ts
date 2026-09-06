import { NextResponse } from "next/server";
import {
  emailService,
  orderConfirmationEmail,
  newOrderOwnerEmail,
  bookingUpdateEmail,
} from "@/services/email";
import { isEmailLive } from "@/services/email";

/**
 * POST /api/notify
 * Sends transactional emails for order and booking events.
 * The client posts the event payload (order data lives in the browser's
 * demo store, so the server can't read it). In live mode with Supabase,
 * these sends move into database webhooks/edge functions instead.
 *
 * Demo mode (no RESEND_API_KEY): logs the email and returns success —
 * the UI flow is identical either way.
 */
type NotifyEvent =
  | {
      kind: "order_placed";
      orderId: string;
      customerName: string;
      customerEmail?: string;
      ownerEmail: string;
      businessName: string;
      items: { name: string; quantity: number; price: string }[];
      total: number;
      fulfilment: "pickup" | "delivery";
    }
  | {
      kind: "booking_update";
      customerName: string;
      customerEmail?: string;
      businessName: string;
      serviceName: string;
      date: string;
      time: string;
      status: "confirmed" | "cancelled" | "completed";
    };

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as NotifyEvent;
    const origin = new URL(request.url).origin;

    if (event.kind === "order_placed") {
      const results = await Promise.allSettled([
        event.customerEmail
          ? emailService.send({
              to: event.customerEmail,
              ...orderConfirmationEmail({
                orderId: event.orderId,
                customerName: event.customerName,
                businessName: event.businessName,
                items: event.items,
                total: event.total,
                fulfilment: event.fulfilment,
                storefrontUrl: `${origin}/orders/${event.orderId}`,
              }),
            })
          : Promise.resolve({ success: true }),
        emailService.send({
          to: event.ownerEmail,
          ...newOrderOwnerEmail({
            orderId: event.orderId,
            businessName: event.businessName,
            customerName: event.customerName,
            total: event.total,
            consoleUrl: `${origin}/business/dashboard`,
          }),
        }),
      ]);
      return NextResponse.json({
        mode: isEmailLive() ? "sent" : "demo",
        results: results.map((r) => (r.status === "fulfilled" ? r.value : { success: false })),
      });
    }

    if (event.kind === "booking_update") {
      const mail = bookingUpdateEmail({
        customerName: event.customerName,
        businessName: event.businessName,
        serviceName: event.serviceName,
        date: event.date,
        time: event.time,
        status: event.status,
      });
      const result = event.customerEmail
        ? await emailService.send({ to: event.customerEmail, ...mail })
        : { success: true };
      return NextResponse.json({ mode: isEmailLive() ? "sent" : "demo", result });
    }

    return NextResponse.json({ error: "Unknown event kind" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Notify failed" },
      { status: 500 }
    );
  }
}
