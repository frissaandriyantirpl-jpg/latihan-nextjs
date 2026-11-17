import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EventKu - Jelajahi, Pesan, Hadir",
  description: "Semua event sekolah dalam satu tempat. Workshop, lomba, konser, dan bazar — praktis dan profesional.",
  keywords: ["event sekolah", "workshop", "lomba", "konser", "bazar", "EventKu"],
  authors: [{ name: "EventKu - XII RPL 1" }],
  openGraph: {
    title: "EventKu - Jelajahi, Pesan, Hadir",
    description: "Semua event sekolah dalam satu tempat.",
    type: "website",
  },
};

const FOOTER_MENU = [
  { href: "/", label: "🏠 Beranda", desc: "Mulai dari sini" },
  { href: "/event", label: "🎪 Event", desc: "Jelajahi semua" },
  { href: "/favorit", label: "❤️ Favorit", desc: "Yang kamu simpan" },
  { href: "/pesanan", label: "🎟 Pesanan", desc: "Cek tiketmu" },
  { href: "/tentang", label: "✨ Tentang", desc: "Kenalan yuk" },
  { href: "/kontak", label: "💬 Kontak", desc: "Hubungi kami" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen overflow-x-hidden bg-[#fffafc] text-[#2f1d2d] antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.06),transparent_28%)]" />
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <Navbar />

        <main className="mx-auto w-full max-w-7xl px-4 pb-6 pt-5 sm:px-6">
          <div className="min-h-[60vh] w-full">{children}</div>
        </main>

        <footer className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] border border-[#f0d4e2] bg-white text-[#2f1d2d] shadow-[0_18px_40px_rgba(236,72,153,0.06)]">
            <div className="h-[3px] w-full bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#f472b6]" />

            <div className="relative flex flex-col items-center justify-between gap-4 border-b border-[#f8dfe9] px-6 py-5 sm:px-8 md:flex-row">
              <div className="text-center md:text-left">
                <p className="text-lg font-black leading-tight text-[#2f1d2d]">
                  Jangan Sampai Kehabisan Tiket! <span className="animate-bounce inline-block">🎟</span>
                </p>
                <p className="text-sm text-[#6b4c62]">Event favorit kamu bisa habis kapan aja. Yuk cek sekarang!</p>
              </div>
              <Link
                href="/event"
                className="shrink-0 rounded-full bg-[#ec4899] px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(236,72,153,0.2)] transition hover:scale-105 active:scale-95"
              >
                🎪 Lihat Event →
              </Link>
            </div>

            <div className="relative flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 max-w-md">
                <p className="flex flex-wrap items-center gap-2.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9d0e3] via-[#f472b6] to-[#ec4899] text-lg font-black text-white shadow-[0_10px_25px_rgba(236,72,153,0.18)]">
                    E
                  </span>
                  <span className="text-[22px] font-black leading-none text-[#2f1d2d]">
                    Event<span className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] bg-clip-text text-transparent">Ku</span>
                  </span>
                  <span className="rounded-full bg-[#fff1f6] px-2.5 py-1 text-[11px] font-black text-[#be185d]">
                    XII RPL 1
                  </span>
                  <span className="rounded-full bg-[#fce7f3] px-2.5 py-1 text-[11px] font-black text-[#be185d]">🏆 JUARA 1</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#6b4c62]">
                  🎪 Semua event sekolah dalam satu tempat. Jelajahi, pesan, hadir dengan tampilan yang lebih rapi, efisien, dan profesional.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1.5 text-[11px] font-bold text-[#be185d]">⚡ Cepat</span>
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1.5 text-[11px] font-bold text-[#be185d]">🔒 Aman</span>
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1.5 text-[11px] font-bold text-[#be185d]">🎨 Profesional</span>
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1.5 text-[11px] font-bold text-[#be185d]">✨ Rapi</span>
                </div>
                <p className="mt-4 text-[12px] text-[#8b6a7d]">
                  📍 Sekolah • 🕐 Senin - Sabtu • 💬 DM kami kalau ada pertanyaan
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 sm:max-w-[360px] sm:grid-cols-3">
                {FOOTER_MENU.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="group rounded-2xl border border-[#f8dfe9] bg-[#fffafc] px-4 py-3 text-center transition hover:-translate-y-0.5 hover:border-[#f9a8d4] hover:bg-[#fff1f6]"
                  >
                    <span className="block text-sm font-black text-[#2f1d2d]">{m.label}</span>
                    <span className="mt-0.5 block text-[11px] text-[#8b6a7d]">{m.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-between gap-2 border-t border-[#f8dfe9] px-6 py-4 text-center text-xs text-[#8b6a7d] sm:px-8 md:flex-row md:text-left">
              <p>© 2026 EventKu • XII RPL 1 • Dibuat dengan ❤️</p>
              <p className="font-bold text-[#be185d]">✨ Pink & White • Profesional ✨</p>
              <p>Versi 2026.11.16</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
