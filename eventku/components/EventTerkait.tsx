"use client";
import { useMemo, useState } from "react";
import KartuEvent from "@/components/KartuEvent";
import type { Event } from "@/data/events";

export default function EventTerkait({ items, judul }: { items: Event[]; judul?: string }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [lihatSemua, setLihatSemua] = useState(false);

  // Kategori yang ada di items terkait
  const daftarKategori = useMemo(() => {
    const s = new Set(items.map((e) => e.kategori));
    return ["Semua", ...Array.from(s)];
  }, [items]);

  const filtered = useMemo(() => {
    const f = kategoriAktif === "Semua" ? items : items.filter((e) => e.kategori === kategoriAktif);
    return lihatSemua ? f : f.slice(0, 3);
  }, [items, kategoriAktif, lihatSemua]);

  const totalFiltered = kategoriAktif === "Semua" ? items.length : items.filter((e) => e.kategori === kategoriAktif).length;

  if (!items.length) return null;

  return (
    <section className="relative mt-12 overflow-hidden rounded-[28px] border border-[#f1d5e2] bg-white p-5 shadow-[0_18px_45px_rgba(190,24,93,0.08)] sm:p-7">
      <div aria-hidden className="pointer-events-none absolute -inset-3 -z-10 rounded-[36px] bg-[#f9d0e3] opacity-40 blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#be185d]" />
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#f9d0e3]/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#fbcfe8]/60 blur-3xl" />

      {/* Header - Rapi & Memukau */}
      <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9d0e3] to-[#ec4899] text-3xl shadow-[0_10px_24px_rgba(190,24,93,0.16)]">
            🎪
          </div>
          <div>
            <p className="text-[11px] font-black tracking-[0.22em] text-[#9b7890]">✨ KAMU MUNGKIN JUGA SUKA</p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-[#2f1d2d] sm:text-[28px]">
              {judul || "Event Terkait"}{" "}
              <span className="bg-gradient-to-r from-[#ec4899] to-[#be185d] bg-clip-text text-transparent">
                🎪
              </span>
            </h2>
            <p className="mt-1 text-sm text-[#806b78]">
              Event lain yang mungkin kamu suka • <b className="text-[#2f1d2d]">{items.length} event</b> dipilih khusus buat kamu
            </p>
          </div>
        </div>

        {/* Tombol Lihat Semua */}
        {totalFiltered > 3 && (
          <button
            onClick={() => setLihatSemua(!lihatSemua)}
            className="group relative shrink-0 overflow-hidden rounded-full bg-[#ec4899] px-5 py-2.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(190,24,93,0.18)] transition hover:scale-105 hover:bg-[#d93687] active:scale-95"
          >
            <span className="relative flex items-center gap-1.5">
              {lihatSemua ? "Sembunyikan ↑" : `Lihat Semua (${totalFiltered}) →`}
            </span>
          </button>
        )}
      </div>

      {/* Filter Kategori Mini - Berwarna */}
      {daftarKategori.length > 2 && (
        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-[#f1d5e2] pt-4">
          {daftarKategori.map((c) => {
            const aktif = kategoriAktif === c;
            const count = c === "Semua" ? items.length : items.filter((e) => e.kategori === c).length;
            return (
              <button
                key={c}
                onClick={() => {
                  setKategoriAktif(c);
                  setLihatSemua(false);
                }}
                className={`rounded-full px-4 py-2 text-xs font-black transition-all duration-300 active:scale-90 ${
                  aktif
                    ? "bg-[#ec4899] text-white shadow-[0_8px_18px_rgba(190,24,93,0.18)] scale-[1.03]"
                    : "border border-[#f1d5e2] bg-[#fff5f9] text-[#7b3155] hover:bg-[#ffeaf4] hover:scale-[1.02]"
                }`}
              >
                {c} • {count}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid - Tetap pakai KartuEvent Juara Dunia */}
      {filtered.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-[#edcada] bg-[#fffafc] p-8 text-center">
          <p className="text-4xl">🤍</p>
          <p className="mt-2 font-black text-[#2f1d2d]">Belum ada event di kategori ini</p>
          <p className="text-sm text-[#806b78]">Coba pilih kategori lain ya!</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <div
              key={e.id}
              className="animate-[fadeUp_0.5s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <KartuEvent event={e} />
            </div>
          ))}
        </div>
      )}

      {/* Footer kecil */}
      <div className="relative mt-6 flex flex-col items-center justify-between gap-2 border-t border-[#f1d5e2] pt-4 text-center sm:flex-row sm:text-left">
        <p className="text-[12px] text-[#806b78]">
          Menampilkan <b className="text-[#2f1d2d]">{filtered.length}</b> dari <b className="text-[#2f1d2d]">{totalFiltered}</b> event terkait
        </p>
        <p className="text-[12px] font-bold text-[#806b78]">
          ❤️ Tap <span className="text-[#be185d]">hati</span> di card buat simpan ke Favorit
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
