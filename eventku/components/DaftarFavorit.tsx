"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Event } from "@/data/events";

function isEventList(value: unknown): value is Event[] {
  return (
    Array.isArray(value) &&
    value.every(
      (event) =>
        typeof event === "object" &&
        event !== null &&
        typeof event.id === "number" &&
        typeof event.judul === "string" &&
        typeof event.kategori === "string" &&
        typeof event.tanggal === "string" &&
        typeof event.lokasi === "string" &&
        typeof event.harga === "number" &&
        typeof event.kuota === "number" &&
        typeof event.terisi === "number",
    )
  );
}

function readFavoriteIds(): number[] {
  const saved = localStorage.getItem("favorit");
  if (!saved) return [];

  const value: unknown = JSON.parse(saved);
  if (!Array.isArray(value) || !value.every(Number.isInteger)) {
    throw new Error("Data favorit tersimpan tidak valid.");
  }

  return value;
}

export default function DaftarFavorit() {
  const [events, setEvents] = useState<Event[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function ambilFavorit() {
      try {
        const response = await fetch("/api/events", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data (HTTP ${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!isEventList(data)) {
          throw new Error("Format data event dari API tidak valid.");
        }

        setEvents(data);
        setIds(readFavoriteIds());
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setGalat(
          error instanceof Error ? error.message : "Gagal mengambil data.",
        );
      } finally {
        if (!controller.signal.aborted) setMemuat(false);
      }
    }

    void ambilFavorit();
    return () => controller.abort();
  }, []);

  if (memuat) {
    return <p role="status" className="mt-8 text-slate-500">Memuat...</p>;
  }

  if (galat) {
    return <p role="alert" className="mt-8 text-red-600">{galat}</p>;
  }

  const favorit = events.filter((event) => ids.includes(event.id));

  if (favorit.length === 0) {
    return (
      <p className="mt-8 text-slate-500">
        Belum ada favorit. Tekan ikon hati pada event untuk menambahkannya.
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-3">
      {favorit.map((event) => (
        <li key={event.id}>
          <Link
            href={`/event/${event.id}`}
            className="font-semibold text-blue-700 hover:underline"
          >
            {event.judul}
          </Link>
        </li>
      ))}
    </ul>
  );
}
