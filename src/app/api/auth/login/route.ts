import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword, createToken, hashPassword, isLegacyHash } from "@/lib/auth";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email dan password wajib diisi" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateKey = `${ip}:${email}`;
    if (!checkRateLimit(rateKey)) {
      return NextResponse.json({ ok: false, error: "Terlalu banyak percobaan. Coba lagi dalam 1 menit." }, { status: 429 });
    }

    const db = getDb();
    const { data, error } = await db.from("users").select("id, name, email, role, city, password").eq("email", email).single();
    if (error || !data) {
      return NextResponse.json({ ok: false, error: "Email atau password salah" }, { status: 401 });
    }

    if (!verifyPassword(password, data.password)) {
      return NextResponse.json({ ok: false, error: "Email atau password salah" }, { status: 401 });
    }

    if (isLegacyHash(data.password)) {
      await db.from("users").update({ password: hashPassword(password) }).eq("id", data.id);
    }

    const { password: _, ...userData } = data;
    const token = createToken(data.id, data.role);
    const response = NextResponse.json({ ok: true, user: userData });
    response.cookies.set("rubuk_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
