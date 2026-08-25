import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const { data: members, error } = await db
      .from("users")
      .select("id, name, city, role, favorite")
      .in("role", ["owner", "users"])
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, members });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
