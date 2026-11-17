"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";
import { buatPesanan } from "@/app/action";

export default function FormPesan({ event }: { event: Event }) {
  const [jumlah, setJumlah] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [sukses, setSukses] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const total = useMemo(() => event.harga * jumlah, [event.harga, jumlah]);
  const kuotaRendah = event.kuota <= 10;
  const persenKuota = Math.min(100, Math.max(8, (jumlah / event.kuota) * 100));

  function ubahJumlah(n: number) {
    const v = Math.max(1, Math.min(event.kuota, n));
    setJumlah(v);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    fd.set("event_id", String(event.id));
    fd.set("jumlah", String(jumlah));
    fd.set("total", String(total));
    try {
      await buatPesanan(fd);
      setSukses(true);
      setTimeout(() => router.push("/pesanan"), 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || "Gagal membuat pesanan. Coba lagi ya!");
    } finally {
      setLoading(false);
    }
  }

  if (sukses) {
    return (
      <div className="relative mt-6 overflow-hidden rounded-[28px] border border-emerald-400/40 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-center text-white shadow-[0_25px_60px_rgba(16,185,129,0.4)]">
        <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-white text-4xl shadow-xl">🎉</div>
        <h3 className="mt-4 text-2xl font-black">Pesanan Berhasil!</h3>
        <p className="mt-1 text-white/80 text-sm">Mengalihkan ke halaman Pesanan...</p>
        <p className="mt-3 rounded-full bg-white/20 px-4 py-2 text-sm font-bold inline-block">🎟 {jumlah} tiket • {rupiah(total)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative mt-6 overflow-hidden rounded-[28px] border border-white/25 bg-[#1a0533]/90 p-5 shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl sm:p-6">
      {/* Glow + garis pelangi */}
      <div aria-hidden className="pointer-events-none absolute -inset-3 -z-10 rounded-[32px] bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 opacity-30 blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl" />

      {/* Header form */}
      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black tracking-[0.22em] text-white/60">🎟 FORM PEMESANAN</p>
          <h3 className="mt-1 text-xl font-black leading-tight text-white">{event.nama}</h3>
          <p className="mt-1 text-sm text-white/60">📅 {event.tanggal} • 📍 {event.lokasi}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-black shadow-lg ${event.harga === 0 ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white" : "bg-white text-zinc-900"}`}>
          {event.harga === 0 ? "🎉 GRATIS" : rupiah(event.harga)}
        </span>
      </div>

      {/* Ringkasan harga - Berwarna */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 p-[2px] shadow-lg">
        <div className="rounded-[14px] bg-[#2a0a5e]/95 p-4 backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Harga / tiket</span>
            <span className="font-black text-white">{rupiah(event.harga)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-white/70">Jumlah</span>
            <span className="font-black text-white">× {jumlah} tiket</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3">
            <span className="font-black text-white">Total Bayar</span>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-2xl font-black text-transparent">
              {rupiah(total)}
            </span>
          </div>
          {event.harga === 0 && (
            <p className="mt-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-center text-[12px] font-bold text-emerald-200">
              ✨ Event ini GRATIS — langsung pesan aja!
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-5 space-y-4">
        {/* Nama */}
        <div>
          <label className="mb-1.5 block text-[12px] font-black tracking-wide text-white/70">👤 NAMA LENGKAP</label>
          <div className="group relative">
            <input
              name="nama"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Andi Pratama"
              className="w-full rounded-2xl border-2 border-white/20 bg-white/[0.08] px-4 py-3.5 pl-11 text-sm font-medium text-white outline-none backdrop-blur transition placeholder:text-white/40 focus:border-pink-400 focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(236,72,153,0.2)]"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">👤</span>
            {nama && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300">✓</span>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-[12px] font-black tracking-wide text-white/70">📧 EMAIL</label>
          <div className="relative">
            <input
              name="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamu@email.com"
              className="w-full rounded-2xl border-2 border-white/20 bg-white/[0.08] px-4 py-3.5 pl-11 text-sm font-medium text-white outline-none backdrop-blur transition placeholder:text-white/40 focus:border-cyan-400 focus:bg-white/[0.12] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.2)]"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">📧</span>
            {email.includes("@") && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300">✓</span>}
          </div>
          <p className="mt-1 text-[11px] text-white/40">Tiket & bukti pesanan akan dikirim ke email ini.</p>
        </div>

        {/* Jumlah - Stepper modern */}
        <div>
          <label className="mb-1.5 block text-[12px] font-black tracking-wide text-white/70">🎟 JUMLAH TIKET</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => ubahJumlah(jumlah - 1)}
              disabled={jumlah <= 1}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-black text-white transition hover:bg-white/20 active:scale-90 disabled:opacity-30"
            >
              −
            </button>
            <div className="relative flex-1">
              <input
                type="number"
                min={1}
                max={event.kuota}
                value={jumlah}
                onChange={(e) => ubahJumlah(Number(e.target.value) || 1)}
                className="w-full rounded-2xl border-2 border-white/20 bg-white/[0.08] px-4 py-3.5 text-center text-lg font-black text-white outline-none backdrop-blur transition focus:border-amber-400"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-white/40">/ {event.kuota}</span>
            </div>
            <button
              type="button"
              onClick={() => ubahJumlah(jumlah + 1)}
              disabled={jumlah >= event.kuota}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-xl font-black text-white shadow-lg transition hover:scale-110 active:scale-90 disabled:opacity-30"
            >
              +
            </button>
          </div>

          {/* Progress kuota */}
          <div className="mt-3">
            <div className="mb-1.5 flex justify-between text-[11px] font-bold">
              <span className={kuotaRendah ? "text-red-300" : "text-white/60"}>
                {kuotaRendah ? "🔥 Hampir Habis!" : "🎟 Sisa kuota"}
              </span>
              <span className="text-white/70">Sisa {event.kuota - jumlah} setelah pesan ini</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className={`h-full rounded-full transition-all duration-500 ${kuotaRendah ? "bg-gradient-to-r from-red-500 to-orange-400" : "bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500"}`}
                style={{ width: `${persenKuota}%` }}
              />
            </div>
          </div>

          {/* Quick pick jumlah */}
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => ubahJumlah(n)}
                disabled={n > event.kuota}
                className={`flex-1 rounded-full py-2 text-xs font-black transition active:scale-95 disabled:opacity-30 ${jumlah === n ? "bg-white text-[#2a0a5e] shadow-lg scale-[1.03]" : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"}`}
              >
                {n} Tiket
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <p className="rounded-2xl bg-red-500/20 px-4 py-3 text-center text-sm font-bold text-red-200 border border-red-400/30">
            ⚠️ {errorMsg}
          </p>
        )}

        {/* Tombol Pesan */}
        <button
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 py-4 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:scale-100"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Memproses Pesanan...
              </>
            ) : (
              <>🎟 Pesan Sekarang • {rupiah(total)}</>
            )}
          </span>
        </button>

        <p className="text-center text-[11px] leading-relaxed text-white/40">
          🔒 Pembayaran aman • 🎟 Tiket langsung dikirim ke email<br />
          Dengan memesan, kamu setuju dengan syarat & ketentuan EventKu.
        </p>
      </div>
    </form>
  );
}
