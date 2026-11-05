
"use client";

import { useState, useEffect } from "react";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({
  events,
}: {
  events: Event[];
}) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");

  // Langkah 6: tampilkan lagi
  const [jumlahTampil, setJumlahTampil] = useState(4);

  // Langkah 7: simpan urutan
  const [sudahBacaUrut, setSudahBacaUrut] = useState(false);

  // Langkah 9: penyaring lanjutan
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  // Membaca urutan dari localStorage
  useEffect(() => {
    const tersimpan = localStorage.getItem("urut");

    if (
      tersimpan === "tanggal" ||
      tersimpan === "termurah" ||
      tersimpan === "termahal" ||
      tersimpan === "nama"
    ) {
      setUrut(tersimpan);
    }

    setSudahBacaUrut(true);
  }, []);

  // Menyimpan urutan ke localStorage
  useEffect(() => {
    if (sudahBacaUrut) {
      localStorage.setItem("urut", urut);
    }
  }, [urut, sudahBacaUrut]);

  // Daftar kategori
  const daftarKategori = [
    "Semua",
    ...new Set(events.map((e) => e.kategori)),
  ];

  // Penyaringan event
  const hasil = events.filter((e) => {
    const cocokCari = e.judul
      .toLowerCase()
      .includes(cari.toLowerCase());

    const cocokKategori =
      kategori === "Semua" || e.kategori === kategori;

    const cocokTersedia =
      !hanyaTersedia || e.kuota - e.terisi > 0;

    const cocokHarga =
      hargaMaksimal === "" ||
      e.harga <= Number(hargaMaksimal);

    return (
      cocokCari &&
      cocokKategori &&
      cocokTersedia &&
      cocokHarga
    );
  });

  // Pengurutan event
  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "termurah") {
      return a.harga - b.harga;
    }

    if (urut === "termahal") {
      return b.harga - a.harga;
    }

    if (urut === "nama") {
      return a.judul.localeCompare(b.judul);
    }

    return a.tanggal.localeCompare(b.tanggal);
  });

  // Statistik katalog
  const totalHarga = tersusun.reduce(
    (total, e) => total + e.harga,
    0
  );

  const rataRataHarga =
    tersusun.length > 0
      ? totalHarga / tersusun.length
      : 0;

  const totalSisaTiket = tersusun.reduce(
    (total, e) => total + (e.kuota - e.terisi),
    0
  );

  // Membatasi jumlah event
  const eventTampil = tersusun.slice(0, jumlahTampil);

  // Mengembalikan tampilan ke 4 event
  const resetTampilan = () => {
    setJumlahTampil(4);
  };

  return (
    <div>
      {/* Pencarian, kategori, dan pengurutan */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => {
            setCari(e.target.value);
            resetTampilan();
          }}
          placeholder="Cari event..."
          className="rounded border bg-white p-3"
        />

        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            resetTampilan();
          }}
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
          onChange={(e) => {
            setUrut(e.target.value);
            resetTampilan();
          }}
          className="rounded border bg-white p-3"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {/* Penyaring lanjutan */}
      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4">

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => {
              setHanyaTersedia(e.target.checked);
              resetTampilan();
            }}
            className="h-4 w-4"
          />
          Hanya yang masih ada tiket
        </label>

        <div className="flex items-center gap-2">
          <label
            htmlFor="hargaMaksimal"
            className="text-sm font-medium"
          >
            Harga maksimal:
          </label>

          <input
            id="hargaMaksimal"
            type="number"
            min="0"
            value={hargaMaksimal}
            onChange={(e) => {
              setHargaMaksimal(e.target.value);
              resetTampilan();
            }}
            placeholder="Tanpa batas"
            className="w-32 rounded border p-2"
          />
        </div>
      </div>

      {/* Jumlah event ditemukan */}
      <p className="mb-3 text-base">
        {tersusun.length} event ditemukan
      </p>

      {/* Statistik */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">
            Rata-rata harga
          </p>
          <p className="font-bold text-blue-700">
            {rupiah(rataRataHarga)}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">
            Total sisa tiket
          </p>
          <p className="font-bold text-green-700">
            {totalSisaTiket}
          </p>
        </div>
      </div>

      {/* Daftar event */}
      {eventTampil.length === 0 ? (
        <p className="text-gray-500">
          Tidak ada event yang cocok.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventTampil.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}

      {/* Tombol tampilkan lagi */}
      {jumlahTampil < tersusun.length && (
        <div className="mt-6 text-center">
          <button
            onClick={() =>
              setJumlahTampil((sebelumnya) => sebelumnya + 4)
            }
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Tampilkan lagi
          </button>
        </div>
      )}
    </div>
  );
}
