"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  rating: number;
  color: string;
  year: number;
  created_by: number | null;
}

const genres = ["Semua", "Fiksi", "Non-Fiksi", "Biografi", "Puisi", "Fiksi Fantasi"];

export default function BooksPage() {
  const { user, authHeaders } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [activeGenre, setActiveGenre] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", genre: "Fiksi", pages: 0, rating: 0, color: "bg-mocha", year: 2026 });

  useEffect(() => {
    fetch("/api/books").then((r) => r.json()).then((d) => { if (d.ok) setBooks(d.books); });
  }, []);

  const filtered = activeGenre === "Semua" ? books : books.filter((b) => b.genre === activeGenre);

  const canDelete = (book: Book) => {
    if (!user) return false;
    if (["admin", "owner"].includes(user.role)) return true;
    return book.created_by === user.id;
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/books", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify(form) });
    const d = await res.json();
    if (d.ok) {
      setBooks([d.book, ...books]);
      setForm({ title: "", author: "", genre: "Fiksi", pages: 0, rating: 0, color: "bg-mocha", year: 2026 });
      setShowForm(false);
    }
  };

  const handleDelete = async (id: number) => {
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

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Koleksi</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight">Katalog Buku</h1>
            <p className="text-warm-gray leading-relaxed">Jelajahi daftar buku yang menjadi bahan diskusi dan rekomendasi dari komunitas RUBUK.</p>
          </div>
          {user && ["admin", "owner"].includes(user.role) && (
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm">
              {showForm ? "Batal" : "+ Tambah Buku"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="mb-10 p-6 rounded-2xl bg-parchment border border-cream-dark/30 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input required placeholder="Judul buku" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <input required placeholder="Penulis" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <select value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso focus:outline-none focus:border-gold">
              {genres.filter((g) => g !== "Semua").map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="number" placeholder="Halaman" value={form.pages || ""} onChange={(e) => setForm({ ...form, pages: parseInt(e.target.value) || 0 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <input type="number" step="0.1" placeholder="Rating" value={form.rating || ""} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <input type="number" placeholder="Tahun" value={form.year || ""} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2026 })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <div className="sm:col-span-2 lg:col-span-3">
              <button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan Buku</button>
            </div>
          </form>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {genres.map((genre) => (
            <button key={genre} onClick={() => setActiveGenre(genre)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeGenre === genre ? "bg-espresso text-cream shadow-sm" : "bg-cream border border-cream-dark/40 text-warm-gray hover:border-cream-dark hover:text-espresso"}`}>
              {genre}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((book) => (
            <div key={book.id} className="group p-5 rounded-2xl bg-parchment border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-lg hover:shadow-espresso/5 transition-all duration-300 relative">
              {canDelete(book) && (
                <button type="button" onClick={() => handleDelete(book.id)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cream border border-cream-dark/30 flex items-center justify-center text-warm-gray-light hover:text-red-500 hover:border-red-300 transition-colors text-xs z-10" title="Hapus">
                  ×
                </button>
              )}
              <div className="flex gap-4">
                <div className={`flex-shrink-0 w-16 h-24 ${book.color} rounded-lg shadow-md flex items-center justify-center`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-7 h-7 text-white/50"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-espresso truncate group-hover:text-mocha transition-colors">{book.title}</h3>
                  <p className="text-sm text-warm-gray mt-0.5">{book.author}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream border border-cream-dark/30 text-warm-gray">{book.genre}</span>
                    <span className="text-[11px] text-warm-gray-light">{book.pages} hal</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                      <span className="text-xs font-semibold text-espresso">{Number(book.rating).toFixed(1)}</span>
                    </div>
                    <span className="text-[11px] text-warm-gray-light">{book.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
