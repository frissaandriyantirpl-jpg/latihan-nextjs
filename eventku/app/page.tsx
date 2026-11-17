import Link from "next/link";
import { ambilEvents, ambilEventsTerdekat } from "@/data/ambil";
import KartuEvent from "@/components/KartuEvent";

export default async function Beranda() {
  const semua = await ambilEvents();
  const terdekat = await ambilEventsTerdekat();
  const gratis = semua.filter((e) => e.harga === 0).length;

  const kategori = [
    { l: "Workshop", e: "💻", d: "Belajar skill baru", h: "/event?kategori=Workshop", g: "from-[#fce7f3] to-[#f9a8d4]", shadow: "shadow-pink-200/70", glow: "group-hover:shadow-pink-200/80" },
    { l: "Olahraga", e: "⚽", d: "Sehat & kompetitif", h: "/event?kategori=Olahraga", g: "from-[#fff1f6] to-[#f9a8d4]", shadow: "shadow-pink-200/70", glow: "group-hover:shadow-pink-200/80" },
    { l: "Musik", e: "🎵", d: "Konser & pentas", h: "/event?kategori=Musik", g: "from-[#fffafc] to-[#fbcfe8]", shadow: "shadow-pink-200/70", glow: "group-hover:shadow-pink-200/80" },
    { l: "Bazar & Lomba", e: "🛍", d: "Jajan & berkompetisi", h: "/event?kategori=Bazar", g: "from-[#fff1f6] to-[#f9a8d4]", shadow: "shadow-pink-200/70", glow: "group-hover:shadow-pink-200/80" },
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent text-[#2f1d2d]">
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-[#f2d1df] bg-white p-6 shadow-[0_20px_55px_rgba(236,72,153,0.08)] sm:p-8 md:p-12">
          <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#f472b6]" />
          <div aria-hidden className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#f9d0e3]/70 blur-3xl" />
          <div aria-hidden className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-[#fbcfe8]/50 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl flex-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f3dfe9] bg-[#fff5f9] px-4 py-2 text-[11px] font-black tracking-[0.14em] text-[#b0256a]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ec4899] text-[10px] text-white">🏆</span>
                EVENTKU • JELAJAHI • PESAN • HADIR
              </span>

              <h1 className="mt-5 text-[42px] font-black leading-[0.95] tracking-tight sm:text-5xl md:text-[60px] text-[#2f1d2d]">
                Temukan Event
                <br />
                <span className="mt-2 inline-block rounded-2xl bg-[#ec4899] px-4 py-1 text-white shadow-[0_12px_25px_rgba(236,72,153,0.18)]">
                  Seru
                </span>{" "}
                di
                <br />
                <span className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] bg-clip-text text-transparent">
                  Sekolahmu!
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] font-medium leading-relaxed text-[#5f4a57]">
                Platform event sekolah yang simpel, rapi, dan profesional untuk kegiatan belajar, lomba, dan kreativitas siswa.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/event" className="group relative overflow-hidden rounded-full bg-[#ec4899] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_25px_rgba(236,72,153,0.18)] transition hover:scale-[1.02] active:scale-95">
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Jelajahi Event →</span>
                </Link>
                <Link href="/pesanan" className="rounded-full border border-[#f1d0e1] bg-[#fff5f9] px-6 py-3.5 text-sm font-black text-[#b0256a] transition hover:bg-[#ffeaf4] hover:scale-[1.02]">
                  🎟 Pesanan Saya
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { v: semua.length, l: "Total Event", g: "from-[#f9a8d4] to-[#f472b6]" },
                  { v: gratis, l: "Event Gratis", g: "from-[#fbcfe8] to-[#f472b6]" },
                  { v: 100, l: "Seru Dijamin", g: "from-[#f9d0e3] to-[#ec4899]", suffix: "%" },
                ].map((s) => (
                  <div key={s.l} className="min-w-[110px] flex-1 rounded-2xl border border-[#f3dfe9] bg-[#fffafc] px-4 py-3 shadow-[0_10px_20px_rgba(236,72,153,0.03)] sm:flex-none">
                    <p className={`bg-gradient-to-r ${s.g} bg-clip-text text-2xl font-black text-transparent`}>
                      {s.v}
                      {s.suffix || ""}
                    </p>
                    <p className="text-xs font-bold text-[#876d7c]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden w-[320px] shrink-0 lg:block">
              <div className="rotate-2 rounded-[28px] border border-[#f2d1df] bg-[#fffafc] p-4 shadow-[0_18px_35px_rgba(236,72,153,0.06)] transition hover:rotate-0 hover:scale-[1.02]">
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#fbcfe8] via-[#f472b6] to-[#ec4899] text-7xl shadow-inner">
                  <span className="drop-shadow-2xl animate-bounce">🎵</span>
                </div>
                <p className="mt-3 font-black text-[#2f1d2d]">Konser Musik Sekolah</p>
                <p className="text-sm text-[#675563]">Aula Sekolah • 25 Nov</p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1 text-[11px] font-black text-[#b0256a]">🎵 MUSIK</span>
                  <span className="rounded-full bg-[#fce7f3] px-3 py-1 text-[11px] font-black text-[#b0256a]">🎉 GRATIS</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-6 -rotate-3 rounded-2xl bg-[#ec4899] px-4 py-3 text-white shadow-[0_12px_25px_rgba(236,72,153,0.15)]">
                <p className="text-[11px] font-bold text-white/80">Tiket Terjual</p>
                <p className="font-black">1.240+ 🎟</p>
              </div>
              <div className="absolute -right-3 -top-3 rotate-6 rounded-full bg-[#f9d0e3] px-3 py-1.5 text-[11px] font-black text-[#b0256a] shadow-lg">
                🔥 HOT!
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#2f1d2d]">Jelajahi Kategori ✨</h2>
          <Link href="/event" className="text-sm font-bold text-[#8b6a7d] hover:text-[#be185d]">Semua →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kategori.map((k) => (
            <Link
              key={k.l}
              href={k.h}
              className={`group flex items-center gap-3 rounded-[24px] border border-[#f7d7e6] bg-white p-4 shadow-[0_12px_24px_rgba(236,72,153,0.04)] transition hover:-translate-y-1.5 hover:border-[#f7c3dc] hover:shadow-[0_18px_30px_rgba(236,72,153,0.08)] ${k.glow}`}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${k.g} text-2xl shadow-lg ${k.shadow} transition group-hover:scale-110 group-hover:-rotate-6`}>
                {k.e}
              </span>
              <span>
                <span className="block font-black text-[#2f1d2d]">{k.l}</span>
                <span className="block text-xs text-[#6b4c62]">{k.d}</span>
                <span className="mt-0.5 block text-[11px] font-bold text-[#be185d]">Lihat →</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-[#ec4899] px-3.5 py-1.5 text-[11px] font-black text-white shadow-lg">
              🔥 TRENDING
            </span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl text-[#2f1d2d]">
              Event <span className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] bg-clip-text text-transparent">Terdekat</span>
            </h2>
            <p className="mt-1 text-[15px] text-[#6b4c62]">Jangan sampai kehabisan tiket! Tap ❤️ buat simpan favoritmu.</p>
          </div>
          <Link href="/event" className="rounded-full border border-[#f7d7e6] bg-white px-5 py-2.5 text-sm font-black text-[#be185d] shadow-[0_10px_20px_rgba(236,72,153,0.06)] transition hover:bg-[#fff1f6] hover:scale-105">
            Semua Event →
          </Link>
        </div>
        {terdekat.length === 0 ? (
          <div className="mt-7 rounded-[28px] border border-dashed border-[#f7d7e6] bg-[#fffafc] p-10 text-center shadow-[0_12px_24px_rgba(236,72,153,0.04)]">
            <p className="text-5xl">🎪</p>
            <p className="mt-3 font-black text-[#2f1d2d]">Belum ada event terdekat</p>
            <p className="text-sm text-[#6b4c62]">Cek lagi nanti ya, event baru bakal muncul di sini!</p>
          </div>
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {terdekat.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-[#f7d7e6] bg-gradient-to-r from-[#fff6fb] via-[#fffafc] to-[#fff1f6] p-7 text-[#2f1d2d] shadow-[0_18px_40px_rgba(236,72,153,0.08)] sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#f472b6]" />
          <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f9d0e3]/60 blur-2xl" />
          <div aria-hidden className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#fbcfe8]/60 blur-2xl" />
          <div className="relative">
            <p className="flex items-center gap-2 text-[22px] font-black leading-tight text-[#2f1d2d]">
              Jangan Sampai Kehabisan Tiket! <span className="animate-bounce">🎟</span>
            </p>
            <p className="mt-1 text-sm text-[#6b4c62]">Event favorit kamu bisa habis kapan aja. Simpan sekarang, pesan sebelum kehabisan!</p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#be185d]">⚡ Cepat</span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#be185d]">🔒 Aman</span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#be185d]">🎟 Langsung Dapat Tiket</span>
            </div>
          </div>
          <Link href="/event" className="relative shrink-0 rounded-full bg-[#ec4899] px-7 py-3.5 text-center text-sm font-black text-white shadow-[0_12px_25px_rgba(236,72,153,0.2)] transition hover:scale-105 active:scale-95">
            Lihat Event →
          </Link>
        </div>
      </section>
    </div>
  );
}
