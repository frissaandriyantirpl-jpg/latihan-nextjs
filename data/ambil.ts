import { events, type Event } from "@/data/events";

// Pura-pura mengambil data dari database
// yang membutuhkan waktu.
function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Mengambil semua event
export async function ambilEvents() {
  await jeda(1500);
  return events;
}

// Mengambil satu event berdasarkan ID
export async function ambilEvent(id: number) {
  await jeda(800);
  return events.find((e) => e.id === id);
}

// Mengambil event lain dengan kategori yang sama
export async function ambilTerkait(event: Event) {
  await jeda(2000);

  return events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id,
  );
}
