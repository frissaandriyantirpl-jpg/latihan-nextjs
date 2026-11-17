"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ eventId }: { eventId: number }) {
  const [suka, setSuka] = useState(false);
  const [burst, setBurst] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved: number[] = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      setSuka(saved.includes(eventId));
    } catch {}
  }, [eventId]);

  function klik() {
    try {
      const f: number[] = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      const isFav = f.includes(eventId);
      const b = isFav ? f.filter((x) => x !== eventId) : [...f, eventId];
      setSuka(!suka);
      localStorage.setItem("favorit-eventku", JSON.stringify(b));
      localStorage.setItem("favorit", JSON.stringify(b));

      if (!isFav) {
        setBurst(true);
        setTimeout(() => setBurst(false), 700);
        window.dispatchEvent(new CustomEvent("favorit-toast", { detail: { eventId, added: true } }));
      } else {
        window.dispatchEvent(new CustomEvent("favorit-toast", { detail: { eventId, added: false } }));
      }
      window.dispatchEvent(new CustomEvent("favorit-changed", { detail: b }));
    } catch {}
  }

  if (!mounted) return null;

  return (
    <div className="relative inline-flex">
      <div
        aria-hidden
        className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${
          suka ? "bg-gradient-to-r from-[#f472b6] to-[#be185d] opacity-40" : "bg-gradient-to-r from-[#f9a8d4] to-[#ec4899] opacity-30"
        }`}
      />
      {burst && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          {["💖", "✨", "❤️", "💥", "⭐", "🔥"].map((e, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 animate-[burst_0.7s_ease-out_forwards] text-base"
              style={{
                ["--tx" as any]: `${Math.cos((i / 6) * Math.PI * 2) * 48}px`,
                ["--ty" as any]: `${Math.sin((i / 6) * Math.PI * 2) * 48}px`,
              }}
            >
              {e}
            </span>
          ))}
        </span>
      )}

      <button
        onClick={klik}
        aria-pressed={suka}
        className={`group relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-sm font-black tracking-wide text-white shadow-lg transition-all duration-300 active:scale-90 hover:scale-[1.03] ${
          suka
            ? "bg-gradient-to-r from-[#ec4899] to-[#be185d] shadow-pink-200"
            : "bg-gradient-to-r from-[#f472b6] to-[#ec4899] shadow-pink-200"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center gap-2">
          <span className={`inline-block transition-transform duration-300 ${suka ? "scale-125 animate-pulse" : "group-hover:scale-125 group-hover:-rotate-12"}`}>
            {suka ? "❤️" : "🤍"}
          </span>
          {suka ? "Disimpan" : "Favorit"}
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${suka ? "bg-white/25" : "bg-white/20"}`}>
            {suka ? "ON" : "OFF"}
          </span>
        </span>
      </button>

      <style jsx>{`
        @keyframes burst {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.4); }
          100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.4) rotate(40deg); }
        }
      `}</style>
    </div>
  );
}