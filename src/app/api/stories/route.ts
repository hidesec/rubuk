import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const db = getDb();
    const { data: stories, error } = await db
      .from("stories")
      .select("*, users(name, city)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, stories });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { title, content, book_title } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ ok: false, error: "Judul dan cerita wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const { data, error } = await db
      .from("stories")
      .insert({ title, content, book_title: book_title || "", created_by: user.userId })
      .select("*, users(name, city)")
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, story: data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { id } = await request.json();
    const db = getDb();

    if (!["admin", "owner"].includes(user.role)) {
      const { data: story } = await db.from("stories").select("created_by").eq("id", id).single();
      if (!story || story.created_by !== user.userId) {
        return NextResponse.json({ ok: false, error: "Tidak bisa menghapus cerita orang lain" }, { status: 403 });
      }
    }

    const { error } = await db.from("stories").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
