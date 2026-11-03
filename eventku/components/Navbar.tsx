
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <Link href="/" className="flex items-center gap-3" aria-label="Eventku, beranda">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-amber-300">
          E
        </span>
        <span className="text-xl font-black tracking-tight">Eventku</span>
      </Link>
      <div className="flex items-center gap-5 sm:gap-8">
        <Link
          href="/event"
          className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-950 sm:block"
        >
          Jelajahi Event
        </Link>
        <Link
          href="/favorit"
          className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-950 sm:block"
        >
          Favorit
        </Link>
        <Link
          href="/#tentang"
          className="hidden text-sm font-semibold text-slate-600 transition hover:text-slate-950 sm:block"
        >
          Tentang
        </Link>
        <Link
          href="/event"
          className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-800 sm:px-5"
        >
          Cari Event
        </Link>
      </div>
    </nav>
  );
}
