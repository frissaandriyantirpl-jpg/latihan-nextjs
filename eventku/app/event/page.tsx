import Navbar from "@/components/Navbar";
import KatalogInteraktif from "@/components/KatalogInteraktif";
import { events } from "@/data/events";

export default function HalamanEvent() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-950">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800">
          Semua acara
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Jelajahi Event
        </h1>
        <p className="mt-3 mb-8 text-slate-600">
          Cari event berdasarkan nama atau kategori, dan simpan yang kamu suka.
        </p>
        <KatalogInteraktif events={events} />
      </section>
    </main>
  );
}
