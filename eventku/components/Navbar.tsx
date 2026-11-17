"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/event", label: "Event", icon: "🎪" },
  { href: "/favorit", label: "Favorit", icon: "❤️" },
  { href: "/pesanan", label: "Pesanan", icon: "🎟️" },
  { href: "/tentang", label: "Tentang", icon: "✨" },
  { href: "/kontak", label: "Kontak", icon: "💬" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [fav, setFav] = useState(0);
  const [buka, setBuka] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => {
      try {
        setFav(JSON.parse(localStorage.getItem("favorit-eventku") || "[]").length);
      } catch {}
    };
    sync();
    setBuka(false);
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onFav = (e: any) => setFav(e.detail?.length ?? 0);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "favorit-eventku" || e.key === "favorit") sync();
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("favorit-changed", onFav as any);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("favorit-changed", onFav as any);
      window.removeEventListener("storage", onStorage);
    };
  }, [pathname]);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] border border-[#f1d5e2] bg-white/95 shadow-[0_18px_35px_rgba(236,72,153,0.06)] backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "shadow-[0_18px_35px_rgba(236,72,153,0.09)]" : ""
        }`}
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-[#f9d0e3] via-[#ec4899] to-[#f472b6]" />

        <div className="relative mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9d0e3] via-[#f472b6] to-[#ec4899] text-xl font-black text-white shadow-[0_10px_25px_rgba(236,72,153,0.2)] transition group-hover:rotate-[-8deg] group-hover:scale-110">
              E
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#fff1f6] text-[9px] text-[#be185d]">🏆</span>
            </span>
            <span className="leading-none">
              <span className="block text-[21px] font-black tracking-tight text-[#2f1d2d]">
                Event<span className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] bg-clip-text text-transparent">Ku</span>
              </span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.18em] text-[#8b6a7d]">
                JELAJAHI • PESAN • HADIR
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {menu.map((m) => {
              const aktif = pathname === m.href;
              const badge = m.href === "/favorit" ? fav : 0;
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  className={`relative rounded-full px-4 py-2.5 text-[14px] font-bold transition-all duration-300 ${
                    aktif
                      ? "bg-[#fff1f6] text-[#b0256a] shadow-[0_8px_20px_rgba(236,72,153,0.08)] scale-[1.02]"
                      : "text-[#5a4254] hover:bg-[#fff5f9] hover:text-[#b0256a] hover:scale-[1.02]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{m.icon}</span> {m.label}
                  </span>
                  {badge > 0 && (
                    <span className="absolute -right-1 -top-1.5 flex h-5 min-w-5 animate-bounce items-center justify-center rounded-full bg-[#ec4899] px-1.5 text-[10px] font-black text-white ring-2 ring-white">
                      {badge}
                    </span>
                  )}
                  {aktif && (
                    <span className="absolute -bottom-1 left-1/2 h-[4px] w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#f9a8d4] to-[#ec4899]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <Link
              href="/favorit"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full bg-[#fff5f9] text-lg text-[#b0256a] shadow-[0_8px_20px_rgba(236,72,153,0.08)] transition hover:scale-110 hover:rotate-[-8deg] sm:flex"
            >
              ❤️
              {fav > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ec4899] px-1 text-[11px] font-black text-white ring-2 ring-white">
                  {fav}
                </span>
              )}
            </Link>

            <Link
              href="/event"
              className="group relative hidden overflow-hidden rounded-full bg-[#ec4899] px-5 py-2.5 text-[13px] font-black text-white shadow-[0_10px_25px_rgba(236,72,153,0.18)] transition hover:scale-[1.05] sm:block"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">🎪 Cari Event →</span>
            </Link>

            <button
              onClick={() => setBuka(!buka)}
              aria-label="Buka menu"
              className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition active:scale-90 lg:hidden ${
                buka
                  ? "bg-[#ec4899] text-white"
                  : "border border-[#f5d5e5] bg-[#fff1f6] text-[#be185d]"
              }`}
            >
              <span className={`text-lg transition-transform duration-300 ${buka ? "rotate-90" : ""}`}>
                {buka ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {buka && (
          <div className="border-t border-[#f8dfe9] bg-[#fffafc] px-4 pb-4 pt-2 lg:hidden">
            {menu.map((m) => {
              const aktif = pathname === m.href;
              const badge = m.href === "/favorit" ? fav : 0;
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  className={`flex items-center justify-between rounded-2xl px-3 py-3.5 text-[15px] font-bold transition ${
                    aktif
                      ? "bg-[#fff1f6] text-[#be185d]"
                      : "text-[#4d3a46] hover:bg-[#fff1f6]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base">{m.icon}</span>
                    {m.label}
                    {badge > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ec4899] px-1.5 text-[10px] font-black text-white">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className="text-[#c37ca2]">›</span>
                </Link>
              );
            })}
            <Link
              href="/event"
              className="mt-3 block rounded-full bg-[#ec4899] py-3.5 text-center text-sm font-black text-white shadow-xl"
            >
              🎪 Cari Event Sekarang
            </Link>
            <p className="mt-3 text-center text-[11px] text-[#8b6a7d]">
              ❤️ {fav} event favorit tersimpan • Pink & White • Profesional
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
