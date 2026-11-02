export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <div className="mx-auto max-w-5xl p-10">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
              E
            </div>
            <span className="text-xl font-bold">Eventku</span>
          </div>
          <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
            Daftar Event
          </button>
        </header>

        <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Event pilihan terbaik
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Temukan pengalaman event yang bikin kamu ingin datang lagi.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600">
              Eventku membantu kamu menemukan festival, seminar, konser, dan gathering
              favorit dengan pengalaman booking yang cepat dan aman.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#event"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
              >
                Jelajahi Event
              </a>
              <a
                href="#about"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Featured</p>
            <h2 className="mt-3 text-3xl font-bold">Sunset Music Festival</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span>Tanggal</span>
                <span className="text-white">12 Sep 2026</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span>Lokasi</span>
                <span className="text-white">Taman Menteng</span>
              </div>
              <div className="flex justify-between">
                <span>Harga mulai</span>
                <span className="text-amber-300">Rp 199.000</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
