
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Detail({ params }: PageProps) {
  const { id } = await params;

  const event = events.find((e) => e.id === Number(id));

  if (!event) notFound();

  const sisa = event.kuota - event.terisi;

  // Mencari event lain dengan kategori yang sama
  const eventTerkait = events.filter(
    (item) =>
      item.kategori === event.kategori &&
      item.id !== event.id
  );

  return (
    <main className="min-h-screen bg-[#fffdf8] px-5 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Detail event */}
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {event.kategori}
          </span>

          <h1 className="mt-2 text-3xl font-bold">
            {event.judul}
          </h1>

          <p className="mt-1 text-slate-500">
            {event.tanggal} - {event.lokasi}
          </p>

          <p className="mt-4 text-xl font-semibold">
            {rupiah(event.harga)}
          </p>

          <p className="text-slate-600">
            {sisa === 0
              ? "Tiket habis"
              : `Sisa ${sisa} dari ${event.kuota} tiket`}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <TombolFavorit id={event.id} />
            <FormPesan event={event} />
          </div>
        </article>

        {/* Event terkait */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">
            Event Terkait
          </h2>

          {eventTerkait.length === 0 ? (
            <p className="rounded-xl border bg-white p-5 text-slate-600">
              Belum ada event terkait.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {eventTerkait.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    {item.kategori}
                  </span>

                  <h3 className="mt-3 text-lg font-bold">
                    {item.judul}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.tanggal}
                  </p>

                  <p className="mt-2 font-semibold">
                    {rupiah(item.harga)}
                  </p>

                  <Link
                    href={`/event/${item.id}`}
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Lihat detail
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <Link
          href="/event"
          className="mt-8 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke katalog
        </Link>

      </div>
    </main>
  );
}
