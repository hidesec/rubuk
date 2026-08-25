import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "rubuk-secret-key-change-in-production";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + SECRET).digest("hex");
}

export function createToken(userId: number, role: string): string {
  const payload = JSON.stringify({ userId, role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const signature = crypto.createHash("sha256").update(payload + SECRET).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifyToken(token: string): { userId: number; role: string } | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, "base64").toString();
    const expectedSig = crypto.createHash("sha256").update(payload + SECRET).digest("hex");
    if (signature !== expectedSig) return null;
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
  return match ? match[1] : null;
}

export function getCurrentUser(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
