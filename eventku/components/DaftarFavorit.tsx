"use client";
import { useEffect, useMemo, useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";
import Link from "next/link";

export default function DaftarFavorit({ semua }: { semua: Event[] }) {
  const [ids, setIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cari, setCari] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [hapusSemuaConfirm, setHapusSemuaConfirm] = useState(false);

  // Baca favorit + dengerin perubahan dari komponen lain
  useEffect(() => {
    const sync = () => {
      try {
        setIds(JSON.parse(localStorage.getItem("favorit-eventku") || "[]"));
      } catch {}
      setLoaded(true);
    };
    sync();
    const onFav = (e: any) => {
      if (e.detail) setIds(e.detail);
      else sync();
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === "favorit-eventku" || e.key === "favorit") sync();
    };
    window.addEventListener("favorit-changed", onFav as any);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("favorit-changed", onFav as any);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const fav = useMemo(() => semua.filter((e) => ids.includes(e.id)), [semua, ids]);

  const daftarKategori = useMemo(() => {
    const s = new Set(fav.map((e) => e.kategori));
    return ["Semua", ...Array.from(s)];
  }, [fav]);

  const tampil = useMemo(() => {
    let f = fav;
    if (kategoriAktif !== "Semua") f = f.filter((e) => e.kategori === kategoriAktif);
    if (cari.trim()) {
      const q = cari.toLowerCase();
      f = f.filter((e) => e.nama.toLowerCase().includes(q) || e.lokasi.toLowerCase().includes(q) || e.kategori.toLowerCase().includes(q));
    }
    return f;
  }, [fav, kategoriAktif, cari]);

  const totalHarga = useMemo(() => fav.reduce((a, e) => a + e.harga, 0), [fav]);
  const gratisCount = fav.filter((e) => e.harga === 0).length;

  function hapusSemua() {
    localStorage.setItem("favorit-eventku", JSON.stringify([]));
    localStorage.setItem("favorit", JSON.stringify([]));
    setIds([]);
    window.dispatchEvent(new CustomEvent("favorit-changed", { detail: [] }));
    setHapusSemuaConfirm(false);
  }

  // Loading skeleton - Berwarna, bukan putih polos
  if (!loaded) {
    return (
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/80">
            <div className="h-[210px] bg-gradient-to-br from-violet-600/40 to-pink-600/40" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-2/3 rounded-full bg-white/15" />
              <div className="h-4 w-full rounded-full bg-white/10" />
              <div className="h-4 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // EMPTY STATE - Juara Dunia
  if (ids.length === 0) {
    return (
      <div className="relative mt-6 overflow-hidden rounded-[32px] border border-white/20 bg-[#1a0533]/90 p-8 text-center shadow-[0_25px_60px_rgba(124,58,237,0.3)] backdrop-blur-2xl sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 opacity-25 blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/30 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl" />

        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-violet-600 text-6xl shadow-[0_20px_40px_rgba(244,63,94,0.4)] animate-bounce">
          💔
        </div>
        <h3 className="relative mt-5 text-2xl font-black text-white sm:text-3xl">
          Belum Ada Favorit{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">💔</span>
        </h3>
        <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/60">
          Kamu belum menyimpan event apa pun. Yuk jelajahi event seru dan tap <b className="text-rose-300">❤️</b> di card mana pun buat simpan di sini!
        </p>

        <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/event" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-7 py-3.5 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95">
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">🎪 Cari Event →</span>
          </Link>
          <Link href="/" className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/20 hover:scale-105">
            🏠 Kembali ke Beranda
          </Link>
        </div>

        <div className="relative mt-8 flex flex-wrap justify-center gap-2">
          {["🎶 Musik", "🎨 Seni", "🍜 Kuliner", "🤖 Tech", "🏃 Sport"].map((c) => (
            <Link key={c} href="/event" className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/75 transition hover:bg-white/20 hover:text-white hover:scale-105">
              {c}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-6">
      {/* Header Stats - Berwarna */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-5 shadow-xl backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-violet-600 text-3xl shadow-[0_12px_30px_rgba(244,63,94,0.5)]">
              ❤️
            </div>
            <div>
              <p className="text-[11px] font-black tracking-[0.22em] text-white/60">❤️ KOLEKSI FAVORIT KAMU</p>
              <h2 className="mt-0.5 text-2xl font-black text-white">
                {fav.length} Event <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">Favorit</span>
              </h2>
              <p className="text-sm text-white/60">
                {gratisCount > 0 && <span>🎉 {gratisCount} GRATIS • </span>}
                Total nilai: <b className="text-white">{fav.length ? `Rp ${totalHarga.toLocaleString("id-ID")}` : "Rp 0"}</b>
              </p>
            </div>
          </div>

          {/* Search mini + Hapus Semua */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-[220px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
              <input
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari di favorit..."
                className="w-full rounded-full border border-white/20 bg-white/[0.08] py-2.5 pl-10 pr-9 text-sm text-white outline-none placeholder:text-white/40 focus:border-pink-400"
              />
              {cari && (
                <button onClick={() => setCari("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-black text-white hover:bg-rose-500">
                  ✕
                </button>
              )}
            </div>
            {!hapusSemuaConfirm ? (
              <button onClick={() => setHapusSemuaConfirm(true)} className="rounded-full border border-red-400/40 bg-red-500/15 px-4 py-2.5 text-xs font-black text-red-200 transition hover:bg-red-500/30 hover:scale-105">
                🗑 Hapus Semua
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={hapusSemua} className="rounded-full bg-red-500 px-4 py-2.5 text-xs font-black text-white shadow-lg transition hover:scale-105">
                  Ya, Hapus!
                </button>
                <button onClick={() => setHapusSemuaConfirm(false)} className="rounded-full bg-white/15 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/25">
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter kategori */}
        {daftarKategori.length > 2 && (
          <div className="relative mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {daftarKategori.map((c) => {
              const count = c === "Semua" ? fav.length : fav.filter((e) => e.kategori === c).length;
              const aktif = kategoriAktif === c;
              return (
                <button
                  key={c}
                  onClick={() => setKategoriAktif(c)}
                  className={`rounded-full px-4 py-2 text-xs font-black transition active:scale-90 ${aktif ? "bg-white text-[#2a0a5e] shadow-lg scale-[1.05]" : "border border-white/20 bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"}`}
                >
                  {c} • {count}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid */}
      {tampil.length === 0 ? (
        <div className="mt-5 rounded-[28px] border border-dashed border-white/25 bg-white/5 p-8 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-2 font-black text-white">Nggak ketemu di favorit</p>
          <p className="text-sm text-white/60">Coba ubah kata kunci atau kategori ya!</p>
          <button onClick={() => { setCari(""); setKategoriAktif("Semua"); }} className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#2a0a5e] transition hover:scale-105">
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tampil.map((e, i) => (
            <div key={e.id} className="animate-[fadeUp_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: `${i * 70}ms` }}>
              <KartuEvent event={e} />
            </div>
          ))}
        </div>
      )}

      <p className="mt-5 text-center text-[12px] text-white/40">
        Menampilkan <b className="text-white">{tampil.length}</b> dari <b className="text-white">{fav.length}</b> favorit • ❤️ Tersimpan otomatis di perangkat ini
      </p>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
