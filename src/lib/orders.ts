export type OrderKind = "order" | "lead";

export interface OrderItemPayload {
  name: string;
  details?: string;
  quantity?: number;
  total?: number;
}

export interface OrderPayload {
  type: OrderKind;
  orderNumber: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city?: string;
    district?: string;
    address?: string;
    invoiceType?: string;
    companyName?: string;
    taxOffice?: string;
    taxNumber?: string;
  };
  items: OrderItemPayload[];
  paymentMethod?: string;
  total?: number;
  note?: string;
}

export function generateOrderNumber(prefix = "MB"): string {
  return `${prefix}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function formatOrderMessage(payload: OrderPayload): string {
  const kindLabel = payload.type === "lead" ? "TEKLİF TALEBİ" : "YENİ SİPARİŞ";
  const lines = [
    `MARBAR ${kindLabel}`,
    `No: ${payload.orderNumber}`,
    "",
    `Ad Soyad: ${payload.customer.fullName}`,
    `Telefon: ${payload.customer.phone}`,
  ];

  if (payload.customer.email) lines.push(`E-posta: ${payload.customer.email}`);

  const location = [payload.customer.city, payload.customer.district]
    .filter(Boolean)
    .join(" / ");
  if (location) lines.push(`İl / İlçe: ${location}`);
  if (payload.customer.address) lines.push(`Adres: ${payload.customer.address}`);

  if (payload.customer.invoiceType === "corporate") {
    lines.push(`Fatura: Kurumsal`);
    if (payload.customer.companyName) lines.push(`Unvan: ${payload.customer.companyName}`);
    if (payload.customer.taxOffice) lines.push(`Vergi Dairesi: ${payload.customer.taxOffice}`);
    if (payload.customer.taxNumber) lines.push(`VKN: ${payload.customer.taxNumber}`);
  }

  if (payload.paymentMethod) lines.push(`Ödeme: ${payload.paymentMethod}`);
  if (typeof payload.total === "number") {
    lines.push(`Tutar: ${payload.total.toLocaleString("tr-TR")} ₺`);
  }

  if (payload.items.length > 0) {
    lines.push("", "Ürünler:");
    payload.items.forEach((item, index) => {
      const qty = item.quantity && item.quantity > 1 ? ` x${item.quantity}` : "";
      const money =
        typeof item.total === "number" ? ` — ${item.total.toLocaleString("tr-TR")} ₺` : "";
      const details = item.details ? ` (${item.details})` : "";
      lines.push(`${index + 1}. ${item.name}${qty}${details}${money}`);
    });
  }

  if (payload.note) {
    lines.push("", `Not: ${payload.note}`);
  }

  lines.push("", `Saat: ${new Date().toLocaleString("tr-TR")}`);
  return lines.join("\n");
}

export async function submitSiteOrder(payload: OrderPayload): Promise<{
  ok: boolean;
  orderNumber: string;
  error?: string;
}> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    orderNumber?: string;
    error?: string;
  };

  if (!response.ok || !data.ok) {
    return {
      ok: false,
      orderNumber: payload.orderNumber,
      error: data.error || "Sipariş iletilemedi",
    };
  }

  return { ok: true, orderNumber: data.orderNumber || payload.orderNumber };
}
