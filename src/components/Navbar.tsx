"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/books", label: "Buku" },
  { href: "/discussions", label: "Diskusi" },
  { href: "/community", label: "Komunitas" },
  { href: "/about", label: "Tentang" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-cream-dark/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-espresso flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-cream"
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
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-espresso leading-none">
                RUBUK
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-gray leading-none mt-0.5">
                Ruang Baca Buku
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-espresso bg-cream"
                      : "text-warm-gray hover:text-espresso hover:bg-cream/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/discussions"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm hover:shadow-md"
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
              Mulai Diskusi
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-cream transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-espresso rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-espresso rounded-full transition-all duration-200 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-espresso rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-cream/50 border-t border-cream-dark/30">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cream text-espresso"
                    : "text-warm-gray hover:bg-cream/60 hover:text-espresso"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/discussions"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 mt-2 bg-espresso text-cream text-sm font-medium rounded-xl text-center"
          >
            Mulai Diskusi
          </Link>
        </div>
      </div>
    </header>
  );
}
