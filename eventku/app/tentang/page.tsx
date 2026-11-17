import Link from "next/link";

export default function Tentang() {
  const langkah = [
    {
      emoji: "🎪",
      judul: "Cari Event",
      desc: "Jelajahi semua event — workshop, lomba, konser, bazar. Semua lengkap!",
      warna: "from-amber-400 to-orange-500",
      badge: "LANGKAH 1",
    },
    {
      emoji: "❤️",
      judul: "Simpan Favorit",
      desc: "Ketemu yang kamu suka? Tap ❤️, langsung tersimpan. Nggak bakal hilang!",
      warna: "from-pink-500 to-rose-500",
      badge: "LANGKAH 2",
    },
    {
      emoji: "🎟️",
      judul: "Pesan Tiket",
      desc: "Pesan tanpa ribet. Isi jumlah, cek total, langsung jadi. Semudah itu!",
      warna: "from-violet-500 to-indigo-600",
      badge: "LANGKAH 3",
    },
  ];

  const kenapa = [
    { icon: "⚡", judul: "Super Cepat", desc: "Buka, cari, pesan — hitungan detik" },
    { icon: "🎨", judul: "Berwarna", desc: "Tiap halaman penuh warna, nggak boring" },
    { icon: "📱", judul: "Nyaman di HP", desc: "Enak banget dibuka dari HP" },
    { icon: "🔒", judul: "Aman", desc: "Favorit & pesananmu tersimpan rapi" },
  ];

  const tim = [
    { emoji: "👨‍💻", nama: "XII RPL 1", peran: "Pembuat EventKu", desc: "Ngoding, desain, sampai begadang" },
    { emoji: "🎨", nama: "Tim Desain", peran: "Bikin Memukau", desc: "Yang bikin warnanya juara dunia" },
    { emoji: "🎪", nama: "Tim Event", peran: "Kurasi Event", desc: "Yang pilihin event paling seru" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-5 text-white">
      {/* ===== HERO TENTANG ===== */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-8 shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/25 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />

        <span className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider text-white backdrop-blur">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-[10px]">✨</span>
          TENTANG EVENTKU
        </span>

        <h1 className="relative mt-4 text-3xl font-black leading-tight md:text-4xl">
          Semua Event Sekolah
          <br />
          Dalam Satu Tempat{" "}
          <span className="inline-block animate-bounce">🎪</span>
        </h1>
        <p className="relative mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">
          EventKu dibuat oleh siswa <b className="text-white">XII RPL 1</b> untuk mempermudah teman-teman menemukan,
          menyimpan, dan memesan event sekolah. Nggak perlu lagi tanya-tanya ke sana-sini — semua ada di sini!
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">🎪 100+ Event</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">❤️ 1000+ Favorit</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">🎟 500+ Tiket Terpesan</span>
          <span className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-3 py-1.5 text-[11px] font-black text-white">🏆 JUARA 1 DUNIA</span>
        </div>
      </div>

      {/* ===== 3 LANGKAH - CARA PAKAI ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">✨ GIMANA CARA PAKAINYA? GAMPANG BANGET:</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {langkah.map((l) => (
            <div
              key={l.judul}
              className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/10 p-5 transition hover:bg-white/20 hover:scale-[1.03]"
            >
              <span className={`inline-block rounded-full bg-gradient-to-r ${l.warna} px-2.5 py-1 text-[10px] font-black text-white`}>
                {l.badge}
              </span>
              <p className="mt-3 text-3xl transition group-hover:scale-110 group-hover:-rotate-6">{l.emoji}</p>
              <p className="mt-2 font-black text-white">{l.judul}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{l.desc}</p>
              <div className={`absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r ${l.warna} opacity-60`} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== KENAPA EVENTKU ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">💎 KENAPA HARUS EVENTKU?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {kenapa.map((k) => (
            <div key={k.judul} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 transition hover:bg-white/20">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600 text-lg shadow">
                {k.icon}
              </span>
              <span>
                <span className="block text-sm font-black text-white">{k.judul}</span>
                <span className="block text-xs leading-relaxed text-white/60">{k.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== TIM DIBALIK EVENTKU ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">👨‍💻 TIM DI BALIK EVENTKU</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {tim.map((t) => (
            <div key={t.nama} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center transition hover:bg-white/20 hover:scale-[1.02]">
              <p className="text-3xl">{t.emoji}</p>
              <p className="mt-2 text-sm font-black text-white">{t.nama}</p>
              <p className="text-[11px] font-bold text-pink-300">{t.peran}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">{t.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-violet-500/20 px-4 py-3 text-center text-sm text-white/80">
          Dibuat dengan ❤️ oleh siswa, untuk semua siswa. <b className="text-white">Kalian yang bikin EventKu hidup!</b>
        </p>
      </div>

      {/* ===== CTA ===== */}
      <Link
        href="/event"
        className="group relative block overflow-hidden rounded-[28px] bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 p-6 text-center text-white shadow-[0_20px_50px_rgba(236,72,153,0.45)] transition hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative block text-lg font-black">Jelajahi Event Sekarang →</span>
        <span className="relative mt-1 block text-sm text-white/80">Jangan sampai kehabisan tiket event favoritmu!</span>
      </Link>

      {/* ===== LINK KECIL ===== */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        <Link href="/" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">🏠 Beranda</Link>
        <Link href="/favorit" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">❤️ Favorit</Link>
        <Link href="/pesanan" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">🎟 Pesanan</Link>
        <Link href="/kontak" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">💬 Kontak</Link>
      </div>
    </div>
  );
}
