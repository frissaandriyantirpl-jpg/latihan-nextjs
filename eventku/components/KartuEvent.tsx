import Link from "next/link";
import { rupiah, type Event } from "@/data/events";
import TombolFavorit from "./TombolFavorit";

export default function KartuEvent({
  event,
  onFavoriteChange,
}: {
  event: Event;
  onFavoriteChange?: (isFavorite: boolean) => void;
}) {
  const sisa = event.kuota - event.terisi;
  const tanggal = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${event.tanggal}T00:00:00`));

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <div className="relative flex h-36 items-end overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-5">
        <div className="absolute -right-5 -top-12 h-36 w-36 rounded-full border-[18px] border-white/50" />
        <div className="absolute right-16 top-9 h-5 w-5 rounded-full bg-amber-400/70" />
        <div className="absolute right-4 top-4">
          <TombolFavorit
            id={event.id}
            compact
            onFavoriteChange={onFavoriteChange}
          />
        </div>
        <span className="relative rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-amber-950">
          {event.kategori}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-slate-950">
          {event.judul}
        </h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <span className="w-5 text-center text-amber-800" aria-hidden="true">◷</span>
            {tanggal}
          </p>
          <p className="flex items-center gap-2">
            <span className="w-5 text-center text-amber-800" aria-hidden="true">⌖</span>
            {event.lokasi}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Harga tiket</p>
            <p className="mt-1 font-bold text-slate-950">{rupiah(event.harga)}</p>
          </div>
          <p
            className={
              sisa === 0
                ? "text-xs font-semibold text-rose-700"
                : "text-xs font-semibold text-emerald-700"
            }
          >
            {sisa === 0 ? "Tiket habis" : `Sisa ${sisa} tiket`}
          </p>
        </div>
        <Link
          href={`/event/${event.id}`}
          className="mt-5 flex w-full items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-amber-800"
        >
          Lihat detail <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}