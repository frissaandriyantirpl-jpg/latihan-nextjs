"use client";

import { useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);

  // Membuat daftar kategori secara otomatis
  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  // Menyaring event berdasarkan pencarian dan kategori
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
    (kategori === "Semua" || e.kategori === kategori) &&
    (!hanyaTersedia || e.terisi < e.kuota),
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          aria-label="Cari event berdasarkan nama"
          className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          aria-label="Filter event berdasarkan kategori"
          className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => setHanyaTersedia(e.target.checked)}
            className="h-4 w-4 accent-amber-700"
          />
          Hanya yang masih ada tiket
        </label>
      </div>

      {hasil.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
          Tidak ada event yang cocok. Coba kata kunci atau kategori lain.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
