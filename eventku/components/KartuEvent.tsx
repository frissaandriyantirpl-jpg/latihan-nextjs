import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

export default function KartuEvent({
  event,
}: {
  event: Event;
}) {
  const sisa = event.kuota - event.terisi;
  const laris = event.terisi / event.kuota > 0.5;

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="relative mb-3 aspect-[40/21] overflow-hidden rounded-lg">
        {event.gambar ? (
          <Image
            src={event.gambar}
            alt={event.judul}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100"
          >
            <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-amber-950">
              {event.kategori}
            </span>
          </div>
        )}
      </div>

      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      {laris && (
        <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
          Laris
        </span>
      )}

      <h3 className="mt-2 text-lg font-semibold">{event.judul}</h3>
      <p className="text-sm text-slate-500">
        {event.tanggal} - {event.lokasi}
      </p>
      <p className="mt-2 font-medium">{rupiah(event.harga)}</p>
      <p className="text-sm text-slate-600">
        {sisa === 0 ? "Tiket habis" : `Sisa ${sisa} tiket`}
      </p>

      <Link
        href={`/event/${event.id}`}
        className="mt-3 inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        Lihat detail
      </Link>
    </div>
  );
}