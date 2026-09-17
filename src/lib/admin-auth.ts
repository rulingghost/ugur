import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "marbar_admin";

export function getAdminCookieName() {
  return COOKIE_NAME;
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function createAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return hashValue(`marbar-admin:${password}`);
}

export function isValidAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(hashValue(password));
  const b = Buffer.from(hashValue(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidAdminToken(token: string | undefined) {
  const expected = createAdminToken();
  if (!expected || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
