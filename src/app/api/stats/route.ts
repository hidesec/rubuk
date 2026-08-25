import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const { count: members } = await db
      .from("users")
      .select("id", { count: "exact", head: true })
      .in("role", ["owner", "users"]);

    const { count: books } = await db
      .from("books")
      .select("id", { count: "exact", head: true });

    const { count: discussions } = await db
      .from("discussions")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      stats: {
        members: members || 0,
        books: books || 0,
        discussions: discussions || 0,
      },
    });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
