import type { OrderPayload } from "@/lib/orders";

export interface StoredOrder {
  tarih: string;
  siparisNo: string;
  tur: string;
  adSoyad: string;
  telefon: string;
  email: string;
  konum: string;
  adres: string;
  odeme: string;
  tutar: string;
  urunler: string;
  not: string;
}

function sheetEndpoint() {
  const url = process.env.ORDER_WEBHOOK_URL;
  const secret = process.env.ORDER_WEBHOOK_SECRET || "";
  if (!url) return null;
  return { url, secret };
}

export function isSheetConfigured() {
  return Boolean(process.env.ORDER_WEBHOOK_URL);
}

export function payloadToStoredOrder(payload: OrderPayload): StoredOrder {
  return {
    tarih: new Date().toLocaleString("tr-TR"),
    siparisNo: payload.orderNumber,
    tur: payload.type === "lead" ? "Teklif" : "Sipariş",
    adSoyad: payload.customer.fullName,
    telefon: payload.customer.phone,
    email: payload.customer.email || "",
    konum: [payload.customer.city, payload.customer.district].filter(Boolean).join(" / "),
    adres: payload.customer.address || "",
    odeme: payload.paymentMethod || "",
    tutar:
      typeof payload.total === "number" ? `${payload.total.toLocaleString("tr-TR")} ₺` : "",
    urunler: payload.items
      .map((item) => {
        const qty = item.quantity && item.quantity > 1 ? ` x${item.quantity}` : "";
        const details = item.details ? ` (${item.details})` : "";
        return `${item.name}${qty}${details}`;
      })
      .join(" | "),
    not: payload.note || "",
  };
}

export async function saveOrderToSheet(
  payload: OrderPayload,
  message: string
): Promise<boolean> {
  const endpoint = sheetEndpoint();
  if (!endpoint) return false;

  const order = payloadToStoredOrder(payload);
  const response = await fetch(endpoint.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({
      secret: endpoint.secret,
      ...payload,
      ...order,
      message,
    }),
  });

  return response.ok;
}

export async function listOrdersFromSheet(): Promise<{
  configured: boolean;
  orders: StoredOrder[];
  error?: string;
}> {
  const endpoint = sheetEndpoint();
  if (!endpoint) {
    return { configured: false, orders: [] };
  }

  const separator = endpoint.url.includes("?") ? "&" : "?";
  const response = await fetch(
    `${endpoint.url}${separator}secret=${encodeURIComponent(endpoint.secret)}`,
    { method: "GET", cache: "no-store", redirect: "follow" }
  );

  if (!response.ok) {
    return {
      configured: true,
      orders: [],
      error:
        "Google Sheet okunamadı. Script'i 'Herkes' erişimiyle web uygulaması olarak yayınladığınızdan emin olun.",
    };
  }

  const data = (await response.json().catch(() => null)) as
    | { ok?: boolean; orders?: StoredOrder[]; error?: string }
    | StoredOrder[]
    | null;

  if (Array.isArray(data)) {
    return { configured: true, orders: data };
  }

  if (data && Array.isArray(data.orders)) {
    return { configured: true, orders: data.orders };
  }

  return {
    configured: true,
    orders: [],
    error: data && "error" in data && data.error ? data.error : "Google Sheet yanıtı okunamadı.",
  };
}
