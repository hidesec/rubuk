import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WeeklyDiscussion from "@/components/WeeklyDiscussion";
import PopularBooks from "@/components/PopularBooks";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PopularBooks />
      <WeeklyDiscussion />
      <Testimonials />
      <CTA />
    </>
  );
}
