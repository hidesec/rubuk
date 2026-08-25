"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  role: string;
  favorite: string;
}

interface Registration {
  id: number;
  name: string;
  email: string;
  city: string;
  interest: string;
  created_at: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  rating: number;
  color: string;
  year: number;
}

interface Discussion {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  is_upcoming: boolean;
}

export default function DashboardPage() {
  const { user, loading, authHeaders } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"users" | "registrations" | "books" | "discussions" | "password">("users");
  const [users, setUsers] = useState<User[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", city: "Jakarta", role: "users" });
  const [showBookForm, setShowBookForm] = useState(false);
  const [bookForm, setBookForm] = useState({ title: "", author: "", genre: "Fiksi", pages: 0, rating: 0, color: "bg-mocha", year: 2026 });
  const [showDiscForm, setShowDiscForm] = useState(false);
  const [discForm, setDiscForm] = useState({ title: "", description: "", date: "" });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwMessage, setPwMessage] = useState("");
  const [adminPwTarget, setAdminPwTarget] = useState<number | null>(null);
  const [adminPwValue, setAdminPwValue] = useState("");
  const [adminPwMsg, setAdminPwMsg] = useState("");

  useEffect(() => {
    if (!loading && (!user || !["admin", "owner"].includes(user.role))) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const h = authHeaders();
    fetch("/api/users", { headers: h }).then((r) => r.json()).then((d) => { if (d.ok) setUsers(d.users); });
    fetch("/api/registrations", { headers: h }).then((r) => r.json()).then((d) => { if (d.ok) setRegistrations(d.registrations); });
    fetch("/api/books").then((r) => r.json()).then((d) => { if (d.ok) setBooks(d.books); });
    fetch("/api/discussions").then((r) => r.json()).then((d) => { if (d.ok) setDiscussions(d.discussions); });
  }, [user]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/users", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify(userForm) });
    const d = await res.json();
    if (d.ok) {
      setUsers([d.user, ...users]);
      setUserForm({ name: "", email: "", password: "", city: "Jakarta", role: "users" });
      setShowUserForm(false);
    } else {
      alert(d.error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Hapus user ini?")) return;
    const res = await fetch("/api/users", { method: "DELETE", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ id }) });
    const d = await res.json();
    if (d.ok) setUsers(users.filter((u) => u.id !== id));
    else alert(d.error);
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/books", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify(bookForm) });
    const d = await res.json();
    if (d.ok) {
      setBooks([d.book, ...books]);
      setBookForm({ title: "", author: "", genre: "Fiksi", pages: 0, rating: 0, color: "bg-mocha", year: 2026 });
      setShowBookForm(false);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      const res = await fetch("/api/books", { method: "DELETE", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ id }) });
      const d = await res.json();
      if (d.ok) {
        setBooks(books.filter((b) => b.id !== id));
      } else {
        alert(d.error || "Gagal menghapus buku");
      }
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  const handleAddDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const parts = discForm.date.split("-");
    const indoDate = `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
    const res = await fetch("/api/discussions", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ ...discForm, date: indoDate }) });
    const d = await res.json();
    if (d.ok) {
      setDiscussions([d.discussion, ...discussions]);
      setDiscForm({ title: "", description: "", date: "" });
      setShowDiscForm(false);
    } else {
      alert(d.error || "Gagal menambah diskusi");
    }
  };

  const handleDeleteDiscussion = async (id: number) => {
    try {
      const res = await fetch("/api/discussions", { method: "DELETE", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ id }) });
      const d = await res.json();
      if (d.ok) {
        setDiscussions(discussions.filter((d) => d.id !== id));
      } else {
        alert(d.error || "Gagal menghapus diskusi");
      }
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMessage("Konfirmasi password baru tidak cocok");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwMessage("Password baru minimal 6 karakter");
      return;
    }
    const res = await fetch("/api/auth/update", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
    });
    const d = await res.json();
    if (d.ok) {
      setPwMessage("Password berhasil diubah");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setPwMessage(d.error || "Gagal mengubah password");
    }
  };

  const handleAdminChangePassword = async (targetId: number) => {
    setAdminPwMsg("");
    if (!adminPwValue) return;
    if (adminPwValue.length < 6) {
      setAdminPwMsg("Password minimal 6 karakter");
      return;
    }
    const res = await fetch("/api/auth/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ userId: targetId, newPassword: adminPwValue }),
    });
    const d = await res.json();
    if (d.ok) {
      setAdminPwMsg("Password berhasil diubah");
      setAdminPwTarget(null);
      setAdminPwValue("");
    } else {
      setAdminPwMsg(d.error || "Gagal mengubah password");
    }
  };

  if (loading || !user) return <div className="py-20 text-center text-warm-gray">Memuat...</div>;

  const tabs = [
    { key: "users" as const, label: "User" },
    { key: "registrations" as const, label: "Pendaftaran" },
    { key: "books" as const, label: "Buku" },
    { key: "discussions" as const, label: "Diskusi" },
    { key: "password" as const, label: "Ganti Password" },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight">Selamat datang, {user.name}</h1>
          <p className="text-sm text-warm-gray capitalize">Role: {user.role}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => {
            if (t.key === "registrations" && user.role !== "admin") return null;
            return (
              <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === t.key ? "bg-espresso text-cream shadow-sm" : "bg-cream border border-cream-dark/40 text-warm-gray hover:border-cream-dark hover:text-espresso"}`}>
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "users" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setShowUserForm(!showUserForm)} className="px-5 py-2 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors">
                {showUserForm ? "Batal" : "+ Tambah User"}
              </button>
            </div>
            {showUserForm && (
              <form onSubmit={handleAddUser} className="p-6 rounded-2xl bg-parchment border border-cream-dark/30 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input required placeholder="Nama" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input required type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input required type="password" placeholder="Password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input placeholder="Kota" value={userForm.city} onChange={(e) => setUserForm({ ...userForm, city: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso focus:outline-none focus:border-gold">
                  <option value="users">Users</option>
                  {user.role === "admin" && <option value="owner">Owner</option>}
                  {user.role === "admin" && <option value="admin">Admin</option>}
                </select>
                <div><button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan</button></div>
              </form>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((u) => (
                <div key={u.id} className="p-4 rounded-xl bg-parchment border border-cream-dark/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-espresso flex items-center justify-center text-xs font-bold text-cream flex-shrink-0">{u.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-espresso truncate">{u.name}</p>
                      <p className="text-[11px] text-warm-gray truncate">{u.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream border border-cream-dark/30 text-warm-gray">{u.role}</span>
                    </div>
                    {u.id !== user.id && (
                      <button onClick={() => handleDeleteUser(u.id)} className="text-warm-gray-light hover:text-red-500 transition-colors text-sm" title="Hapus">×</button>
                    )}
                  </div>
                  {user.role === "admin" && u.id !== user.id && (
                    <div className="mt-3 pt-3 border-t border-cream-dark/30">
                      {adminPwTarget === u.id ? (
                        <div className="flex gap-2">
                          <input type="password" placeholder="Password baru" value={adminPwValue} onChange={(e) => setAdminPwValue(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-cream-dark/40 text-xs text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                          <button onClick={() => handleAdminChangePassword(u.id)} className="px-3 py-1.5 bg-sage-dark text-cream text-xs font-medium rounded-lg hover:bg-sage transition-colors">OK</button>
                          <button onClick={() => { setAdminPwTarget(null); setAdminPwValue(""); setAdminPwMsg(""); }} className="px-2 py-1.5 text-warm-gray-light hover:text-espresso text-xs">Batal</button>
                        </div>
                      ) : (
                        <button onClick={() => { setAdminPwTarget(u.id); setAdminPwMsg(""); }} className="text-[11px] text-mocha hover:text-espresso font-medium transition-colors">
                          Ganti Password
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {adminPwMsg && <p className="text-xs text-sage-dark font-medium">{adminPwMsg}</p>}
          </div>
        )}

        {tab === "registrations" && user.role === "admin" && (
          <div className="space-y-4">
            {registrations.length === 0 && <p className="text-warm-gray text-sm">Belum ada pendaftaran.</p>}
            {registrations.map((r) => (
              <div key={r.id} className="p-5 rounded-xl bg-parchment border border-cream-dark/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-espresso">{r.name}</p>
                    <p className="text-xs text-warm-gray">{r.email} · {r.city}</p>
                    {r.interest && <p className="text-xs text-warm-gray-light mt-0.5">Minat: {r.interest}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "books" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setShowBookForm(!showBookForm)} className="px-5 py-2 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors">
                {showBookForm ? "Batal" : "+ Tambah Buku"}
              </button>
            </div>
            {showBookForm && (
              <form onSubmit={handleAddBook} className="p-6 rounded-2xl bg-parchment border border-cream-dark/30 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input required placeholder="Judul" value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input required placeholder="Penulis" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <select value={bookForm.genre} onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso focus:outline-none focus:border-gold">
                  <option>Fiksi</option><option>Non-Fiksi</option><option>Biografi</option><option>Puisi</option><option>Fiksi Fantasi</option>
                </select>
                <input type="number" placeholder="Halaman" value={bookForm.pages || ""} onChange={(e) => setBookForm({ ...bookForm, pages: parseInt(e.target.value) || 0 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input type="number" step="0.1" placeholder="Rating" value={bookForm.rating || ""} onChange={(e) => setBookForm({ ...bookForm, rating: parseFloat(e.target.value) || 0 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input type="number" placeholder="Tahun" value={bookForm.year || ""} onChange={(e) => setBookForm({ ...bookForm, year: parseInt(e.target.value) || 2026 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <div className="sm:col-span-2 lg:col-span-3"><button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan</button></div>
              </form>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-parchment border border-cream-dark/30 flex items-center gap-3">
                  <div className={`w-10 h-14 ${b.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-5 h-5 text-white/50"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-espresso truncate">{b.title}</p>
                    <p className="text-xs text-warm-gray truncate">{b.author}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream border border-cream-dark/30 text-warm-gray">{b.genre}</span>
                  </div>
                  <button onClick={() => handleDeleteBook(b.id)} className="text-warm-gray-light hover:text-red-500 transition-colors text-sm" title="Hapus">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "discussions" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button onClick={() => setShowDiscForm(!showDiscForm)} className="px-5 py-2 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors">
                {showDiscForm ? "Batal" : "+ Tambah Diskusi"}
              </button>
            </div>
            {showDiscForm && (
              <form onSubmit={handleAddDiscussion} className="p-6 rounded-2xl bg-parchment border border-cream-dark/30 grid sm:grid-cols-2 gap-4">
                <input required placeholder="Judul" value={discForm.title} onChange={(e) => setDiscForm({ ...discForm, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input required type="date" value={discForm.date} onChange={(e) => setDiscForm({ ...discForm, date: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <input placeholder="Deskripsi" value={discForm.description} onChange={(e) => setDiscForm({ ...discForm, description: e.target.value })} className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
                <div className="sm:col-span-2"><button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan</button></div>
              </form>
            )}
            <div className="space-y-3">
              {discussions.map((d) => (
                <div key={d.id} className="p-4 rounded-xl bg-parchment border border-cream-dark/30 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-espresso">{d.title}</p>
                    <p className="text-xs text-warm-gray">{d.date} · {d.attendees} peserta</p>
                  </div>
                  <button onClick={() => handleDeleteDiscussion(d.id)} className="text-warm-gray-light hover:text-red-500 transition-colors text-sm" title="Hapus">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "password" && (
          <div className="max-w-md">
            <div className="p-6 rounded-2xl bg-parchment border border-cream-dark/30 space-y-4">
              <h2 className="text-lg font-semibold text-espresso">Ganti Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">Password Saat Ini</label>
                  <input type="password" required value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" placeholder="Masukkan password saat ini" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">Password Baru</label>
                  <input type="password" required value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" placeholder="Minimal 6 karakter" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">Konfirmasi Password Baru</label>
                  <input type="password" required value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" placeholder="Ulangi password baru" />
                </div>
                {pwMessage && (
                  <p className={`text-xs font-medium ${pwMessage.includes("berhasil") ? "text-sage-dark" : "text-red-500"}`}>{pwMessage}</p>
                )}
                <button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan Password</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
