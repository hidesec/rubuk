"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface Discussion {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  is_upcoming: boolean;
  created_by: number | null;
}

interface Attendee {
  id: number;
  discussion_id: number;
  user_id: number;
  users: { name: string; city: string } | null;
}

const avatarColors = ["bg-sage", "bg-mocha", "bg-sienna", "bg-sepia", "bg-gold", "bg-espresso", "bg-sage-dark"];

function parseIndoDate(dateStr: string): Date {
  const months: Record<string, number> = {
    Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
    Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
  };
  const parts = dateStr.split(" ");
  if (parts.length === 3 && months[parts[1]] !== undefined) {
    return new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  return new Date(0);
}

export default function DiscussionsPage() {
  const { user, authHeaders } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [attendance, setAttendance] = useState<Attendee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  useEffect(() => {
    fetch("/api/discussions").then((r) => r.json()).then((d) => {
      if (d.ok) setDiscussions(d.discussions);
    }).catch(() => {});
    fetch("/api/attendance").then((r) => r.json()).then((d) => {
      if (d.ok) setAttendance(d.attendance);
    }).catch(() => {});
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = discussions.filter((d) => d.is_upcoming && parseIndoDate(d.date) >= today);
  const past = discussions.filter((d) => !d.is_upcoming || parseIndoDate(d.date) < today);

  const canDelete = (d: Discussion) => {
    if (!user) return false;
    return ["admin", "owner"].includes(user.role);
  };

  const getAttendees = (discussionId: number) => attendance.filter((a) => a.discussion_id === discussionId);
  const isAttending = (discussionId: number) => user ? attendance.some((a) => a.discussion_id === discussionId && a.user_id === user.id) : false;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const parts = form.date.split("-");
    const indoDate = `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
    const res = await fetch("/api/discussions", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ ...form, date: indoDate }) });
    const d = await res.json();
    if (d.ok) {
      setDiscussions([d.discussion, ...discussions]);
      setForm({ title: "", description: "", date: "" });
      setShowForm(false);
    } else {
      alert(d.error || "Gagal menambah diskusi");
    }
  };

  const handleDelete = async (id: number) => {
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

  const handleAttendance = async (discussionId: number) => {
    const res = await fetch("/api/attendance", { method: "POST", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ discussion_id: discussionId }) });
    const d = await res.json();
    if (d.ok) {
      setAttendance([...attendance, d.record]);
      setDiscussions(discussions.map((disc) => disc.id === discussionId ? { ...disc, attendees: disc.attendees + 1 } : disc));
    }
  };

  const handleCancelAttendance = async (discussionId: number) => {
    const res = await fetch("/api/attendance", { method: "DELETE", headers: { "Content-Type": "application/json", ...authHeaders() }, body: JSON.stringify({ discussion_id: discussionId }) });
    const d = await res.json();
    if (d.ok) {
      setAttendance(attendance.filter((a) => !(a.discussion_id === discussionId && a.user_id === user?.id)));
      setDiscussions(discussions.map((disc) => disc.id === discussionId ? { ...disc, attendees: Math.max(0, disc.attendees - 1) } : disc));
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Diskusi</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight">Jadwal Diskusi</h1>
            <p className="text-warm-gray leading-relaxed">Kami bertemu setiap minggu untuk berbagi cerita, pendapat, dan perspektif tentang buku-buku yang kami baca bersama.</p>
          </div>
          {user && (
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm">
              {showForm ? "Batal" : "+ Tambah Diskusi"}
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="mb-10 p-6 rounded-2xl bg-parchment border border-cream-dark/30 grid sm:grid-cols-2 gap-4">
            <input required placeholder="Judul diskusi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <input placeholder="Deskripsi (opsional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold" />
            <div className="sm:col-span-2">
              <button type="submit" className="px-6 py-2.5 bg-sage-dark text-cream text-sm font-medium rounded-xl hover:bg-sage transition-colors">Simpan</button>
            </div>
          </form>
        )}

        <div className="space-y-6 mb-20">
          {upcoming.map((item) => {
            const attendees = getAttendees(item.id);
            const attending = isAttending(item.id);
            return (
              <div key={item.id} className="p-7 rounded-2xl bg-parchment border border-gold/30 shadow-lg shadow-gold/5 relative group">
                {canDelete(item) && (
                  <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cream border border-cream-dark/30 flex items-center justify-center text-warm-gray-light hover:text-red-500 hover:border-red-300 transition-colors text-xs z-10" title="Hapus">×</button>
                )}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-shrink-0 lg:w-48">
                    <div className="text-xs uppercase tracking-wider text-warm-gray font-medium mb-1">Minggu</div>
                    <div className="text-sm text-warm-gray-light mb-3">16:00 — 17:30</div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold/10 text-gold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      Sesi Berikutnya
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-espresso mb-2">{item.title}</h3>
                    <p className="text-sm text-warm-gray leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-warm-gray-light">
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        Taman Anggrek, samping Tuku GBK
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        {item.attendees} peserta
                      </div>
                    </div>

                    {attendees.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-cream-dark/30">
                        <p className="text-[11px] text-warm-gray mb-2">Yang akan hadir:</p>
                        <div className="flex flex-wrap gap-2">
                          {attendees.map((a, i) => (
                            <div key={a.id} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-cream border border-cream-dark/30">
                              <div className={`w-5 h-5 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-[8px] font-bold text-white`}>
                                {a.users?.name?.charAt(0) || "?"}
                              </div>
                              <span className="text-[10px] text-espresso font-medium">{a.users?.name || "Anonim"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

          {user && ["admin", "owner"].includes(user.role) && (
                      <div className="mt-4">
                        {attending ? (
                          <button onClick={() => handleCancelAttendance(item.id)} className="px-4 py-2 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                            Batalkan Kehadiran
                          </button>
                        ) : (
                          <button onClick={() => handleAttendance(item.id)} className="px-4 py-2 text-xs font-medium text-sage-dark bg-sage/10 border border-sage/30 rounded-lg hover:bg-sage/20 transition-colors">
                            Konfirmasi Hadir
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {upcoming.length === 0 && <p className="text-warm-gray text-sm">Belum ada jadwal diskusi mendatang.</p>}
        </div>

        {past.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-espresso tracking-tight">Diskusi Sebelumnya</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {past.map((item) => (
                <div key={item.id} className="p-6 rounded-2xl bg-parchment border border-cream-dark/30 relative group">
                  {canDelete(item) && (
                    <button onClick={() => handleDelete(item.id)} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cream border border-cream-dark/30 flex items-center justify-center text-warm-gray-light hover:text-red-500 hover:border-red-300 transition-colors text-xs z-10" title="Hapus">×</button>
                  )}
                  <h3 className="text-base font-semibold text-espresso mb-1.5">{item.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-warm-gray-light">
                    <span>{item.date}</span>
                    <span className="text-cream-dark">•</span>
                    <span>{item.attendees} peserta</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
