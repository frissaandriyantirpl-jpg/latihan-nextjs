"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { daftarKategori } from "@/data/saring";

function Isi() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q") || "";
  const kategori = sp.get("kategori") || "Semua";
  const [nilai, setNilai] = useState(q);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNilai(q);
  }, [q]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function go(query: string, category: string) {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "Semua") params.set("kategori", category);
    const search = params.toString();
    router.push(search ? `/event?${search}` : "/event");
  }

  function cariNanti(query: string) {
    setNilai(query);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go(query, kategori), 300);
  }

  function reset() {
    setNilai("");
    if (timer.current) clearTimeout(timer.current);
    router.push("/event");
  }

  const adaFilter = Boolean(q || kategori !== "Semua");

  return (
    <div className="rounded-xl border border-[#f1d5e2] bg-white p-3 shadow-[0_8px_20px_rgba(90,35,65,0.05)]">
      <div className="flex flex-col gap-2 sm:flex-row">
        <form
          className="flex min-w-0 flex-1 gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (timer.current) clearTimeout(timer.current);
            go(nilai, kategori);
          }}
        >
          <input
            value={nilai}
            onChange={(event) => cariNanti(event.target.value)}
            placeholder="Cari event..."
            aria-label="Cari event"
            className="min-w-0 flex-1 rounded-md border border-[#ead9e2] bg-white px-3 py-2 text-sm text-[#342735] outline-none placeholder:text-[#a58d9b] focus:border-[#ec4899] focus:ring-2 focus:ring-pink-100"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-[#ec4899] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#d93687]"
          >
            Cari
          </button>
        </form>

        <select
          value={kategori}
          aria-label="Pilih kategori event"
          onChange={(event) => go(nilai, event.target.value)}
          className="rounded-md border border-[#ead9e2] bg-white px-3 py-2 text-sm text-[#5f4a57] outline-none focus:border-[#ec4899] focus:ring-2 focus:ring-pink-100 sm:w-40"
        >
          {daftarKategori.map((option) => (
            <option key={option} value={option}>
              {option === "Semua" ? "Semua kategori" : option}
            </option>
          ))}
        </select>

        {adaFilter && (
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-[#ead9e2] px-3 py-2 text-xs font-semibold text-[#806b78] transition hover:bg-[#fff5f9] hover:text-[#b0256a]"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default function KontrolKatalog() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse rounded-xl border border-[#f1d5e2] bg-white p-3">
          <div className="h-10 rounded-md bg-[#fff1f6]" />
        </div>
      }
    >
      <Isi />
    </Suspense>
  );
}
