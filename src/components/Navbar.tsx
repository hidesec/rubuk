"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/books", label: "Buku" },
  { href: "/cerita", label: "Cerita" },
  { href: "/discussions", label: "Diskusi" },
  { href: "/community", label: "Komunitas" },
  { href: "/about", label: "Tentang" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-cream-dark/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-espresso flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cream" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-espresso leading-none">RUBUK</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-gray leading-none mt-0.5">Ruang Baca Buku</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "text-espresso bg-cream" : "text-warm-gray hover:text-espresso hover:bg-cream/60"}`}>
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold rounded-full" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {["admin", "owner"].includes(user.role) && (
                  <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-warm-gray hover:text-espresso transition-colors">
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-espresso flex items-center justify-center text-xs font-bold text-cream">
                    {user.name[0]}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-espresso">{user.name}</p>
                    <p className="text-warm-gray capitalize">{user.role}</p>
                  </div>
                  <button onClick={logout} className="ml-2 px-3 py-1.5 text-xs font-medium text-warm-gray hover:text-espresso border border-cream-dark/40 rounded-lg hover:border-cream-dark transition-colors">
                    Keluar
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm hover:shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Masuk
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-cream transition-colors" aria-label="Toggle menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-espresso rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 bg-espresso rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 bg-espresso rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 pt-2 space-y-1 bg-cream/50 border-t border-cream-dark/30">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-cream text-espresso" : "text-warm-gray hover:bg-cream/60 hover:text-espresso"}`}>
                {link.label}
              </Link>
            );
          })}
          {user ? (
            <>
              {["admin", "owner"].includes(user.role) && (
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-warm-gray hover:bg-cream/60 hover:text-espresso">
                  Dashboard
                </Link>
              )}
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-warm-gray hover:bg-cream/60 hover:text-espresso">
                Keluar ({user.name})
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 mt-2 bg-espresso text-cream text-sm font-medium rounded-xl text-center">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
