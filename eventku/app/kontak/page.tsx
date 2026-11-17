"use client";

import { useState } from "react";
import Link from "next/link";

const WA = "https://wa.me/6285729461830?text=Halo%20EventKu!%20Saya%20mau%20tanya%20soal%20event.";
const WA_EVENT = "https://wa.me/6285729461830?text=Halo%20EventKu!%20Saya%20mau%20ngadain%20event%20nih%20🎪";
const EMAIL = "eventku@mail.com";

export default function Kontak() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [faqBuka, setFaqBuka] = useState(0);

  const kirimPesan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) return;
    // Buka WA langsung dengan pesan yang udah diisi - tanpa backend!
    const teks = encodeURIComponent(`Halo EventKu! Saya ${nama}. ${pesan}`);
    window.open(`https://wa.me/6285729461830?text=${teks}`, "_blank");
    setTerkirim(true);
    setTimeout(() => setTerkirim(false), 4000);
  };

  const faq = [
    { q: "Gimana cara pesan tiket?", a: "Pilih event di halaman Event → klik Pesan Sekarang → isi form → otomatis masuk ke Daftar Pesanan. Gampang, 1 menit beres!" },
    { q: "Bisa batalin pesanan nggak?", a: "Bisa! Buka halaman Pesanan, klik tombol Hapus di pesanan yang mau dibatalin. Langsung hilang." },
    { q: "Tiketnya bisa ditransfer?", a: "Bisa dong. Tinggal kasih tau nama temen kamu yang gantiin, chat aja kami di WA biar kami catat." },
    { q: "Mau ngadain event, gimana caranya?", a: "Klik tombol Chat WA di bawah, ceritain ide event kamu. Tim kami bakal bantu dari awal sampai event jalan!" },
  ];

  const kontakCepat = [
    { href: WA, emoji: "💬", judul: "WhatsApp", nilai: "+62 812-3456-7890", sub: "Fast respon • Online", warna: "from-emerald-400 to-teal-500", badge: "PALING CEPAT ⚡" },
    { href: `mailto:${EMAIL}`, emoji: "📧", judul: "Email", nilai: "eventku@mail.com", sub: "Dibalas < 1x24 jam", warna: "from-pink-500 to-rose-500", badge: "RESMI ✉️" },
    { href: WA, emoji: "📍", judul: "Lokasi", nilai: "Ruang OSIS, Gedung A Lt. 2", sub: "Datang aja, pintunya terbuka", warna: "from-violet-500 to-indigo-600", badge: "MAMPIR YUK 🏫" },
    { href: WA, emoji: "⏰", judul: "Jam Layanan", nilai: "Senin - Jumat", sub: "08.00 - 16.00 WIB", warna: "from-amber-400 to-orange-500", badge: "SIAGA 🕐" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-5 text-white">
      {/* ===== HERO SPLIT - BEDA TOTAL! Bukan lagi 1 kotak kuning ===== */}
      <div className="grid gap-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl md:grid-cols-[1.2fr_1fr]">
        {/* Kiri - Teks */}
        <div className="relative p-6 md:p-8">
          <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
            <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
            ONLINE • FAST RESPON
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
            Butuh Bantuan?
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">Chat Kami Aja!</span>
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">
            Ada pertanyaan soal tiket, event, atau mau ngadain event sendiri? Tim kami siap bantu — biasanya dibalas dalam hitungan menit, bukan hitungan hari!
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={WA} target="_blank" className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95">💬 Chat WA Sekarang →</a>
            <a href={`mailto:${EMAIL}`} className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-black transition hover:bg-white/20">📧 Kirim Email</a>
          </div>
          <p className="mt-4 text-[12px] text-white/40">⏱ Rata-rata dibalas: <b className="text-white">± 5 menit</b> di jam layanan • ⭐ Rating: <b className="text-white">4.9 / 5</b> dari 200+ chat</p>
        </div>

        {/* Kanan - Kartu WA Besar (BEDA! Dulu nggak ada) */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-6 text-white md:p-7">
          <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
          <div>
            <p className="text-5xl">💬</p>
            <p className="mt-3 text-lg font-black leading-tight">WhatsApp<br />EventKu</p>
            <p className="mt-1 text-sm text-white/80">Klik, langsung kebuka chat-nya. Nggak perlu save nomor dulu!</p>
          </div>
          <div className="mt-5">
            <p className="rounded-2xl bg-black/20 px-4 py-3 text-center text-lg font-black tracking-wide">+62 857-2946-1830</p>
            <a href={WA} target="_blank" className="mt-3 block rounded-full bg-white px-5 py-3 text-center text-sm font-black text-emerald-600 shadow transition hover:scale-105 active:scale-95">Buka Chat WA →</a>
          </div>
        </div>
      </div>

      {/* ===== FORM PESAN - BARU! Dulu nggak ada form ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">✍️ KIRIM PESAN LANGSUNG — TANPA SAVE NOMOR:</p>
        <form onSubmit={kirimPesan} className="mt-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-white/70">Nama Kamu</label>
            <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Andi Kelas XII RPL 1" className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-pink-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-white/70">Pesan Kamu</label>
            <textarea value={pesan} onChange={(e) => setPesan(e.target.value)} rows={3} placeholder="Contoh: Kak, tiket Workshop Coding masih ada nggak?" className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-pink-400 focus:outline-none" />
          </div>
          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 py-3.5 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-[1.02] active:scale-[0.98]">
            💬 Kirim ke WhatsApp →
          </button>
          {terkirim && <p className="rounded-2xl bg-emerald-400/20 px-4 py-3 text-center text-sm font-bold text-emerald-300">✅ Siap! WhatsApp-nya udah kebuka, tinggal pencet kirim di sana!</p>}
          <p className="text-center text-[11px] text-white/40">Pesanmu langsung masuk ke WhatsApp kami: <b className="text-white">+62 812-3456-7890</b></p>
        </form>
      </div>

      {/* ===== KONTAK CEPAT - 4 Card, Desain Baru ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">📞 SEMUA CARA BUAT HUBUNGIN KAMI:</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {kontakCepat.map((k) => (
            <a key={k.judul} href={k.href} target={k.href.startsWith("http") ? "_blank" : undefined} className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/10 p-5 transition hover:bg-white/20 hover:scale-[1.02]">
              <span className={`inline-block rounded-full bg-gradient-to-r ${k.warna} px-2.5 py-1 text-[10px] font-black text-white`}>{k.badge}</span>
              <p className="mt-3 text-2xl transition group-hover:scale-110">{k.emoji}</p>
              <p className="mt-1 font-black">{k.judul}</p>
              <p className="mt-0.5 text-sm font-black text-white">{k.nilai}</p>
              <p className="text-xs text-white/60">{k.sub}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ===== FAQ - BARU! Dulu nggak ada ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">❓ PERTANYAAN YANG SERING DITANYAIN:</p>
        <div className="mt-4 space-y-2">
          {faq.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-white/15 bg-white/10">
              <button onClick={() => setFaqBuka(faqBuka === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-black">
                <span>{f.q}</span>
                <span className={`shrink-0 transition ${faqBuka === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {faqBuka === i && <p className="px-4 pb-4 text-sm leading-relaxed text-white/70">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA NGADAIN EVENT - BEDA! Bukan lagi kotak hitam polos ===== */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 p-6 text-white shadow-[0_20px_50px_rgba(236,72,153,0.45)] md:p-8">
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black tracking-[0.22em] text-white/80">🎪 PUNYA IDE EVENT GILA?</p>
            <h2 className="mt-1 text-xl font-black">Mau Ngadain Event? 🎪</h2>
            <p className="text-sm text-white/80">Ceritain ide event kamu. Kami bantu wujudin sampai jadi nyata!</p>
          </div>
          <a href={WA_EVENT} target="_blank" className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-black text-pink-600 shadow transition hover:scale-105 active:scale-95">Chat WA →</a>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/20">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
