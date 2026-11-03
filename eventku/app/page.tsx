import Link from "next/link";
import Navbar from "@/components/Navbar";
import { events } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default function Beranda() {
  const terdekat = [...events]
    .filter((event) => event.tanggal >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-950">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <section className="py-12 text-center sm:py-16">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Temukan event seru di sekitarmu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini.
          </p>
          <Link
            href="/event"
            className="mt-6 inline-block rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
          >
            Lihat semua event
          </Link>
        </section>

        <section aria-labelledby="event-terdekat">
          <h2
            id="event-terdekat"
            className="mb-6 text-2xl font-bold sm:text-3xl"
          >
            Event terdekat
          </h2>
          {terdekat.length === 0 ? (
            <p className="rounded-2xl bg-white p-6 text-slate-600">
              Belum ada event mendatang.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {terdekat.map((event) => (
                <KartuEvent key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        <section
          id="tentang"
          className="mt-16 rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-12"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
            Tentang Eventku
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
            Temukan acara, buat cerita baru.
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Jelajahi berbagai acara, lihat informasi tanggal dan lokasi, serta
            periksa ketersediaan tiket sebelum memilih event yang ingin kamu ikuti.
          </p>
        </section>
      </div>
    </main>
  );
}
