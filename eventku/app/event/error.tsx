"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  const [mencobaLagi, setMencobaLagi] = useState(false);
  const [hitung, setHitung] = useState(0);

  // Log error ke console biar gampang debug (Next.js best practice)
  useEffect(() => {
    if (error) console.error("EventKu Error:", error);
  }, [error]);

  const cobaLagi = () => {
    setMencobaLagi(true);
    setHitung((h) => h + 1);
    // Kasih jeda dikit biar animasi kelihatan, baru reset beneran
    setTimeout(() => reset(), 400);
  };

  return (
    <div className="mx-auto max-w-xl text-white">
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-8 text-center shadow-[0_25px_60px_rgba(236,72,153,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />

        {/* Badge Error */}
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-rose-400" />
          </span>
          OOPS • ADA YANG ERROR • BUKAN SALAH KAMU
        </span>

        {/* Emoji + Glow */}
        <div className="relative mt-6">
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 opacity-30 blur-2xl" />
          <p className="relative animate-bounce text-6xl">😢</p>
        </div>

        <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
          Gagal Memuat{" "}
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Event
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-white/60">
          Tenang, bukan salah kamu kok! Mungkin internetnya lagi ngambek, atau servernya lagi istirahat sebentar. Coba lagi, biasanya langsung beres!
        </p>

        {/* Detail error buat debug - cuma kelihatan kalau ada error beneran */}
        {error?.message && (
          <p className="mx-auto mt-3 max-w-sm rounded-2xl bg-rose-500/15 px-4 py-2.5 text-left text-xs leading-relaxed text-rose-200">
            <b className="text-white">Detail (buat debug):</b> {error.message}
            {error.digest && <span className="block text-white/50">Kode: {error.digest}</span>}
          </p>
        )}

        {/* Tombol Coba Lagi - UTAMA */}
        <button
          onClick={cobaLagi}
          disabled={mencobaLagi}
          className="group relative mt-5 w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 py-3.5 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 sm:w-auto sm:px-8"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">{mencobaLagi ? "⏳ Mencoba Lagi..." : "🔄 Coba Lagi"}</span>
        </button>

        {hitung > 0 && (
          <p className="mt-2 text-[12px] text-white/40">
            Sudah dicoba {hitung}x. Kalau masih error, coba cara di bawah ya!
          </p>
        )}

        {/* Cara Lain - Biar user nggak mentok */}
        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/15 bg-white/10 p-4 text-left">
          <p className="text-[11px] font-black tracking-[0.22em] text-white/60">🛠️ KALAU MASIH ERROR, COBA INI:</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { emoji: "📶", judul: "Cek Internet", desc: "Matikan WiFi, nyalakan lagi" },
              { emoji: "🔄", judul: "Refresh", desc: "Tekan F5 / tarik ke bawah" },
              { emoji: "💬", judul: "Chat Kami", desc: "Kami bantu langsung!" },
            ].map((c) => (
              <div key={c.judul} className="rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-center transition hover:bg-white/20">
                <p className="text-xl">{c.emoji}</p>
                <p className="mt-1 text-xs font-black">{c.judul}</p>
                <p className="text-[11px] leading-relaxed text-white/60">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link Alternatif */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition hover:bg-white/20 hover:text-white">
            🏠 Ke Beranda
          </Link>
          <Link href="/event" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition hover:bg-white/20 hover:text-white">
            🎪 Ke Semua Event
          </Link>
          <Link href="/kontak" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 transition hover:bg-white/20 hover:text-white">
            💬 Hubungi Kami
          </Link>
        </div>
      </div>

      <p className="mt-4 text-center text-[12px] text-white/40">
        Error ini cuma sementara. Event serunya masih nungguin kamu kok! 🎪
      </p>
    </div>
  );
}
