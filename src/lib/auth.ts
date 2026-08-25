import crypto from "crypto";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is required. Generate one with: openssl rand -hex 32");
  }
  return secret;
}

export function hashPassword(password: string): string {
  const secret = getSecret();
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password + secret, salt, 64);
  return salt + ":" + derived.toString("hex");
}

export function verifyPassword(password: string, stored: string): boolean {
  const secret = getSecret();
  if (stored.includes(":")) {
    const [salt, hash] = stored.split(":");
    const derived = crypto.scryptSync(password + secret, salt, 64);
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), derived);
  }
  const legacy = crypto.createHash("sha256").update(password + secret).digest("hex");
  if (legacy === stored) return true;
  const oldSecret = "rubuk-secret-key-change-in-production";
  const legacyOld = crypto.createHash("sha256").update(password + oldSecret).digest("hex");
  return legacyOld === stored;
}

export function isLegacyHash(stored: string): boolean {
  return !stored.includes(":");
}

export function createToken(userId: number, role: string): string {
  const secret = getSecret();
  const payload = JSON.stringify({ userId, role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifyToken(token: string): { userId: number; role: string } | null {
  try {
    const secret = getSecret();
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, "base64").toString();
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSig = hmac.digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSig, "hex"))) return null;
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;
    return { userId: data.userId, role: data.role };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/rubuk_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCurrentUser(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
