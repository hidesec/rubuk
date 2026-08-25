import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword, createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = getDb();
    const hashed = hashPassword(password);

    const { data, error } = await db.from("users").select("id, name, email, role, city").eq("email", email).eq("password", hashed).single();
    if (error || !data) {
      return NextResponse.json({ ok: false, error: "Email atau password salah" }, { status: 401 });
    }

    const token = createToken(data.id, data.role);
    const response = NextResponse.json({ ok: true, user: data, token });
    response.cookies.set("rubuk_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
