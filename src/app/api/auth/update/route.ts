import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword, name, city, favorite } = await request.json();
    const user = getCurrentUser(request);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const db = getDb();
    const { data: rows } = await db.from("users").select("password").eq("id", user.userId).single();
    if (!rows) return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });

    if (currentPassword) {
      if (!verifyPassword(currentPassword, rows.password)) {
        return NextResponse.json({ ok: false, error: "Password lama salah" }, { status: 400 });
      }
      await db.from("users").update({ password: hashPassword(newPassword) }).eq("id", user.userId);
    }

    if (name || city || favorite) {
      const update: Record<string, string> = {};
      if (name) update.name = name;
      if (city) update.city = city;
      if (favorite) update.favorite = favorite;
      await db.from("users").update(update).eq("id", user.userId);
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { userId, newPassword } = await request.json();
    if (!userId || !newPassword) {
      return NextResponse.json({ ok: false, error: "userId dan newPassword wajib diisi" }, { status: 400 });
    }

    const db = getDb();
    const { error } = await db.from("users").update({ password: hashPassword(newPassword) }).eq("id", userId);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
