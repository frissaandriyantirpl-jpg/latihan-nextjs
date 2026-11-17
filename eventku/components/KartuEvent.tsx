"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";

function styleK(k: string, nama: string) {
  const x = k.toLowerCase();
  const judul = nama.toLowerCase();
  if (x.includes("workshop") && judul.includes("react"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "💻",
      g: "from-[#2563eb] via-[#0ea5e9] to-[#06b6d4]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  if (x.includes("musik"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "🎵",
      g: "from-[#7c3aed] via-[#a855f7] to-[#ec4899]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  if (x.includes("olahraga"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "⚽",
      g: "from-[#16a34a] via-[#22c55e] to-[#84cc16]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  if (x.includes("bazar"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "🛍",
      g: "from-[#ea580c] via-[#f97316] to-[#facc15]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  if (x.includes("lomba"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "🏆",
      g: "from-[#dc2626] via-[#ef4444] to-[#f97316]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  if (x.includes("workshop"))
    return {
      badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
      emoji: "💻",
      g: "from-[#0f766e] via-[#14b8a6] to-[#38bdf8]",
      glow: "group-hover:shadow-pink-200/70",
      accent: "text-[#b0256a]",
    };
  return {
    badge: "bg-[#fff5f9] text-[#b0256a] border border-[#f1d5e2]",
    emoji: "🎉",
    g: "from-[#7c3aed] via-[#c026d3] to-[#ec4899]",
    glow: "group-hover:shadow-pink-200/70",
    accent: "text-[#b0256a]",
  };
}

export default function KartuEvent({ event }: { event: Event }) {
  const [suka, setSuka] = useState(false);
  const [burst, setBurst] = useState(false);
  const s = styleK(event.kategori, event.nama);

  const kuotaRendah = event.kuota <= 10;

  useEffect(() => {
    try {
      setSuka(JSON.parse(localStorage.getItem("favorit-eventku") || "[]").includes(event.id));
    } catch {}
  }, [event.id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const f: number[] = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      const isFav = f.includes(event.id);
      const b = isFav ? f.filter((x) => x !== event.id) : [...f, event.id];
      setSuka(!suka);
      localStorage.setItem("favorit-eventku", JSON.stringify(b));
      localStorage.setItem("favorit", JSON.stringify(b));
      window.dispatchEvent(new CustomEvent("favorit-changed", { detail: b }));
      window.dispatchEvent(new CustomEvent("favorit-toast", { detail: { eventId: event.id, added: !isFav } }));
      if (!isFav) {
        setBurst(true);
        setTimeout(() => setBurst(false), 700);
      }
    } catch {}
  }

  return (
    <Link
      href={`/event/${event.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-[#f1d5e2] bg-white shadow-[0_8px_22px_rgba(90,35,65,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e9a9c7] hover:shadow-[0_14px_30px_rgba(90,35,65,0.1)] ${s.glow}`}
    >
      <div className={`relative flex h-[112px] items-end overflow-hidden bg-gradient-to-br ${s.g} p-3`}>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full text-white"
          viewBox="0 0 320 150"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <circle cx="30" cy="24" r="20" stroke="currentColor" strokeOpacity=".36" />
          <circle cx="30" cy="24" r="34" stroke="currentColor" strokeOpacity=".22" />
          <circle cx="274" cy="28" r="25" stroke="currentColor" strokeOpacity=".3" />
          <circle cx="274" cy="28" r="42" stroke="currentColor" strokeOpacity=".18" />
          <circle cx="226" cy="100" r="18" stroke="currentColor" strokeOpacity=".3" />
          <circle cx="226" cy="100" r="33" stroke="currentColor" strokeOpacity=".2" />
          <circle cx="78" cy="118" r="27" stroke="currentColor" strokeOpacity=".28" />
          <circle cx="154" cy="45" r="12" stroke="currentColor" strokeOpacity=".24" />
          <circle cx="128" cy="101" r="9" stroke="currentColor" strokeOpacity=".28" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#7b174d]/35 to-transparent" />
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-[#9d2862]">
          {event.kategori}
        </span>
        <div className="absolute left-2 top-2">
          {burst && (
            <span aria-hidden className="pointer-events-none absolute inset-0">
              {["💖", "✨", "❤️"].map((em, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 animate-[burst_0.7s_ease-out_forwards] text-sm"
                  style={{
                    ["--tx" as any]: `${(i - 1) * 32}px`,
                    ["--ty" as any]: `-28px`,
                  }}
                >
                  {em}
                </span>
              ))}
            </span>
          )}
          <button
            onClick={toggle}
            aria-label={suka ? "Hapus dari favorit" : "Simpan ke favorit"}
            aria-pressed={suka}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full text-sm shadow-md transition-all duration-300 active:scale-90 hover:scale-110 ${
              suka
                ? "bg-[#ec4899] text-white"
                : "bg-white/90 text-[#ec4899]"
            }`}
          >
            <span className={suka ? "scale-125 animate-pulse" : ""}>{suka ? "❤️" : "🤍"}</span>
          </button>
        </div>
        <h2 className="relative z-10 line-clamp-2 pr-2 text-sm font-bold leading-tight text-white drop-shadow-sm">
          {event.nama}
        </h2>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#342735] transition group-hover:text-[#b0256a]">
          {event.nama}
        </h3>
        <p className="mt-1 text-[10px] text-[#806b78]">
          {event.tanggal} · {event.lokasi}
        </p>
        <p className={`mt-2 text-[11px] font-semibold ${event.harga === 0 ? "text-[#b0256a]" : "text-[#6b4c62]"}`}>
          {event.harga === 0 ? "Gratis" : rupiah(event.harga)}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className={`text-[11px] font-semibold ${event.kuota === 0 ? "text-rose-600" : kuotaRendah ? "text-[#b0256a]" : "text-[#806b78]"}`}>
            {event.kuota === 0 ? "Tiket habis" : `Sisa ${event.kuota} tiket`}
          </span>
          <span className="rounded-md bg-[#ec4899] px-2.5 py-1 text-[10px] font-bold text-white transition group-hover:bg-[#d93687]">
            Lihat detail
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes burst {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.4); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.3) rotate(30deg); }
        }
      `}</style>
    </Link>
  );
}
