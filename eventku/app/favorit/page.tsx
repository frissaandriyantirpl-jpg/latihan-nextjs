import DaftarFavorit from "@/components/DaftarFavorit";
import { ambilEvents } from "@/data/ambil";
import Link from "next/link";

export default async function Favorit() {
  const semua = await ambilEvents();

  return (
    <div className="mx-auto max-w-6xl text-white">
      {/* ===== HEADER FAVORIT ===== */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-6 text-center shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl sm:p-8">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-[10px]">❤️</span>
          KOLEKSI KAMU • TERSIMPAN DI HATI
        </span>

        <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
          Favorit Saya{" "}
          <span className="inline-block animate-bounce bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
            ❤️
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-white/60">
          Event yang kamu simpan. Yang kamu ❤️, nggak bakal hilang — tersimpan rapi di sini, siap dipesan kapan aja!
        </p>

        {/* Stats + Aksi Cepat */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">❤️ Total {semua.length} Event Tersedia</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">⚡ Tersimpan Otomatis</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80">🔒 Cuma Kamu yang Lihat</span>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/event"
            className="rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95"
          >
            🎪 Tambah Favorit Baru →
          </Link>
          <Link
            href="/pesanan"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/20"
          >
            🎟 Lihat Pesanan
          </Link>
        </div>
      </div>

      {/* ===== CARA SIMPAN - Biar user baru paham ===== */}
      <div className="mt-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl sm:p-6">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">✨ GIMANA CARA SIMPAN FAVORIT?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { no: "1", emoji: "🎪", judul: "Cari Event", desc: "Jelajahi event di halaman Event" },
            { no: "2", emoji: "❤️", judul: "Tap Hati", desc: "Klik tombol ❤️ di kartu event" },
            { no: "3", emoji: "🎉", judul: "Muncul di Sini!", desc: "Otomatis tersimpan di halaman ini" },
          ].map((s) => (
            <div key={s.judul} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 transition hover:bg-white/20">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-xs font-black text-white shadow">
                {s.no}
              </span>
              <span>
                <span className="block text-sm font-black">{s.emoji} {s.judul}</span>
                <span className="block text-xs leading-relaxed text-white/60">{s.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== LIST FAVORIT - Tetap pakai DaftarFavorit biar rapi ===== */}
      <div className="mt-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 shadow-xl backdrop-blur-2xl sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-black tracking-[0.22em] text-white/60">❤️ DAFTAR FAVORIT KAMU:</p>
          <Link href="/event" className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/70 transition hover:bg-white/20 hover:text-white">
            + Tambah Lagi →
          </Link>
        </div>
        <DaftarFavorit semua={semua} />
      </div>

      {/* ===== TIPS ===== */}
      <div className="mt-5 rounded-[24px] border border-white/15 bg-white/5 p-5 text-center">
        <p className="text-sm text-white/70">
          💡 <b className="text-white">Tips:</b> Favorit tersimpan di HP / browser kamu. Kalau ganti HP, favoritnya perlu disimpen ulang ya! Kalau udah yakin mau ikut, langsung klik <b className="text-white">Pesan Sekarang</b> di kartunya.
        </p>
      </div>
    </div>
  );
}
