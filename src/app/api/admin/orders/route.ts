import { NextResponse } from "next/server";
import { getAdminCookieName, isValidAdminToken } from "@/lib/admin-auth";
import { listOrdersFromSheet } from "@/lib/order-store";

export const runtime = "nodejs";

function tokenFromRequest(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${getAdminCookieName()}=([^;]+)`));
  return match?.[1];
}

export async function GET(request: Request) {
  if (!isValidAdminToken(tokenFromRequest(request))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const result = await listOrdersFromSheet();
  return NextResponse.json({ ok: true, ...result });
}
