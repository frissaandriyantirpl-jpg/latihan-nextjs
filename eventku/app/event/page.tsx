import { ambilEvents } from "@/data/ambil";
import KartuEvent from "@/components/KartuEvent";
import KontrolKatalog from "@/components/KontrolKatalog";
import { saringEvents } from "@/data/saring";
import Link from "next/link";

export default async function Katalog({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  const { q = "", kategori = "Semua" } = await searchParams;
  const semua = await ambilEvents();
  const hasil = saringEvents(semua, q, kategori);

  return (
    <div className="mx-auto max-w-[760px] text-[#2f1d2d]">
      <header className="mb-5">
        <p className="text-sm font-bold text-[#b0256a]">EventKu</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#2f1d2d]">
          Katalog Event
        </h1>
      </header>

      <KontrolKatalog />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#806b78]">
        <p>{hasil.length} event ditemukan</p>
        <p>{semua.length} kegiatan sekolah</p>
      </div>

      {hasil.length > 0 ? (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {hasil.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-[#f1d5e2] bg-white p-8 text-center shadow-sm">
          <p className="text-3xl">🔍</p>
          <h2 className="mt-3 font-bold text-[#2f1d2d]">Event tidak ditemukan</h2>
          <p className="mt-1 text-sm text-[#806b78]">
            Coba ubah kata kunci atau pilih kategori lain.
          </p>
          <Link
            href="/event"
            className="mt-4 inline-flex rounded-full bg-[#ec4899] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#d93687]"
          >
            Hapus filter
          </Link>
        </div>
      )}
    </div>
  );
}
