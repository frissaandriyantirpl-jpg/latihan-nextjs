export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl text-white">
      {/* ===== HEADER LOADING - Bikin user tau lagi loading ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-6 text-center shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full animate-pulse rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />

        {/* Spinner Juara Dunia */}
        <div className="relative mx-auto mt-5 h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-pink-500 border-r-amber-400 border-b-violet-500 border-l-cyan-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="animate-bounce text-2xl">🎪</span>
          </div>
        </div>

        <p className="mt-3 text-lg font-black">
          Lagi Siapin Event{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            Paling Seru...
          </span>
        </p>
        <p className="mt-1 text-sm text-white/60">Sabar ya, tendanya lagi dipasang. Sebentar lagi jadi! ✨</p>

        {/* Progress bar pelangi jalan */}
        <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400" />
        </div>
        <p className="mt-2 text-[11px] font-bold tracking-[0.22em] text-white/40">✨ MEMUAT • MOHON TUNGGU SEBENTAR ✨</p>
      </div>

      {/* ===== SKELETON KARTU - Mirip kartu asli, jadi nggak kaget ===== */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[24px] border border-white/20 bg-[#1a0533]/90 p-4 shadow-xl backdrop-blur-2xl"
          >
            {/* Gambar skeleton - gradient jalan, bukan abu-abu polos */}
            <div className="relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/40 via-pink-500/40 to-amber-400/40">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="animate-bounce text-4xl" style={{ animationDelay: `${i * 0.2}s` }}>🎪</span>
              </div>
              {/* Badge skeleton */}
              <div className="absolute left-3 top-3 h-6 w-20 animate-pulse rounded-full bg-white/20" />
              <div className="absolute right-3 top-3 h-8 w-8 animate-pulse rounded-full bg-white/20" />
            </div>

            {/* Judul skeleton */}
            <div className="mt-4 h-5 w-full animate-pulse rounded-full bg-gradient-to-r from-white/25 via-white/15 to-white/25" />
            <div className="mt-2 h-5 w-2/3 animate-pulse rounded-full bg-gradient-to-r from-white/20 via-white/10 to-white/20" />

            {/* Info skeleton */}
            <div className="mt-3 flex gap-2">
              <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
            </div>

            {/* Harga + Tombol skeleton */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="h-7 w-28 animate-pulse rounded-full bg-gradient-to-r from-amber-400/40 to-pink-500/40" />
              <div className="h-10 w-32 animate-pulse rounded-full bg-gradient-to-r from-pink-500/40 to-violet-500/40" />
            </div>
          </div>
        ))}
      </div>

      {/* ===== SKELETON BAWAH - Biar halaman kelihatan penuh ===== */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-[20px] border border-white/15 bg-white/5 p-4">
            <div className="h-4 w-1/2 rounded-full bg-white/15" />
            <div className="mt-2 h-3 w-full rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
