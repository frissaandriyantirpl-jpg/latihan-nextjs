
"use client";

import { useActionState } from "react";
import { rupiah, type Event } from "@/data/events";
import { pesanTiket, type HasilPesan } from "@/app/action";

export default function FormPesan({
  event,
  namaAwal,
}: {
  event: Event;
  namaAwal: string;
}) {
  const sisa = event.kuota - event.terisi;

  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: {
      nama: namaAwal,
      email: "",
    },
  };

  const [hasil, formAction, pending] = useActionState(
    pesanTiket,
    awal
  );

  if (sisa <= 0) {
    return (
      <p className="mt-6 font-medium text-red-600">
        Tiket sudah habis.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="mt-6 space-y-3 border-t pt-4"
    >
      <h2 className="text-lg font-semibold">
        Pesan tiket
      </h2>

      <input
        type="hidden"
        name="eventId"
        value={event.id}
      />

      <div>
        <input
          type="text"
          name="nama"
          defaultValue={hasil.isian.nama || namaAwal}
          placeholder="Nama pemesan"
          className="block w-full rounded border px-3 py-2"
        />

        {hasil.galat.nama && (
          <p className="mt-1 text-sm text-red-600">
            {hasil.galat.nama}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          defaultValue={hasil.isian.email}
          placeholder="Email pemesan"
          className="block w-full rounded border px-3 py-2"
        />

        {hasil.galat.email && (
          <p className="mt-1 text-sm text-red-600">
            {hasil.galat.email}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="jumlah"
          min="1"
          max="5"
          defaultValue="1"
          className="block w-32 rounded border px-3 py-2"
        />

        {hasil.galat.jumlah && (
          <p className="mt-1 text-sm text-red-600">
            {hasil.galat.jumlah}
          </p>
        )}
      </div>

      <p>
        Total:{" "}
        <b>{rupiah(event.harga)}</b> per tiket
      </p>

      {hasil.pesan && (
        <p
          className={
            hasil.berhasil
              ? "text-green-700"
              : "text-red-600"
          }
        >
          {hasil.pesan}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Memproses..." : "Pesan"}
      </button>
    </form>
  );
}
