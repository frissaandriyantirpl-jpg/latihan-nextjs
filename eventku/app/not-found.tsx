import Link from "next/link";

export default function NotFound() {
  const jalanPintas = [
    { href: "/", label: "🏠 Beranda", desc: "Mulai dari awal" },
    { href: "/event", label: "🎪 Semua Event", desc: "Jelajahi event seru" },
    { href: "/favorit", label: "❤️ Favorit", desc: "Event yang kamu simpan" },
    { href: "/pesanan", label: "🎟 Pesanan", desc: "Cek tiket kamu" },
  ];

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-[#0b021a] px-4 py-16 text-center text-white">
      {/* Background berwarna */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(at_20%_10%,#ff0080_0%,transparent_50%),radial-gradient(at_80%_20%,#7c3aed_0%,transparent_50%),radial-gradient(at_50%_90%,#f97316_0%,transparent_50%),radial-gradient(at_90%_80%,#06b6d4_0%,transparent_50%)] opacity-90" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-pink-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        {/* Badge 404 */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-black tracking-[0.22em] text-white backdrop-blur">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-[10px]">!</span>
          OOPS • 404 • HALAMAN HILANG
        </span>

        {/* Emoji besar + angka 404 */}
        <div className="relative mt-8">
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-30 blur-3xl" />
          <p className="relative animate-bounce text-[96px] leading-none drop-shadow-2xl sm:text-[120px]">🎪</p>
          <p className="relative -mt-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-[88px] font-black leading-none tracking-tight text-transparent sm:text-[110px]">
            404
          </p>
        </div>

        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          Halaman Tidak{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            Ditemukan
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
          Linknya salah atau halamannya sudah pindah. Tenang, tendanya masih di sini — event serunya nggak ke mana-mana kok!
        </p>

        {/* Tombol utama */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#2a0a5e] shadow-xl transition hover:scale-105 active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pink-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">← Ke Beranda</span>
          </Link>
          <Link
            href="/event"
            className="rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-7 py-3.5 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95"
          >
            🎪 Jelajahi Event →
          </Link>
        </div>

        {/* Jalan pintas - Rapi */}
        <div className="mt-10 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-4 text-left shadow-xl backdrop-blur-2xl sm:p-5">
          <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
          <p className="mt-3 px-1 text-[11px] font-black tracking-[0.22em] text-white/60">
            ✨ MAU KE MANA? PILIH JALAN PINTAS:
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {jalanPintas.map((j) => (
              <Link
                key={j.href}
                href={j.href}
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 transition hover:bg-white/20 hover:scale-[1.02] hover:border-white/30"
              >
                <span>
                  <span className="block text-sm font-black text-white">{j.label}</span>
                  <span className="block text-xs text-white/55">{j.desc}</span>
                </span>
                <span className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips kecil */}
        <p className="mt-6 text-[12px] text-white/40">
          Tips: cek lagi link-nya, mungkin ada typo satu huruf. Kalau masih nyasar, balik ke Beranda aja! 🏠
        </p>
      </div>
    </div>
  );
}
