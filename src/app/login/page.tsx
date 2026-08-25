"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.ok) {
      router.push("/");
    } else {
      setError(result.error || "Login gagal");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-lg bg-espresso flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cream" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-espresso tracking-tight">Masuk ke RUBUK</h1>
          <p className="text-sm text-warm-gray">Masuk untuk berdiskusi dan bergabung dengan komunitas RUBUK.</p>
        </div>

        <div className="p-8 rounded-2xl bg-parchment border border-cream-dark/30 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>
            )}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-mocha">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors" placeholder="contoh@email.com" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-mocha">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors" placeholder="Masukkan password" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-espresso text-cream font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm hover:shadow-md text-sm disabled:opacity-50">
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
