import Link from "next/link";

const footerLinks = {
  navigasi: [
    { href: "/", label: "Beranda" },
    { href: "/books", label: "Koleksi Buku" },
    { href: "/discussions", label: "Diskusi Mingguan" },
    { href: "/community", label: "Komunitas" },
  ],
  sumber: [
    { href: "/about", label: "Tentang RUBUK" },
    { href: "/discussions", label: "Jadwal Offline" },
    { href: "/community", label: "Bergabung" },
    { href: "/books", label: "Rekomendasi Buku" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-lg bg-cream/10 flex items-center justify-center group-hover:bg-cream/20 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-gold-light"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-cream leading-none">
                  RUBUK
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-cream/40 leading-none mt-1">
                  Ruang Baca Buku
                </span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed max-w-sm mb-8">
              Komunitas yang lahir dari kecintaan terhadap buku. Kami percaya bahwa membaca
              bukan sekadar hobi, melainkan jalan menuju pemahaman yang lebih dalam tentang
              diri sendiri dan dunia.
            </p>
            <div className="flex items-center gap-3">
              {["Instagram", "Twitter", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-cream/5 flex items-center justify-center text-cream/40 hover:bg-cream/10 hover:text-cream/70 transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs uppercase tracking-[0.15em] text-cream/30 font-semibold mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 hover:text-gold-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} RUBUK — Ruang Baca Buku. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-cream/20 italic">
            &ldquo;Membaca adalah perjalanan tanpa akhir.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
