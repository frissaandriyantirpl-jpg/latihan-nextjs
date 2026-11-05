
"use client";

import { useState } from "react";
import type { Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({
  events,
}: {
  events: Event[];
}) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");

  // Daftar kategori event
  const daftarKategori = [
    "Semua",
    ...new Set(events.map((e) => e.kategori)),
  ];

  // Filter berdasarkan pencarian dan kategori
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori)
  );

  // Mengurutkan event
  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "termurah") return a.harga - b.harga;
    if (urut === "termahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);

    return a.tanggal.localeCompare(b.tanggal);
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white p-3"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white p-3"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urut}
          onChange={(e) => setUrut(e.target.value)}
          className="rounded border bg-white p-3"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      <p className="mb-3 text-base text-white">
        {tersusun.length} event ditemukan
      </p>

      {tersusun.length === 0 ? (
        <p className="text-white">
          Tidak ada event yang cocok.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tersusun.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}
