"use client";

const books = [
  {
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    genre: "Fiksi",
    pages: 380,
    rating: 4.7,
    color: "bg-mocha",
  },
  {
    title: "Bumi",
    author: "Tere Liye",
    genre: "Fiksi Fantasi",
    pages: 436,
    rating: 4.5,
    color: "bg-sage-dark",
  },
  {
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    genre: "Non-Fiksi",
    pages: 304,
    rating: 4.6,
    color: "bg-sienna",
  },
  {
    title: "Pulang",
    author: "Tere Liye",
    genre: "Fiksi",
    pages: 368,
    rating: 4.4,
    color: "bg-sepia",
  },
  {
    title: "Autobiografi B.J. Habibie",
    author: "B.J. Habibie",
    genre: "Biografi",
    pages: 420,
    rating: 4.8,
    color: "bg-espresso",
  },
  {
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    genre: "Fiksi",
    pages: 336,
    rating: 4.3,
    color: "bg-gold",
  },
];

export default function PopularBooks() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Koleksi Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight">
              Buku yang Sedang Dibahas
            </h2>
            <p className="text-warm-gray max-w-lg leading-relaxed">
              Daftar buku yang menjadi bahan diskusi utama di komunitas kami.
            </p>
          </div>
          <a
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-medium text-mocha hover:text-espresso transition-colors"
          >
            Lihat Semua
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => (
            <div
              key={book.title}
              className="group p-5 rounded-2xl bg-parchment border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-lg hover:shadow-espresso/5 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-24 ${book.color} rounded-lg shadow-md flex items-center justify-center`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-7 h-7 text-white/50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-espresso truncate group-hover:text-mocha transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-warm-gray mt-0.5">{book.author}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-cream border border-cream-dark/30 text-warm-gray">
                      {book.genre}
                    </span>
                    <span className="text-[11px] text-warm-gray-light">
                      {book.pages} hal
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-semibold text-espresso">{book.rating}</span>
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
