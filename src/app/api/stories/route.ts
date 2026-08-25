import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { validateString } from "@/lib/validation";

export async function GET() {
  try {
    const db = getDb();
    const { data: stories, error } = await db
      .from("stories")
      .select("*, users(name, city)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, stories });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { title, content, book_title } = await request.json();

    const titleErr = validateString(title, "Judul", 200);
    if (titleErr) return NextResponse.json({ ok: false, error: titleErr }, { status: 400 });
    const contentErr = validateString(content, "Cerita", 10000);
    if (contentErr) return NextResponse.json({ ok: false, error: contentErr }, { status: 400 });

    const db = getDb();
    const { data, error } = await db
      .from("stories")
      .insert({ title: title.trim(), content: content.trim(), book_title: book_title || "", created_by: user.userId })
      .select("*, users(name, city)")
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, story: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { id } = await request.json();
    if (!id || typeof id !== "number") return NextResponse.json({ ok: false, error: "ID tidak valid" }, { status: 400 });

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
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
