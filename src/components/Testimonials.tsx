"use client";

const testimonials = [
  {
    quote:
      "RUBUK mengubah cara saya membaca. Dulu saya membaca sendirian, sekarang setiap buku punya makna yang lebih dalam karena bisa didiskusikan bersama.",
    name: "Shinta Kumala Dewi",
    role: "Anggota sejak 2023",
    initial: "R",
    color: "bg-sage",
  },
  {
    quote:
      "Diskusi offline-nya luar biasa. Ketemu orang-orang yang punya passion sama, dan ternyata banyak perspektif baru yang saya tidak dapat dari membaca sendiri.",
    name: "Ahmad Fadli",
    role: "Anggota Aktif",
    initial: "A",
    color: "bg-mocha",
  },
  {
    quote:
      "Sejak bergabung, saya membaca 3x lebih banyak buku. Tantangan bulanan dan semangat komunitas benar-benar memotivasi.",
    name: "Dewi Sartika",
    role: "Anggota sejak 2024",
    initial: "D",
    color: "bg-sienna",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Cerita Mereka
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight">
            Kata Anggota Kami
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Pengalaman nyata dari mereka yang telah merasakan kehangatan komunitas RUBUK.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative p-7 rounded-2xl bg-background border border-cream-dark/30 hover:shadow-lg hover:shadow-espresso/5 transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-cream-dark mb-4"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.692 11 13.182 11 15c0 1.933-1.567 3.5-3.5 3.5-1.183 0-2.307-.527-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.692 21 13.182 21 15c0 1.933-1.567 3.5-3.5 3.5-1.183 0-2.307-.527-2.917-1.179z" />
              </svg>
              <p className="text-sm text-mocha leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-cream-dark/30">
                <div
                  className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-sm font-bold text-white`}
                >
                  {item.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-espresso">{item.name}</p>
                  <p className="text-xs text-warm-gray">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
