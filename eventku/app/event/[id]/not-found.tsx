import Link from "next/link";

export default function NotFoundEvent() {
  const eventLain = [
    { href: "/event?kategori=Workshop", emoji: "💻", judul: "Workshop", desc: "Belajar skill baru" },
    { href: "/event?kategori=Lomba", emoji: "🏆", judul: "Lomba", desc: "Buktiin kamu juara" },
    { href: "/event?kategori=Konser", emoji: "🎤", judul: "Konser", desc: "Seru-seruan bareng" },
    { href: "/event?kategori=Bazar", emoji: "🛍️", judul: "Bazar", desc: "Jajan sampai puas" },
  ];

  return (
    <div className="mx-auto max-w-xl py-8 text-center text-white">
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-8 shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />

        {/* Badge */}
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-[10px]">🔍</span>
          OOPS • EVENT-nya HILANG • BUKAN SALAH KAMU
        </span>

        {/* Emoji + Glow */}
        <div className="relative mt-6">
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 opacity-30 blur-2xl" />
          <p className="relative animate-bounce text-7xl">🔍</p>
        </div>

        <h1 className="mt-4 text-3xl font-black leading-tight">
          Event Tidak{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            Ditemukan
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-white/60">
          Event ini tidak ada atau sudah dihapus. Mungkin link-nya salah, atau event-nya udah selesai dan diarsipkan. Tenang, event seru lainnya masih banyak!
        </p>

        {/* Tombol Utama */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/event"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-7 py-3.5 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">← Semua Event</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/20"
          >
            🏠 Ke Beranda
          </Link>
        </div>

        {/* Kenapa Bisa Hilang? */}
        <div className="mt-6 rounded-[24px] border border-white/15 bg-white/10 p-4 text-left">
          <p className="text-[11px] font-black tracking-[0.22em] text-white/60">🤔 KOK BISA HILANG?</p>
          <ul className="mt-2 space-y-1.5 text-sm text-white/70">
            <li>• Link-nya salah ketik / kepotong pas di-copy</li>
            <li>• Event-nya sudah selesai & diarsipkan</li>
            <li>• Event-nya dibatalkan / dihapus panitia</li>
          </ul>
        </div>
      </div>

      {/* Event Lain - Biar user nggak pulang dengan tangan kosong */}
      <div className="mt-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">🎪 TAPI TENANG, YANG INI MASIH ADA:</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {eventLain.map((e) => (
            <Link
              key={e.judul}
              href={e.href}
              className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-left transition hover:bg-white/20 hover:scale-[1.02]"
            >
              <span>
                <span className="block text-sm font-black">{e.emoji} {e.judul}</span>
                <span className="block text-xs text-white/60">{e.desc}</span>
              </span>
              <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Link Kecil */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Link href="/favorit" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">
          ❤️ Favorit Saya
        </Link>
        <Link href="/pesanan" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">
          🎟 Pesanan Saya
        </Link>
        <Link href="/kontak" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white/20 hover:text-white">
          💬 Tanya Panitia
        </Link>
      </div>

      <p className="mt-4 text-[12px] text-white/40">
        Kalau kamu yakin link-nya bener, chat panitia aja di halaman Kontak ya! 💬
      </p>
    </div>
  );
}
