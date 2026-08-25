import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) return NextResponse.json({ ok: false, user: null });

    const db = getDb();
    const { data } = await db.from("users").select("id, name, email, role, city, favorite").eq("id", currentUser.userId).single();
    return NextResponse.json({ ok: true, user: data || null });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
