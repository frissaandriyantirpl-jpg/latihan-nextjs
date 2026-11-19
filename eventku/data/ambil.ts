
import { events, type Event } from "@/data/events";
import { supabase } from "@/lib/supabase";

// Mengambil data event dari database Supabase
export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal", { ascending: true });

  if (error) {
    throw new Error(`Gagal memuat event: ${error.message}`);
  }

  return (data ?? []) as Event[];
}

// Mengambil event berdasarkan ID
export async function ambilEvent(id: number) {
  return events.find((e) => e.id === id);
}

// Mengambil event terkait berdasarkan kategori
export async function ambilTerkait(event: Event) {
  return events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id
  );
}
