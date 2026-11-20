import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ambilEvent, hitungPesanan, ambilTerkait } from "@/data/ambil";
import { rupiah } from "@/data/events";
import TombolFavorit from "@/components/TombolFavorit";
import EventTerkait from "@/components/EventTerkait";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = await ambilEvent(Number(id));
  if (!e) return { title: "Event Tidak Ditemukan - EventKu" };
  return { title: `${e.nama} - EventKu`, description: e.deskripsi };
}

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eventId = Number(id);
  const event = await ambilEvent(eventId);
  if (!event) notFound();

  const jumlah = await hitungPesanan(eventId);
  const sisa = Math.max(0, (event.kuota ?? 0) - jumlah);
  const terkait = await ambilTerkait(event);

  const persenTerisi = event.kuota ? Math.min(100, Math.round((jumlah / event.kuota) * 100)) : 0;
  const hampirHabis = sisa <= 5 && sisa > 0;
  const habis = sisa === 0;

  return (
    <article className="mx-auto w-full max-w-4xl text-[#2f1d2d]">
      {/* ===== GAMBAR HERO ===== */}
      <div className="relative h-[280px] overflow-hidden rounded-[28px] border border-[#f1d5e2] shadow-[0_20px_50px_rgba(190,24,93,0.12)] sm:h-[380px]">
        {event.gambar ? (
          <Image src={event.gambar} alt={event.nama} fill sizes="900px" priority className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#f9a8d4] via-[#ec4899] to-[#be185d]">
            <span className="animate-bounce text-8xl">🎉</span>
            <p className="mt-2 text-sm font-bold text-white/80">EventKu • Gambar Segera Hadir</p>
          </div>
        )}
        {/* Overlay bawah biar teks kebaca */}
        <div className="pointer-events-none absolute inset-0 bg-[#be185d]/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#4a1735]/70 to-transparent" />

        {/* Badge Atas */}
        <span className="absolute left-4 top-4 rounded-full bg-[#ec4899] px-3.5 py-1.5 text-[11px] font-black text-white shadow-lg">
          {event.kategori}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/90 px-3.5 py-1.5 text-[11px] font-black text-[#7b3155] backdrop-blur">
          📅 {event.tanggal}
        </span>

        {/* Badge Hampir Habis / Habis */}
        {habis ? (
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-black text-[#be185d] shadow-lg">
            😢 KUOTA HABIS
          </span>
        ) : hampirHabis ? (
          <span className="absolute bottom-4 left-4 animate-pulse rounded-full bg-[#be185d] px-4 py-2 text-xs font-black text-white shadow-lg">
            🔥 TINGGAL {sisa} TIKET LAGI!
          </span>
        ) : (
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-black text-[#b0256a] shadow-lg">
            ✅ MASIH TERSEDIA
          </span>
        )}
      </div>

      {/* ===== INFO UTAMA ===== */}
      <div className="mt-6 overflow-hidden rounded-[28px] border border-[#f1d5e2] bg-white p-6 shadow-[0_16px_40px_rgba(190,24,93,0.08)] sm:p-8">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#be185d]" />

        <div className="mt-4 flex justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[28px] font-black leading-tight text-[#2f1d2d] sm:text-4xl">{event.nama}</h1>
            <p className="mt-2 text-sm text-[#806b78]">📍 {event.lokasi} • 📅 {event.tanggal}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#fff1f6] px-3 py-1 text-[11px] font-bold text-[#b0256a]">🎪 {event.kategori}</span>
              <span className="rounded-full bg-[#fff1f6] px-3 py-1 text-[11px] font-bold text-[#b0256a]">⭐ 4.9 / 5</span>
              <span className="rounded-full bg-[#fff1f6] px-3 py-1 text-[11px] font-bold text-[#b0256a]">👥 {event.kuota ?? 0} Kuota</span>
            </div>
          </div>
          <div className="shrink-0">
            <TombolFavorit eventId={event.id} />
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-[#6b4c62]">{event.deskripsi}</p>

        {/* ===== STATS: Harga / Pesanan / Sisa ===== */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-[#f1d5e2] bg-[#fff5f9] px-4 py-3 text-center">
            <p className="text-sm font-black text-[#b0256a] sm:text-base">{event.harga === 0 ? "GRATIS 🎉" : rupiah(event.harga)}</p>
            <p className="text-[11px] font-bold text-[#806b78]">Harga / Tiket</p>
          </div>
          <div className="rounded-2xl border border-[#f1d5e2] bg-[#fff5f9] px-4 py-3 text-center">
            <p className="text-sm font-black text-[#2f1d2d] sm:text-base">{jumlah} Orang</p>
            <p className="text-[11px] font-bold text-[#806b78]">Sudah Pesan</p>
          </div>
          <div className="rounded-2xl border border-[#f1d5e2] bg-[#fff5f9] px-4 py-3 text-center">
            <p className="text-sm font-black text-[#b0256a] sm:text-base">{habis ? "Habis 😢" : `${sisa} Tiket`}</p>
            <p className="text-[11px] font-bold text-[#806b78]">Sisa Kuota</p>
          </div>
        </div>

        {/* ===== PROGRESS KUOTA - BARU! ===== */}
        <div className="mt-5 rounded-2xl border border-[#f1d5e2] bg-[#fffafc] p-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#806b78]">🔥 Kuota Terisi: <b className="text-[#2f1d2d]">{persenTerisi}%</b></span>
            <span className="text-[#806b78]">{jumlah} / {event.kuota ?? 0} Terisi</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#fce7f3]">
            <div
              className={`h-full rounded-full ${habis ? "bg-[#be185d]" : "bg-gradient-to-r from-[#f9a8d4] via-[#ec4899] to-[#be185d]"}`}
              style={{ width: `${persenTerisi}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] text-[#806b78]">
            {habis
              ? "Kuotanya udah habis. Cek event lain yang masih tersedia ya!"
              : hampirHabis
                ? `Tinggal ${sisa} tiket lagi! Jangan sampai kehabisan!`
                : "Masih banyak kuota. Tapi jangan ditunda-tunda ya, bisa habis kapan aja!"}
          </p>
        </div>

        {/* ===== TOMBOL AKSI ===== */}
        <div className="mt-6 flex flex-wrap gap-3">
          {habis ? (
            <span className="flex-1 rounded-full bg-[#fce7f3] px-6 py-3.5 text-center text-sm font-black text-[#9b7890] sm:flex-none sm:px-8">
              😢 Kuota Habis
            </span>
          ) : (
            <Link
              href={`/pesan?id=${event.id}`}
              className="group relative flex-1 overflow-hidden rounded-full bg-gradient-to-r from-[#ec4899] to-[#be185d] px-6 py-3.5 text-center text-sm font-black text-white shadow-[0_12px_28px_rgba(190,24,93,0.2)] transition hover:scale-[1.02] active:scale-[0.98] sm:flex-none sm:px-8"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">🎟 Pesan Tiket →</span>
            </Link>
          )}
          <Link
            href="/event"
            className="rounded-full border border-[#edcada] bg-white px-6 py-3.5 text-sm font-bold text-[#7b3155] transition hover:bg-[#fff1f6]"
          >
            ← Semua Event
          </Link>
          <Link
            href="/favorit"
            className="rounded-full border border-[#edcada] bg-white px-6 py-3.5 text-sm font-bold text-[#7b3155] transition hover:bg-[#fff1f6]"
          >
            ❤️ Favorit Saya
          </Link>
        </div>
      </div>

      {/* ===== EVENT TERKAIT ===== */}
      <EventTerkait items={terkait} />
    </article>
  );
}