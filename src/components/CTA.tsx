"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-espresso p-10 sm:p-14 lg:p-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream tracking-tight leading-tight">
              Siap Memulai Perjalanan
              <br />
              Membacamu?
            </h2>
            <p className="text-cream/50 leading-relaxed">
              Bergabunglah dengan RUBUK hari ini dan temukan komunitas yang memahami
              keindahan dari setiap halaman yang dibaca. Gratis dan terbuka untuk semua.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/community"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-espresso font-semibold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20 text-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Bergabung Sekarang
              </Link>
              <Link
                href="/discussions"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-cream/15 text-cream/70 font-medium rounded-xl hover:bg-cream/5 hover:text-cream transition-all text-sm"
              >
                Lihat Jadwal Diskusi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
