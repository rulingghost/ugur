import { SITE_CONFIG } from "@/data/config";
import type { OrderPayload } from "@/lib/orders";

export function getOrderNotifyEmail() {
  return (
    process.env.ORDER_NOTIFY_EMAIL ||
    SITE_CONFIG.contact.orderNotifyEmail ||
    SITE_CONFIG.contact.email
  );
}

export async function sendOrderEmail(payload: OrderPayload, text: string): Promise<boolean> {
  const to = getOrderNotifyEmail();
  if (!to) return false;

  const subject = `MARBAR ${payload.type === "lead" ? "Teklif" : "Sipariş"} ${payload.orderNumber}`;

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    const web3Ok = await sendWithWeb3Forms(web3Key, to, subject, payload, text);
    if (web3Ok) return true;
  }

  return sendWithFormSubmit(to, subject, payload, text);
}

async function sendWithFormSubmit(
  to: string,
  subject: string,
  payload: OrderPayload,
  text: string
): Promise<boolean> {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.customer.fullName,
      _replyto: payload.customer.email || to,
      phone: payload.customer.phone,
      _subject: subject,
      message: text,
      _template: "table",
      _captcha: false,
    }),
  });

  if (!response.ok) return false;

  const data = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
  if (!data) return true;
  return data.success === true || data.success === "true";
}

async function sendWithWeb3Forms(
  accessKey: string,
  to: string,
  subject: string,
  payload: OrderPayload,
  text: string
): Promise<boolean> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      to,
      subject,
      from_name: "MARBAR Sipariş",
      name: payload.customer.fullName,
      email: payload.customer.email || to,
      phone: payload.customer.phone,
      message: text,
    }),
  });

  if (!response.ok) return false;
  const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return Boolean(data?.success);
}
