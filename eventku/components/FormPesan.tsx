"use client";

import { useActionState, useState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/action";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({
  event,
  namaAwal = "",
}: {
  event: Event;
  namaAwal?: string;
}) {
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, email: "" },
  };

  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);
  const [jumlah, setJumlah] = useState(1);
  const sisa = event.kuota - event.terisi;

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-rose-300">Tiket sudah habis.</p>;
  }

  return (
    <form action={kirim} className="mt-6 space-y-3 border-t border-white/15 pt-5">
      <h2 className="text-lg font-semibold">Pesan tiket</h2>
      <input type="hidden" name="eventId" value={event.id} />

      <label className="block space-y-1 text-sm">
        <span>Nama pemesan</span>
        <input
          name="nama"
          defaultValue={hasil.isian.nama}
          placeholder="Masukkan nama"
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 placeholder:text-slate-400"
        />
        {hasil.galat.nama && <p className="text-sm text-rose-300">{hasil.galat.nama}</p>}
      </label>

      <label className="block space-y-1 text-sm">
        <span>Email</span>
        <input
          name="email"
          defaultValue={hasil.isian.email}
          placeholder="Masukkan email"
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 placeholder:text-slate-400"
        />
        {hasil.galat.email && <p className="text-sm text-rose-300">{hasil.galat.email}</p>}
      </label>

      <label className="block space-y-1 text-sm">
        <span>Jumlah tiket</span>
        <input
          name="jumlah"
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950"
        />
        {hasil.galat.jumlah && <p className="text-sm text-rose-300">{hasil.galat.jumlah}</p>}
      </label>

      <p>
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {hasil.pesan && (
        <p className={`text-sm ${hasil.berhasil ? "text-emerald-300" : "text-rose-300"}`}>
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={sedangKirim}
        className="w-full rounded-full bg-amber-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-amber-200 disabled:opacity-50"
      >
        {sedangKirim ? "Memproses..." : "Pesan tiket"}
      </button>
    </form>
  );
}