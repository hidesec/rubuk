"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  content: string;
  book_title: string;
  created_at: string;
  users: { name: string; city: string } | null;
}

const avatarColors = ["bg-sage", "bg-mocha", "bg-sienna", "bg-sepia", "bg-gold", "bg-espresso", "bg-sage-dark"];

export default function RecentStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("/api/stories")
      .then((r) => r.json())
      .then((d) => { if (d.ok) setStories(d.stories); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => { el.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [stories]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Cerita</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-espresso tracking-tight">Cerita Mereka</h2>
            <p className="text-warm-gray leading-relaxed max-w-lg">Kisah membaca dari anggota RUBUK yang menginspirasi.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? "border-cream-dark/50 text-espresso hover:bg-cream hover:border-cream-dark" : "border-cream-dark/20 text-warm-gray-light cursor-not-allowed"}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? "border-cream-dark/50 text-espresso hover:bg-cream hover:border-cream-dark" : "border-cream-dark/20 text-warm-gray-light cursor-not-allowed"}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <Link href="/cerita" className="inline-flex items-center gap-2 text-sm font-medium text-mocha hover:text-espresso transition-colors ml-2">
              Lihat Semua
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
          {stories.map((story, i) => (
            <div key={story.id} className="flex-shrink-0 w-[340px] md:w-[calc(33.333%-16px)] p-6 rounded-2xl bg-parchment border border-cream-dark/30 hover:border-cream-dark/60 hover:shadow-lg hover:shadow-espresso/5 transition-all duration-300 snap-start">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                  {story.users?.name?.charAt(0) || "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-espresso truncate">{story.users?.name || "Anonim"}</p>
                  <p className="text-[10px] text-warm-gray">{story.users?.city || ""}</p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-espresso mb-2">{story.title}</h3>
              {story.book_title && (
                <p className="text-xs text-mocha mb-2 italic">Tentang: {story.book_title}</p>
              )}
              <p className="text-sm text-warm-gray leading-relaxed line-clamp-3">{story.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
