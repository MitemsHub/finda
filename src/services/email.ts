// ─────────────────────────────────────────────────────────────
// finda email — transactional notifications via Resend
//
// Demo mode (no RESEND_API_KEY): sends are logged, UI flows work.
// Live mode: set RESEND_API_KEY and EMAIL_FROM (e.g. "Finda <hello@finda.ng>")
// and sends go through Resend's REST API — one fetch, no SDK needed.
//
//   POST https://api.resend.com/emails
//   Authorization: Bearer RESEND_API_KEY
//   { from, to, subject, html }
// ─────────────────────────────────────────────────────────────

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface EmailProvider {
  send(input: SendEmailInput): Promise<{ success: boolean; id?: string; error?: string }>;
}

const isLive = () => !!process.env.RESEND_API_KEY;

/** Demo provider — logs instead of sending. */
class DemoEmailService implements EmailProvider {
  async send(input: SendEmailInput) {
    if (typeof console !== "undefined") {
      console.log("[email:demo]", input.to, "—", input.subject);
    }
    return { success: true, id: `demo_${Date.now()}` };
  }
}

/** Live provider — Resend REST API (server-side only). */
class ResendEmailService implements EmailProvider {
  async send(input: SendEmailInput) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM ?? "Finda <onboarding@resend.dev>",
          to: [input.to],
          subject: input.subject,
          html: input.html,
          ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        }),
      });
      const data = await res.json();
      if (res.ok && data?.id) return { success: true, id: data.id as string };
      return { success: false, error: data?.message ?? "Resend send failed" };
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : "Network error" };
    }
  }
}

export const emailService: EmailProvider = isLive()
  ? new ResendEmailService()
  : new DemoEmailService();

export const isEmailLive = isLive;

// ── Brand template helpers ──────────────────────────────────

function layout(title: string, bodyHtml: string, cta?: { label: string; url: string }) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#F7F5F0;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:0 auto;padding:32px 20px;">
    <div style="background:#1F5C45;border-radius:16px 16px 0 0;padding:20px 28px;">
      <span style="color:#FFFFFF;font-size:22px;font-weight:bold;">finda</span>
      <span style="color:#EFA23B;font-size:12px;margin-left:8px;">· trusted local</span>
    </div>
    <div style="background:#FFFFFF;border-radius:0 0 16px 16px;padding:28px;border:1px solid #E5E0D4;border-top:none;">
      <h1 style="color:#1C1A15;font-size:20px;margin:0 0 12px;">${title}</h1>
      <div style="color:#3D3A31;font-size:14px;line-height:1.6;">${bodyHtml}</div>
      ${
        cta
          ? `<a href="${cta.url}" style="display:inline-block;margin-top:20px;background:#1F5C45;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:12px;font-size:14px;">${cta.label}</a>`
          : ""
      }
      <p style="color:#8B8677;font-size:12px;margin-top:28px;">
        You received this because of activity on Finda, the trusted way to find
        and shop local businesses in Lagos.
      </p>
    </div>
  </div>
</body></html>`;
}

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

// ── Notification emails ─────────────────────────────────────

export function orderConfirmationEmail(input: {
  orderId: string;
  customerName: string;
  businessName: string;
  items: { name: string; quantity: number; price: string }[];
  total: number;
  fulfilment: "pickup" | "delivery";
  storefrontUrl: string;
}) {
  const rows = input.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;color:#3D3A31;">${i.quantity}× ${i.name}</td><td style="padding:6px 0;text-align:right;color:#1C1A15;font-weight:bold;">${i.price}</td></tr>`
    )
    .join("");
  const subject = `Order confirmed — ${input.businessName} (${naira(input.total)})`;
  const html = layout(
    `Thank you, ${input.customerName}!`,
    `<p>Your order with <strong>${input.businessName}</strong> is in. Reference <strong>#${input.orderId.slice(-6).toUpperCase()}</strong>.</p>
     <table style="width:100%;border-collapse:collapse;margin:12px 0;">${rows}
     <tr><td style="padding:8px 0;border-top:1px solid #E5E0D4;color:#3D3A31;">${
       input.fulfilment === "delivery" ? "Lagos delivery" : "Pickup"
     }</td><td style="padding:8px 0;border-top:1px solid #E5E0D4;text-align:right;color:#1C1A15;font-weight:bold;">${naira(input.total)}</td></tr></table>
     <p>The business confirms shortly — updates arrive here and on Finda.</p>`,
    { label: "Track my order", url: input.storefrontUrl }
  );
  return { subject, html };
}

export function newOrderOwnerEmail(input: {
  orderId: string;
  businessName: string;
  customerName: string;
  total: number;
  consoleUrl: string;
}) {
  const subject = `New Finda order — ${naira(input.total)} from ${input.customerName}`;
  const html = layout(
    `Ka ọ dị! New order for ${input.businessName}.`,
    `<p><strong>${input.customerName}</strong> just placed order <strong>#${input.orderId.slice(-6).toUpperCase()}</strong> worth <strong>${naira(input.total)}</strong>.</p>
     <p>Confirm it in your dashboard so the customer knows you're on it.</p>`,
    { label: "Open my dashboard", url: input.consoleUrl }
  );
  return { subject, html };
}

export function bookingUpdateEmail(input: {
  customerName: string;
  businessName: string;
  serviceName: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "completed";
}) {
  const verdict =
    input.status === "confirmed"
      ? "is confirmed ✅"
      : input.status === "cancelled"
      ? "was cancelled"
      : "is complete — thank you!";
  const subject = `Booking ${input.status} — ${input.businessName}`;
  const html = layout(
    `Hi ${input.customerName},`,
    `<p>Your <strong>${input.serviceName}</strong> at <strong>${input.businessName}</strong> on <strong>${input.date}</strong> at <strong>${input.time}</strong> ${verdict}.</p>`,
    { label: "View my bookings", url: "https://finda.ng/bookings" }
  );
  return { subject, html };
}
