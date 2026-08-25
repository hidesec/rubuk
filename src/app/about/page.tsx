import Link from "next/link";

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Kebebasan Berpikir",
    description: "Setiap perspektif dihargai. Kami percaya bahwa keberagaman pemikiran justru memperkaya diskusi.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Kebersamaan",
    description: "Kami percaya kekuatan terbesar ada pada komunitas. Bersama, kita bisa tumbuh lebih cepat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: "Keberlanjutan",
    description: "Membaca adalah investasi jangka panjang. Kami berkomitmen menjaga semangat literasi tetap menyala.",
  },
];

const timeline = [
  { year: "2026", event: "Shinta Kumala Dewi memposting keinginan punya komunitas baca di Threads" },
  { year: "2026", event: "Grup baca WhatsApp didirikan dan mulai aktif berdiskusi" },
  { year: "2026", event: "RUBUK resmi berdiri dan mengadakan diskusi offline pertama di Jakarta" },
];

export default function AboutPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20 space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Tentang Kami
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight leading-tight">
            RUBUK Baru Dimulai
          </h1>
          <p className="text-lg text-warm-gray leading-relaxed">
            Baru dimulai pada tahun 2026, tapi semangat kami untuk membangun budaya membaca
            sudah menyala sejak hari pertama.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-espresso tracking-tight">
              Cerita Kami
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                Semua berawal dari postingan iseng di Threads oleh Shinta Kumala Dewi — sebuah
                curhatan sederhana tentang keinginan punya komunitas baca buku. Siapa sangka,
                postingan itu mendapat respons luar biasa dari banyak orang yang ternyata punya
                keinginan yang sama.
              </p>
              <p>
                Dari sana, Shinta kemudian membuat grup baca di WhatsApp. Satu orang, dua orang,
                terus bertambah. Diskusi ringan tentang buku yang baru dibaca, rekomendasi dari
                hati ke hati, dan semangat yang menular membuat grup itu hidup dan terus berkembang.
              </p>
              <p>
                Hingga akhirnya tercetuslah nama RUBUK — Ruang Baca Buku. Sebuah komunitas yang
                lahir dari ketidaksengajaan namun didorong oleh kecintaan yang tulus terhadap
                literasi.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-espresso">Perjalanan Kami</h3>
            <div className="relative pl-8 border-l-2 border-cream-dark/50 space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] w-4 h-4 rounded-full bg-cream border-[3px] border-gold" />
                  <div>
                    <span className="text-xs font-bold text-gold tracking-wider">{item.year}</span>
                    <p className="text-sm text-warm-gray mt-0.5">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20 space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Nilai-nilai Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight">
              Apa yang Kami Junjung
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl bg-parchment border border-cream-dark/30 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-mocha mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-espresso mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-espresso tracking-tight">
            Ingin Bergabung?
          </h2>
          <p className="text-warm-gray leading-relaxed">
            Kami terbuka untuk siapa saja yang mencintai buku. Tidak ada biaya, tidak ada
            syarat — hanya semangat membaca yang kami harapkan.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-espresso text-cream font-medium rounded-xl hover:bg-mocha transition-all shadow-lg shadow-espresso/10 text-sm"
          >
            Bergabung dengan RUBUK
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
