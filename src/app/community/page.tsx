"use client";

import { useState, useEffect } from "react";

const avatarColors = ["bg-sage", "bg-mocha", "bg-sienna", "bg-sepia", "bg-gold", "bg-espresso", "bg-sage-dark"];

interface Member {
  id: number;
  name: string;
  city: string;
  role: string;
  favorite: string;
}

const benefits = [
  {
    title: "Gratis Sepenuhnya",
    description: "Tidak ada biaya pendaftaran atau iuran bulanan. RUBUK adalah komunitas nirlaba.",
  },
  {
    title: "Akses Diskusi Lengkap",
    description: "Ikut semua sesi diskusi offline dan online tanpa batasan.",
  },
  {
    title: "Rekomendasi Personal",
    description: "Dapatkan rekomendasi buku yang disesuaikan dengan minatmu.",
  },
  {
    title: "Tantangan Membaca",
    description: "Ikuti tantangan bulanan dan dapatkan badge serta pengakuan.",
  },
  {
    title: "Tukar Buku",
    description: "Program tukar-menukar buku fisik antar anggota secara rutin.",
  },
  {
    title: "Jaringan Literasi",
    description: "Terhubung dengan penulis, penerbit, dan tokoh literasi nasional.",
  },
];

export default function CommunityPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    interest: "",
  });

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((d) => { if (d.ok) setMembers(d.members); })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const d = await res.json();
    if (d.ok) {
      alert(`Terima kasih, ${formData.name}! Pendaftaran kamu akan kami proses.`);
      setFormData({ name: "", email: "", city: "", interest: "" });
    } else {
      alert("Gagal mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
            Komunitas
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-espresso tracking-tight">
            Bergabung dengan RUBUK
          </h1>
          <p className="text-warm-gray leading-relaxed">
            Temukan rumah bagi kecintaanmu pada buku. Kami menunggumu di sini.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-espresso tracking-tight">
              Keuntungan Bergabung
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-parchment border border-cream-dark/30"
                >
                  <h3 className="text-sm font-semibold text-espresso mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-espresso mb-4">
                Anggota Kami
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {members.map((member, i) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background border border-cream-dark/30"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-espresso truncate">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-warm-gray truncate">
                        {member.role === "owner" ? "Owner" : "Anggota"} · {member.city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-parchment border border-cream-dark/30">
              <h2 className="text-xl font-bold text-espresso mb-6">
                Formulir Pendaftaran
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                    placeholder="contoh@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">
                    Kota
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso placeholder-warm-gray-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                    placeholder="Kota domisili"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mocha mb-1.5">
                    Genre Favorit
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-cream-dark/40 text-sm text-espresso focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                  >
                    <option value="">Pilih genre favorit</option>
                    <option value="fiksi">Fiksi</option>
                    <option value="non-fiksi">Non-Fiksi</option>
                    <option value="biografi">Biografi</option>
                    <option value="puisi">Puisi</option>
                    <option value="filosfi">Filosofi</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-espresso text-cream font-medium rounded-xl hover:bg-mocha transition-colors shadow-sm hover:shadow-md text-sm"
                >
                  Daftar Sekarang
                </button>
                <p className="text-[11px] text-warm-gray-light text-center">
                  Dengan mendaftar, kamu menyetujui untuk mengikuti etika dan aturan komunitas RUBUK.
                </p>
              </form>
            </div>

            <div className="p-6 rounded-2xl bg-espresso text-cream">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gold-light">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cream mb-1">
                    Punya Pertanyaan?
                  </h3>
                  <p className="text-xs text-cream/50 leading-relaxed">
                    Hubungi kami di{" "}
                    <span className="text-gold-light">hello@rubuk.id</span> 
                    {/* atau
                    datang langsung ke sesi diskusi terdekat di kotamu. */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
