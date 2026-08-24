"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-parchment via-background to-background">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-espresso) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream border border-cream-dark/50 rounded-full text-xs font-medium text-mocha tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              Diskusi buku setiap minggu
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-espresso leading-[1.1] tracking-tight">
              Setiap Buku
              <br />
              <span className="relative">
                Adalah Sebuah
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-gold/30"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8c30-6 60-8 90-6s60 4 106-2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="text-mocha">Petualangan</span>
            </h1>

            <p className="text-warm-gray text-lg leading-relaxed max-w-lg">
              Bergabunglah dengan komunitas RUBUK — tempat para pecinta buku berkumpul untuk
              berbagi cerita, berdiskusi, dan menumbuhkan kebiasaan membaca bersama.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/discussions"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-espresso text-cream font-medium rounded-xl hover:bg-mocha transition-all shadow-lg shadow-espresso/10 hover:shadow-xl hover:shadow-espresso/15 text-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
                Ikut Diskusi
              </Link>
              <Link
                href="/books"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-cream border border-cream-dark/50 text-espresso font-medium rounded-xl hover:bg-cream-dark/40 transition-all text-sm"
              >
                Jelajahi Buku
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              {[
                { value: "50+", label: "Anggota" },
                { value: "3", label: "Judul Buku" },
                { value: "1", label: "Diskusi" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-espresso">{stat.value}</div>
                  <div className="text-xs text-warm-gray mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative animate-fade-in stagger-3">
              <div className="absolute -inset-4 bg-gradient-to-br from-cream to-cream-dark rounded-3xl opacity-50 blur-sm" />
              <div className="relative bg-cream rounded-2xl p-8 shadow-xl shadow-espresso/5 border border-cream-dark/30">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-22 bg-mocha rounded-lg shadow-md flex-shrink-0 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        className="w-8 h-8 text-cream/60"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-espresso text-sm">
                        Diskusi Minggu Depan
                      </h4>
                      <p className="text-xs text-warm-gray mt-0.5">
                        Minggu, 30 Agustus 2026
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-cream-dark/60" />
                  <div className="flex items-center gap-3 text-xs text-warm-gray">
                    <div className="flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-3.5 h-3.5 text-sage"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      Minggu, 30 Agustus 16:00
                    </div>
                    <span className="text-cream-dark">•</span>
                    <div className="flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-3.5 h-3.5 text-gold"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      Taman Anggrek, Jakarta
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex -space-x-2">
                      {[
                        "bg-sage",
                        "bg-sienna",
                        "bg-mocha",
                        "bg-gold",
                      ].map((bg, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 rounded-full ${bg} border-2 border-cream flex items-center justify-center text-[9px] text-white font-medium`}
                        >
                          {["S", "D", "A", "B"][i]}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-warm-gray">
                      +5 akan hadir
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 animate-gentle-float">
              <div className="bg-background rounded-xl px-4 py-3 shadow-lg border border-cream-dark/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 text-sage"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">5 Buku</p>
                  <p className="text-[10px] text-warm-gray">dibaca bulan ini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
