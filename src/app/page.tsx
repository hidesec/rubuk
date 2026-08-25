"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WeeklyDiscussion from "@/components/WeeklyDiscussion";
import PopularBooks from "@/components/PopularBooks";
import RecentStories from "@/components/RecentStories";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    fetch("/api/setup", { method: "POST" }).then(() => setDbReady(true)).catch(() => setDbReady(true));
  }, []);

  return (
    <>
      <Hero />
      <Features />
      {dbReady && <PopularBooks />}
      {dbReady && <RecentStories />}
      {dbReady && <WeeklyDiscussion />}
      <Testimonials />
      <CTA />
    </>
  );
}
