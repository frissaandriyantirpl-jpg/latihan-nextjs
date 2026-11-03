import Navbar from "@/components/Navbar";
import DaftarFavorit from "@/components/DaftarFavorit";

export default function HalamanFavorit() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-950">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800">
          Koleksi kamu
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Event Favorit
        </h1>
        <p className="mt-3 text-slate-600">
          Daftar event yang kamu simpan sebagai favorit.
        </p>
        <DaftarFavorit />
      </section>
    </main>
  );
}
