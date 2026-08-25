import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { validateString, validateNumber } from "@/lib/validation";

export async function GET() {
  try {
    const db = getDb();
    const { data: books, error } = await db.from("books").select("*, users(name)").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, books });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user || !["admin", "owner"].includes(user.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { title, author, genre, pages, rating, color, year } = await request.json();

    const titleErr = validateString(title, "Judul", 200);
    if (titleErr) return NextResponse.json({ ok: false, error: titleErr }, { status: 400 });
    const authorErr = validateString(author, "Penulis", 200);
    if (authorErr) return NextResponse.json({ ok: false, error: authorErr }, { status: 400 });

    const db = getDb();
    const { data, error } = await db.from("books").insert({ title: title.trim(), author: author.trim(), genre: genre || "Fiksi", pages: pages || 0, rating: rating || 0, color: color || "bg-mocha", year: year || 2026, created_by: user.userId }).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, book: data });
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
      const { data: book } = await db.from("books").select("created_by").eq("id", id).single();
      if (!book || book.created_by !== user.userId) {
        return NextResponse.json({ ok: false, error: "Tidak bisa menghapus buku orang lain" }, { status: 403 });
      }
    }

    const { error } = await db.from("books").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
