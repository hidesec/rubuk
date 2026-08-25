console.log("=== RUBUK Database Setup ===\n");
console.log("Semua koneksi sekarang via HTTPS (Supabase REST API).");
console.log("Tidak perlu koneksi langsung ke PostgreSQL.\n");
console.log("Langkah-langkah:\n");
console.log("1. Buka Supabase Dashboard: https://supabase.com/dashboard");
console.log("2. Pilih project RUBUK");
console.log("3. Buka SQL Editor (menu sebelah kiri)");
console.log("4. Copy-paste SQL di bawah ini, lalu klik 'Run'\n");
console.log("=".repeat(60));
console.log(`
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
);
`);
console.log("=".repeat(60));
console.log("\n5. Setelah SQL berhasil, jalankan: npm run dev");
console.log("6. Buka http://localhost:3000 — data akan otomatis di-seed.");
