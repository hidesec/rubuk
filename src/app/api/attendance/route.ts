import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const discussionId = url.searchParams.get("discussion_id");

    const db = getDb();
    let query = db.from("attendance").select("id, discussion_id, user_id, users(name, city)");
    if (discussionId) {
      const parsed = parseInt(discussionId);
      if (isNaN(parsed)) return NextResponse.json({ ok: false, error: "ID tidak valid" }, { status: 400 });
      query = query.eq("discussion_id", parsed);
    }
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ ok: true, attendance: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { discussion_id } = await request.json();
    if (!discussion_id || typeof discussion_id !== "number") return NextResponse.json({ ok: false, error: "discussion_id tidak valid" }, { status: 400 });

    const db = getDb();

    const { data: discussion } = await db.from("discussions").select("date, is_upcoming").eq("id", discussion_id).single();
    if (!discussion || !discussion.is_upcoming) {
      return NextResponse.json({ ok: false, error: "Hanya bisa konfirmasi untuk diskusi yang akan datang" }, { status: 400 });
    }

    const months: Record<string, number> = {
      Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
      Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
    };
    const parts = discussion.date.split(" ");
    const discDate = new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (discDate < today) {
      return NextResponse.json({ ok: false, error: "Diskusi ini sudah lewat" }, { status: 400 });
    }

    const { data: existing } = await db.from("attendance").select("id").eq("discussion_id", discussion_id).eq("user_id", user.userId).limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: false, error: "Sudah konfirmasi kehadiran" }, { status: 400 });
    }

    const { data, error } = await db.from("attendance").insert({ discussion_id, user_id: user.userId }).select("id, discussion_id, user_id, users(name, city)").single();
    if (error) throw error;

    const { count } = await db.from("attendance").select("id", { count: "exact", head: true }).eq("discussion_id", discussion_id);
    await db.from("discussions").update({ attendees: count || 0 }).eq("id", discussion_id);

    return NextResponse.json({ ok: true, record: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { discussion_id } = await request.json();
    if (!discussion_id || typeof discussion_id !== "number") return NextResponse.json({ ok: false, error: "discussion_id tidak valid" }, { status: 400 });

    const db = getDb();
    const { error } = await db.from("attendance").delete().eq("discussion_id", discussion_id).eq("user_id", user.userId);
    if (error) throw error;

    const { count } = await db.from("attendance").select("id", { count: "exact", head: true }).eq("discussion_id", discussion_id);
    await db.from("discussions").update({ attendees: count || 0 }).eq("id", discussion_id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
