"use client";

import { useEffect, useState } from "react";

interface Discussion {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  is_upcoming: boolean;
}

export default function WeeklyDiscussion() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    fetch("/api/discussions").then((r) => r.json()).then((d) => { if (d.ok) setDiscussions(d.discussions); });
  }, []);

  const upcoming = discussions.filter((d) => d.is_upcoming);
  const past = discussions.filter((d) => !d.is_upcoming);

  return (
    <section className="py-20 lg:py-28 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-sage-dark font-semibold">Jadwal Mingguan</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight leading-tight">Bertemu Setiap<br />Minggu Secara Offline</h2>
            <p className="text-warm-gray leading-relaxed">Kami percaya diskusi yang bermakna terjadi tatap muka. Bergabunglah dalam pertemuan rutin kami dan rasakan kehangatan komunitas yang sesungguhnya.</p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-cream-dark/30">
                <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-sage"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">Setiap Minggu</p>
                  <p className="text-xs text-warm-gray mt-0.5">Pukul 16:00 — 17:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-cream-dark/30">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gold"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">Jakarta Selatan</p>
                  <p className="text-xs text-warm-gray mt-0.5">Diskusi offline setiap minggu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              {upcoming.map((item) => (
                <div key={item.id} className="p-6 rounded-2xl bg-background border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-xs uppercase tracking-wider text-warm-gray font-medium">Minggu</div>
                      <div className="text-[11px] text-warm-gray-light mt-1">16:00</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h3 className="text-base font-semibold text-espresso">{item.title}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-sage/10 text-sage-dark">Mendatang</span>
                      </div>
                      <p className="text-sm text-warm-gray leading-relaxed">{item.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-warm-gray-light">
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                          {item.attendees} peserta
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {upcoming.length === 0 && (
                <div className="p-6 rounded-2xl bg-background border border-cream-dark/30 text-center text-sm text-warm-gray">Belum ada jadwal diskusi mendatang.</div>
              )}
            </div>

            {past.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-espresso">Diskusi Sebelumnya</h3>
                {past.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-background/60 border border-cream-dark/20">
                    <h4 className="text-sm font-semibold text-espresso">{item.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-warm-gray-light">
                      <span>{item.date}</span>
                      <span className="text-cream-dark">•</span>
                      <span>{item.attendees} peserta</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
