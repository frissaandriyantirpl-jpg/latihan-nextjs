"use client";

import { useEffect, useState } from "react";

export default function TombolFavorit({
  id,
  compact = false,
  onFavoriteChange,
}: {
  id: number;
  compact?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorit(simpan.includes(id));
  }, [id]);

  function ubah() {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );

    const baru = simpan.includes(id)
      ? simpan.filter((x) => x !== id)
      : [...simpan, id];

    localStorage.setItem("favorit", JSON.stringify(baru));
    const isFavorite = baru.includes(id);
    setFavorit(isFavorite);
    onFavoriteChange?.(isFavorite);
  }

  return (
    <button
      type="button"
      onClick={ubah}
      aria-pressed={favorit}
      aria-label={favorit ? "Hapus dari favorit" : "Tambah ke favorit"}
      title={favorit ? "Hapus dari favorit" : "Tambah ke favorit"}
      className={
        compact
          ? "flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-rose-700 shadow-sm transition hover:scale-105 hover:bg-rose-50"
          : "mt-5 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      }
    >
      {compact
        ? favorit ? "♥" : "♡"
        : favorit ? "♥ Hapus dari favorit" : "♡ Tambah ke favorit"}
    </button>
  );
}
