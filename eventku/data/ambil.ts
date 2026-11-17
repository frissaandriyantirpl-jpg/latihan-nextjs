import { events, type Event } from "@/data/events";

// MISI 17 - MASIH DATA LOKAL, BELUM DATABASE

export async function ambilEvents(): Promise<Event[]> {
  return events;
}

export async function ambilEventsTerdekat(): Promise<Event[]> {
  return events.slice(0, 3);
}

export async function ambilEvent(id: number): Promise<Event | null> {
  if (!Number.isInteger(id)) return null;
  return events.find((e) => e.id === id) ?? null;
}

export async function ambilEventTerkait(
  id: number,
  kategori: string
): Promise<Event[]> {
  return events
    .filter((e) => e.kategori === kategori && e.id !== id)
    .slice(0, 3);
}

// Buat Misi 17, pesanan masih 0 dulu
// Nanti di Misi 20 baru diganti pake Supabase
export async function hitungPesanan(_eventId: number): Promise<number> {
  return 0;
}

export async function ambilTiket(_eventId: number): Promise<[]> {
  return [];
}