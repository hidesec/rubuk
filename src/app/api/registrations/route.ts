import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { validateEmail, validateString } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const { data: registrations, error } = await db.from("registrations").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, registrations });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, city, interest } = await request.json();

    const nameErr = validateString(name, "Nama", 100);
    if (nameErr) return NextResponse.json({ ok: false, error: nameErr }, { status: 400 });
    if (!email || !validateEmail(email)) return NextResponse.json({ ok: false, error: "Email tidak valid" }, { status: 400 });

    const db = getDb();
    const { data, error } = await db.from("registrations").insert({ name: name.trim(), email: email.trim().toLowerCase(), city: city || "Jakarta", interest: interest || "" }).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, registration: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
