import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { validateString } from "@/lib/validation";

export async function GET() {
  try {
    const db = getDb();
    const { data: discussions, error } = await db.from("discussions").select("*, users(name)").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, discussions });
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

    const { title, description, date, location, attendees } = await request.json();

    const titleErr = validateString(title, "Judul", 200);
    if (titleErr) return NextResponse.json({ ok: false, error: titleErr }, { status: 400 });
    const dateErr = validateString(date, "Tanggal", 50);
    if (dateErr) return NextResponse.json({ ok: false, error: dateErr }, { status: 400 });

    const db = getDb();
    const { data, error } = await db.from("discussions").insert({ title: title.trim(), description: description || "", date: date.trim(), location: location || "Taman Anggrek, samping Tuku GBK", attendees: attendees || 0, created_by: user.userId }).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, discussion: data });
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
      return NextResponse.json({ ok: false, error: "Hanya admin/owner yang bisa menghapus diskusi" }, { status: 403 });
    }

    const { error } = await db.from("discussions").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
