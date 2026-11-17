import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import FormPesan from "@/components/FormPesan";

export default async function PesanPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const semua = await ambilEvents();
  const event = semua.find((e) => String(e.id) === id);

  return (
    <div className="mx-auto max-w-xl text-white">
      {/* Header */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-6 text-center shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-[10px]">🎟</span>
          LANGKAH 2 DARI 2 • HAMPIR SELESAI!
        </span>
        <h1 className="mt-3 text-3xl font-black leading-tight">
          Pesan Tiket{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">🎟</span>
        </h1>
        <p className="mt-1 text-sm text-white/60">Isi data kamu dengan benar, ya. Tiketnya langsung tersimpan!</p>

        {/* Progress */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold">
          <span className="rounded-full bg-white/15 px-3 py-1 text-white/50">1. Pilih Event ✅</span>
          <span className="text-white/40">→</span>
          <span className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-3 py-1 text-white">2. Isi Form 📝</span>
          <span className="text-white/40">→</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-white/50">3. Cek Pesanan 🎟</span>
        </div>
      </div>

      {event ? (
        <>
          {/* Info Event yang dipilih */}
          <div className="mt-5 overflow-hidden rounded-[24px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl">
            <p className="text-[11px] font-black tracking-[0.22em] text-white/60">🎪 EVENT YANG KAMU PILIH:</p>
            <div className="mt-3 flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600 text-2xl shadow-lg">
                🎪
              </span>
              <div className="min-w-0">
                <p className="text-lg font-black leading-tight">{event.judul}</p>
                <p className="mt-1 text-sm text-white/60">
                  📍 {event.lokasi} • 📅 {event.tanggal}
                </p>
                <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/80">
                  {event.kategori}
                </span>
              </div>
            </div>
          </div>

          {/* FORM-nya di sini - ini yang muncul pas klik Pesan Sekarang */}
          <div className="mt-5">
            <FormPesan event={event} />
          </div>

          <p className="mt-4 text-center text-[12px] text-white/40">
            🔒 Datamu aman. Setelah klik <b className="text-white">“Pesan Sekarang”</b> di form, kamu langsung dibawa ke <b className="text-white">Daftar Pesanan</b>.
          </p>
        </>
      ) : (
        <div className="mt-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-8 text-center backdrop-blur-2xl">
          <p className="text-5xl">😅</p>
          <p className="mt-3 text-lg font-black">Pilih event dulu ya.</p>
          <p className="mt-1 text-sm text-white/60">Kamu belum pilih event apa-apa. Yuk pilih dulu yang paling seru!</p>
          <Link
            href="/event"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95"
          >
            🎪 Pilih Event →
          </Link>
        </div>
      )}
    </div>
  );
}
