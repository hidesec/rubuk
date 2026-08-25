import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

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
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, city, interest } = await request.json();
    const db = getDb();
    const { data, error } = await db.from("registrations").insert({ name, email, city: city || "Jakarta", interest: interest || "" }).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, registration: data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
