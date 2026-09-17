import { NextResponse } from "next/server";
import {
  createAdminToken,
  getAdminCookieName,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "Vercel'de ADMIN_PASSWORD tanımlayın." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password || "";
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Şifre hatalı" }, { status: 401 });
  }

  const token = createAdminToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), token || "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
