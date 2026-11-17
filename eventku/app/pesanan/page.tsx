"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pesanan = {
  id: string;
  event_id: string | number;
  judul?: string;
  nama: string;
  whatsapp?: string;
  jumlah: number;
  total: number;
  tanggalPesan?: string;
  // Biar cocok sama data lama dari buatPesanan()
  [key: string]: unknown;
};

const KEY = "pesanan-eventku";

function rupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);
}

export default function PesananPage() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [siap, setSiap] = useState(false);

  // Baca dari localStorage pas halaman dibuka
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPesanan(JSON.parse(raw));
    } catch {}
    setSiap(true);
  }, []);

  const hapusPesanan = (id: string) => {
    const sisa = pesanan.filter((p) => p.id !== id);
    setPesanan(sisa);
    localStorage.setItem(KEY, JSON.stringify(sisa));
  };

  const hapusSemua = () => {
    if (!confirm("Hapus semua pesanan?")) return;
    setPesanan([]);
    localStorage.removeItem(KEY);
  };

  const totalSemua = pesanan.reduce((a, p) => a + (Number(p.total) || 0), 0);
  const totalTiket = pesanan.reduce((a, p) => a + (Number(p.jumlah) || 0), 0);

  if (!siap) {
    return (
      <div className="mx-auto max-w-3xl text-center text-white">
        <p className="mt-10 animate-pulse text-white/60">⏳ Memuat pesananmu...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl text-white">
      {/* Header */}
      <div className="overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-6 text-center shadow-[0_25px_60px_rgba(124,58,237,0.35)] backdrop-blur-2xl">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-500 via-violet-500 to-cyan-400" />
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wider">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-[10px]">🎟</span>
          PESANAN SAYA
        </span>
        <h1 className="mt-3 text-3xl font-black">
          Pesanan Saya{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">🎟</span>
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Total <b className="text-white">{pesanan.length} pesanan</b> • <b className="text-white">{totalTiket} tiket</b> • <b className="text-white">{rupiah(totalSemua)}</b>
        </p>
        {pesanan.length > 0 && (
          <button
            onClick={hapusSemua}
            className="mt-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-rose-500/20 hover:text-rose-200"
          >
            🗑 Hapus Semua
          </button>
        )}
      </div>

      {/* List Pesanan */}
      {pesanan.length === 0 ? (
        <div className="mt-5 overflow-hidden rounded-[28px] border border-white/20 bg-[#1a0533]/90 p-8 text-center backdrop-blur-2xl">
          <p className="text-5xl">🎟</p>
          <p className="mt-3 text-lg font-black">Belum ada pesanan</p>
          <p className="mt-1 text-sm text-white/60">
            Yuk pesan tiket pertamamu! Pilih event yang kamu suka, isi form, langsung masuk ke sini.
          </p>
          <Link
            href="/event"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-[0_15px_35px_rgba(236,72,153,0.45)] transition hover:scale-105 active:scale-95"
          >
            🎪 Cari Event Seru →
          </Link>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {pesanan.map((p, i) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-[24px] border border-white/20 bg-[#1a0533]/90 p-5 backdrop-blur-2xl transition hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600 text-xl shadow">
                    🎟
                  </span>
                  <div>
                    <p className="font-black leading-tight">{p.judul || `Event #${p.event_id}`}</p>
                    <p className="mt-0.5 text-xs text-white/50">
                      Pesanan #{i + 1} • {p.tanggalPesan || "Baru saja"} • ID: {String(p.id).slice(0, 8)}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      👤 {p.nama} {p.whatsapp ? `• 📱 ${p.whatsapp}` : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => hapusPesanan(p.id)}
                  className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:bg-rose-500 hover:text-white"
                >
                  🗑 Hapus
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">{p.jumlah} Tiket</span>
                <span className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-3 py-1.5 text-xs font-black text-white">
                  Total: {rupiah(Number(p.total))}
                </span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-bold text-emerald-300">✅ Berhasil Dipesan</span>
              </div>

              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-full bg-gradient-to-r from-yellow-300 via-pink-500 to-cyan-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cara Pesan - Biar user paham alurnya */}
      <div className="mt-5 rounded-[24px] border border-white/15 bg-white/5 p-5 text-center">
        <p className="text-[11px] font-black tracking-[0.22em] text-white/60">✨ CARA PESAN — 3 LANGKAH DOANG:</p>
        <p className="mt-2 text-sm text-white/70">
          <b className="text-white">1.</b> Di halaman Event, klik <b className="text-white">“Pesan Sekarang”</b> →{" "}
          <b className="text-white">2.</b> Isi form di <b className="text-white">/pesan</b> →{" "}
          <b className="text-white">3.</b> Otomatis masuk ke sini (<b className="text-white">/pesanan</b>) 🎉
        </p>
      </div>
    </div>
  );
}

