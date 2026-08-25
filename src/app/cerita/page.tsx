"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface Story {
  id: number;
  title: string;
  content: string;
  book_title: string;
  created_by: number | null;
  created_at: string;
  users: { name: string; city: string } | null;
}

export default function CeritaPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", book_title: "" });

  useEffect(() => {
    fetch("/api/stories", { credentials: "include" }).then((r) => r.json()).then((d) => { if (d.ok) setStories(d.stories); });
  }, []);

  const canDelete = (story: Story) => {
    if (!user) return false;
    if (["admin", "owner"].includes(user.role)) return true;
    return story.created_by === user.id;
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/stories", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const d = await res.json();
    if (d.ok) {
      setStories([d.story, ...stories]);
      setForm({ title: "", content: "", book_title: "" });
      setShowForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/stories", { method: "DELETE", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const d = await res.json();
      if (d.ok) {
        setStories(stories.filter((s) => s.id !== id));
      } else {
        alert(d.error || "Gagal menghapus cerita");
      }
    } catch {
      alert("Terjadi kesalahan");
    }
  };

  const avatarColors = ["bg-sage", "bg-mocha", "bg-sienna", "bg-sepia", "bg-gold", "bg-espresso", "bg-sage-dark"];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Cerita</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight">Cerita Mereka</h1>
            <p className="text-warm-gray leading-relaxed">Kisah membaca dari anggota RUBUK. Cerita singkat, rekomendasi, dan pengalaman yang menginspirasi.</p>
          </div>
          {user && (
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm">
              {showForm ? "Batal" : "+ Tambah Cerita"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="mb-10 p-6 rounded-2xl bg-parchment border border-cream-dark/30 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Judul cerita" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
              <input placeholder="Buku terkait (opsional)" value={form.book_title} onChange={(e) => setForm({ ...form, book_title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            </div>
            <textarea required placeholder="Tuliskan ceritamu di sini..." rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold resize-none" />
            <button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Publikasikan</button>
          </form>
        )}

        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cream flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-warm-gray-light">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <p className="text-warm-gray text-sm">Belum ada cerita. Jadilah yang pertama!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story, i) => (
              <div key={story.id} className="group relative p-6 rounded-2xl bg-parchment border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-lg hover:shadow-espresso/5 transition-all duration-300">
                {canDelete(story) && (
                  <button onClick={() => handleDelete(story.id)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cream border border-cream-dark/30 flex items-center justify-center text-warm-gray-light hover:text-red-500 hover:border-red-300 transition-colors text-xs z-10" title="Hapus">
                    ×
                  </button>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                    {story.users?.name?.charAt(0) || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-espresso truncate">{story.users?.name || "Anonim"}</p>
                    <p className="text-[10px] text-warm-gray">{story.users?.city || ""}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-espresso mb-2">{story.title}</h3>
                {story.book_title && (
                  <p className="text-xs text-mocha mb-2 italic">Tentang: {story.book_title}</p>
                )}
                <p className="text-sm text-warm-gray leading-relaxed whitespace-pre-line">{story.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
