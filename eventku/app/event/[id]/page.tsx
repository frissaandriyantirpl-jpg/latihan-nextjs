import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import { events, rupiah } from "@/data/events";

function formatTanggal(tanggal: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${tanggal}T00:00:00`));
}

export default async function DetailEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    notFound();
  }

  const sisa = event.kuota - event.terisi;

  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-950">
      <Navbar />
      <div className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <Link
          href="/event"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-amber-800"
        >
          <span aria-hidden="true">←</span> Kembali ke semua event
        </Link>
        <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5">
          <div className="relative flex min-h-56 items-end overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-8 sm:min-h-72 sm:p-12">
            <div className="absolute -right-8 -top-24 h-72 w-72 rounded-full border-[36px] border-white/50" />
            <span className="relative rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-amber-950">
              {event.kategori}
            </span>
          </div>
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_0.75fr]">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {event.judul}
              </h1>
              <p className="mt-4 leading-7 text-slate-600">
                Ayo ikut {event.judul.toLowerCase()}! Catat tanggalnya dan
                pastikan kamu memeriksa ketersediaan tiket sebelum datang.
              </p>
              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Tanggal
                  </dt>
                  <dd className="mt-1 font-semibold">{formatTanggal(event.tanggal)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Lokasi
                  </dt>
                  <dd className="mt-1 font-semibold">{event.lokasi}</dd>
                </div>
              </dl>
              <TombolFavorit id={event.id} />
            </div>
            <aside className="h-fit rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm text-slate-400">Harga tiket</p>
              <p className="mt-1 text-3xl font-black text-amber-300">
                {rupiah(event.harga)}
              </p>
              <div className="mt-6 border-t border-white/15 pt-5">
                <p className="text-sm text-slate-400">Ketersediaan</p>
                <p className={sisa === 0 ? "mt-1 font-semibold text-rose-300" : "mt-1 font-semibold text-emerald-300"}>
                  {sisa === 0 ? "Tiket habis" : `${sisa} tiket tersisa`}
                </p>
              </div>
              <FormPesan event={event} />
            </aside>
          </div>
        </article>
        <Link
          href="/event"
          className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-700 hover:text-amber-800"
        >
          Lihat event lainnya
        </Link>
      </div>
    </main>
  );
}
