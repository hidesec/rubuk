import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser, hashPassword } from "@/lib/auth";

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
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, city, role } = await request.json();
    const db = getDb();

    if (currentUser.role === "owner" && role !== "users") {
      return NextResponse.json({ ok: false, error: "Owner hanya bisa menambah user dengan role users" }, { status: 403 });
    }

    const { data: existing } = await db.from("users").select("id").eq("email", email).limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: false, error: "Email sudah terdaftar" }, { status: 400 });
    }

    const { data: user, error } = await db.from("users").insert({ name, email, password: hashPassword(password), city: city || "Jakarta", role: role || "users" }).select("id, name, email, city, role").single();
    if (error) throw error;
    return NextResponse.json({ ok: true, user });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const db = getDb();

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
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
