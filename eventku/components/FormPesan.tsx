"use client";

import { useState, type FormEvent } from "react";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBerhasil(false);

    if (nama.trim().length < 3) {
      setPesan("Nama minimal 3 huruf.");
      return;
    }

    if (!Number.isInteger(jumlah) || jumlah < 1) {
      setPesan("Jumlah tiket minimal 1.");
      return;
    }

    if (jumlah > sisa) {
      setPesan(`Sisa tiket hanya ${sisa}.`);
      return;
    }

    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-rose-300">Tiket sudah habis.</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 border-t border-white/15 pt-5">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>
      <label className="block space-y-1 text-sm">
        <span>Nama pemesan</span>
        <input
          required
          minLength={3}
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama"
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 placeholder:text-slate-400"
        />
      </label>
      <label className="block space-y-1 text-sm">
        <span>Jumlah tiket</span>
        <input
          required
          type="number"
          min={1}
          max={sisa}
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950"
        />
      </label>
      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>
      {pesan && <p role="alert" className="text-sm text-rose-300">{pesan}</p>}
      {berhasil && (
        <p role="status" className="text-sm text-emerald-300">
          Terima kasih {nama.trim()}! {jumlah} tiket dipesan (belum tersimpan,
          ini masih latihan).
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-amber-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-200"
      >
        Pesan tiket
      </button>
    </form>
  );
}
