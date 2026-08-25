import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ ok: false, error: "ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required" }, { status: 500 });
    }

    const db = getDb();
    const { data: existing } = await db.from("users").select("id").limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ ok: true, message: "Database already seeded" });
    }

    const pw = hashPassword(adminPassword);
    const { error: userErr } = await db.from("users").insert({
      name: "Admin RUBUK",
      email: adminEmail,
      password: pw,
      city: "Jakarta",
      role: "admin",
    });
    if (userErr && !userErr.message.includes("duplicate")) {
      return NextResponse.json({ ok: false, error: "Tables not found. Run setup SQL first.", sql: getSetupSQL() }, { status: 500 });
    }

    await db.from("books").insert([
      { title: "Laut Bercerita", author: "Leila S. Chudori", genre: "Fiksi", pages: 380, rating: 4.7, color: "bg-mocha", year: 2018, created_by: 1 },
      { title: "Bumi", author: "Tere Liye", genre: "Fiksi Fantasi", pages: 436, rating: 4.5, color: "bg-sage-dark", year: 2014, created_by: 1 },
      { title: "Filosofi Teras", author: "Henry Manampiring", genre: "Non-Fiksi", pages: 304, rating: 4.6, color: "bg-sienna", year: 2016, created_by: 1 },
    ]);

    await db.from("discussions").insert([
      { title: "Diskusi Perdana RUBUK", description: "Pengenalan komunitas", date: "23 Agustus 2026", attendees: 8, created_by: 1 },
      { title: "Diskusi Minggu ke-2", description: "Diskusi rutin mingguan", date: "30 Agustus 2026", attendees: 10, created_by: 1 },
    ]);

    return NextResponse.json({ ok: true, message: "Database seeded" });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: "Setup failed" }, { status: 500 });
  }
}

function getSetupSQL() {
  return `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  city TEXT DEFAULT 'Jakarta',
  role TEXT DEFAULT 'users' CHECK (role IN ('admin','owner','users')),
  favorite TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT DEFAULT 'Fiksi',
  pages INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0,
  color TEXT DEFAULT 'bg-mocha',
  year INTEGER DEFAULT 2026,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS discussions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  location TEXT DEFAULT 'Taman Anggrek, samping Tuku GBK',
  day TEXT DEFAULT 'Minggu',
  time_start TEXT DEFAULT '16:00',
  time_end TEXT DEFAULT '17:30',
  is_upcoming BOOLEAN DEFAULT true,
  date TEXT NOT NULL,
  attendees INTEGER DEFAULT 0,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT DEFAULT 'Jakarta',
  interest TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  book_title TEXT DEFAULT '',
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  discussion_id INTEGER REFERENCES discussions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(discussion_id, user_id)
);`;
}
