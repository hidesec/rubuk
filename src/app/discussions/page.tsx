"use client";

const schedule = [
  {
    day: "Minggu",
    time: "16:00 — 17:30",
    title: "Diskusi Rutin Mingguan",
    description: "Kami berkumpul dan berdiskusi tentang buku pilihan komunitas. Datang, duduk, dan bicara.",
    location: "Taman Anggrek, samping Tuku GBK",
    nextDate: "30 Agustus 2026",
    attendees: 10,
    status: "next",
  },
];

const pastDiscussions = [
  {
    title: "Diskusi Perdana RUBUK",
    date: "23 Agustus 2026",
    participants: 8,
    theme: "Pengenalan Komunitas",
  },
];

export default function DiscussionsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Diskusi
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight">
            Jadwal Diskusi
          </h1>
          <p className="text-warm-gray leading-relaxed">
            Kami bertemu setiap minggu untuk berbagi cerita, pendapat, dan perspektif tentang
            buku-buku yang kami baca bersama.
          </p>
        </div>

        <div className="space-y-6 mb-20">
          {schedule.map((item) => (
            <div
              key={item.title}
              className={`p-7 rounded-2xl border transition-all duration-300 ${
                item.status === "next"
                  ? "bg-parchment border-gold/30 shadow-lg shadow-gold/5"
                  : "bg-background border-cream-dark/30 hover:border-cream-dark/60"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0 lg:w-48">
                  <div className="text-xs uppercase tracking-wider text-warm-gray font-medium mb-1">
                    {item.day}
                  </div>
                  <div className="text-sm text-warm-gray-light mb-3">
                    {item.time}
                  </div>
                  {item.status === "next" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold/10 text-gold">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      Sesi Berikutnya
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-espresso mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-warm-gray-light">
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {item.nextDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {item.attendees} peserta
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-espresso tracking-tight">
            Diskusi Sebelumnya
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {pastDiscussions.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-parchment border border-cream-dark/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream border border-cream-dark/30 text-warm-gray">
                    {item.theme}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-espresso mb-1.5">
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-warm-gray-light">
                  <span>{item.date}</span>
                  <span className="text-cream-dark">•</span>
                  <span>{item.participants} peserta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
