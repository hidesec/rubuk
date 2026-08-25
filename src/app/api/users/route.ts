import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { validateEmail, validateString } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const { data: users, error } = await db.from("users").select("id, name, email, city, role, favorite, created_at").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ ok: true, users });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, city, role } = await request.json();

    const nameErr = validateString(name, "Nama", 100);
    if (nameErr) return NextResponse.json({ ok: false, error: nameErr }, { status: 400 });
    if (!email || !validateEmail(email)) return NextResponse.json({ ok: false, error: "Email tidak valid" }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ ok: false, error: "Password minimal 6 karakter" }, { status: 400 });

    const db = getDb();

    if (role === "admin" || role === "owner") {
      return NextResponse.json({ ok: false, error: "Hanya owner yang bisa membuat akun admin/owner" }, { status: 403 });
    }

    const { data: existing } = await db.from("users").select("id").eq("email", email).limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: false, error: "Email sudah terdaftar" }, { status: 400 });
    }

    const { data: user, error } = await db.from("users").insert({ name: name.trim(), email: email.trim().toLowerCase(), password: hashPassword(password), city: city || "Jakarta", role: role || "users" }).select("id, name, email, city, role").single();
    if (error) throw error;
    return NextResponse.json({ ok: true, user });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id || typeof id !== "number") return NextResponse.json({ ok: false, error: "ID tidak valid" }, { status: 400 });

    const db = getDb();

    if (currentUser.role === "admin") {
      const { data: target } = await db.from("users").select("role").eq("id", id).single();
      if (target && target.role === "admin") {
        return NextResponse.json({ ok: false, error: "Tidak bisa menghapus akun admin lain" }, { status: 403 });
      }
    }

    if (currentUser.role === "owner") {
      const { data: target } = await db.from("users").select("role").eq("id", id).single();
      if (target && target.role !== "users") {
        return NextResponse.json({ ok: false, error: "Owner hanya bisa menghapus user dengan role users" }, { status: 403 });
      }
    }

    if (currentUser.userId === id) {
      return NextResponse.json({ ok: false, error: "Tidak bisa menghapus akun sendiri" }, { status: 400 });
    }

    const { error } = await db.from("users").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}
