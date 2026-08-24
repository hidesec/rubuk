"use client";

const schedule = [
  {
    day: "Minggu",
    time: "16:00 — 17:30",
    title: "Diskusi Rutin Mingguan",
    description: "Kami berkumpul dan berdiskusi tentang buku secara rutin setiap minggu",
    location: "Taman Anggrek, samping Tuku GBK",
    status: "upcoming",
  },
];

const upcomingEvents = [
  {
    date: "30 Agu",
    title: "Diskusi Minggu ke-2",
    speaker: "Semua Anggota",
    type: "Diskusi",
  },
  {
    date: "6 Sep",
    title: "Diskusi Minggu ke-3",
    speaker: "Semua Anggota",
    type: "Diskusi",
  },
  {
    date: "13 Sep",
    title: "Diskusi Minggu ke-4",
    speaker: "Semua Anggota",
    type: "Diskusi",
  },
];

export default function WeeklyDiscussion() {
  return (
    <section className="py-20 lg:py-28 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-sage-dark font-semibold">
              Jadwal Mingguan
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight leading-tight">
              Bertemu Setiap
              <br />
              Minggu Secara Offline
            </h2>
            <p className="text-warm-gray leading-relaxed">
              Kami percaya diskusi yang bermakna terjadi tatap muka. Bergabunglah
              dalam pertemuan rutin kami dan rasakan kehangatan komunitas yang sesungguhnya.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-cream-dark/30">
                <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-sage">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">Setiap Minggu</p>
                  <p className="text-xs text-warm-gray mt-0.5">Pukul 16:00 — 17:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-cream-dark/30">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
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
              {schedule.map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl bg-background border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-xs uppercase tracking-wider text-warm-gray font-medium">
                        {item.day}
                      </div>
                      <div className="text-[11px] text-warm-gray-light mt-1">
                        {item.time}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h3 className="text-base font-semibold text-espresso">
                          {item.title}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-sage/10 text-sage-dark">
                          {item.status === "upcoming" ? "Mendatang" : "Rutin"}
                        </span>
                      </div>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-warm-gray-light">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-espresso text-cream">
              <h3 className="text-sm font-semibold text-cream/90 mb-4 uppercase tracking-wider">
                Acara Mendatang
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.title}
                    className="flex items-center gap-4 p-3 rounded-xl bg-cream/5 hover:bg-cream/10 transition-colors"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-cream/10 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-cream/40 uppercase">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="text-lg font-bold text-cream leading-none">
                        {event.date.split(" ")[1]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-cream truncate">
                        {event.title}
                      </h4>
                      <p className="text-xs text-cream/40 mt-0.5">{event.speaker}</p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream/10 text-cream/60">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
