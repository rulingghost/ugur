import { formatOrderMessage, type OrderPayload } from "@/lib/orders";
import { saveOrderToSheet } from "@/lib/order-store";
import { sendOrderEmail } from "@/lib/notify-email";

export const runtime = "nodejs";

function isValidPayload(body: unknown): body is OrderPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Partial<OrderPayload>;
  return (
    (data.type === "order" || data.type === "lead") &&
    typeof data.orderNumber === "string" &&
    typeof data.customer?.fullName === "string" &&
    data.customer.fullName.trim().length > 0 &&
    typeof data.customer.phone === "string" &&
    data.customer.phone.trim().length > 0 &&
    Array.isArray(data.items)
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return Response.json(
      { ok: false, error: "Ad soyad ve telefon zorunludur" },
      { status: 400 }
    );
  }

  const message = formatOrderMessage(body);

  const results = await Promise.allSettled([
    sendOrderEmail(body, message),
    saveOrderToSheet(body, message),
  ]);

  const delivered = results.some(
    (result) => result.status === "fulfilled" && result.value === true
  );

  if (!delivered) {
    return Response.json(
      {
        ok: false,
        error:
          "Sipariş e-postası gönderilemedi. 05316005047@icloud.com adresini kontrol edin.",
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, orderNumber: body.orderNumber });
}
