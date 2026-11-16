
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { events } from "@/data/events";

export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: {
    nama?: string;
    email?: string;
    jumlah?: string;
  };
  isian: {
    nama: string;
    email: string;
  };
};

export async function pesanTiket(
  state: HasilPesan,
  formData: FormData,
): Promise<HasilPesan> {
  const eventIdStr = formData.get("eventId") as string;
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const jumlahStr = formData.get("jumlah") as string;

  const eventId = Number(eventIdStr);
  const jumlah = Number(jumlahStr);

  const galat: HasilPesan["galat"] = {};

  if (!nama || nama.trim().length < 3) {
    galat.nama = "Nama minimal 3 huruf.";
  }

  if (!email || !email.includes("@")) {
    galat.email = "Email harus memuat tanda @.";
  }

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return {
      berhasil: false,
      pesan: "Event tidak ditemukan.",
      galat: {},
      isian: { nama, email },
    };
  }

  const sisaKuota = event.kuota - event.terisi;

  if (!jumlah || jumlah < 1 || jumlah > 5 || jumlah > sisaKuota) {
    galat.jumlah =
      "Maksimal 5 tiket per pesanan atau melebihi sisa kuota.";
  }

  if (Object.keys(galat).length > 0) {
    return {
      berhasil: false,
      pesan: "Periksa lagi isian yang merah.",
      galat,
      isian: { nama, email },
    };
  }

  // Simulasi proses simpan pesanan
  event.terisi += jumlah;

  // Menyimpan nama ke Cookie selama 30 hari
  const toples = await cookies();

  toples.set("nama", nama.trim(), {
    maxAge: 60 * 60 * 24 * 30,
  });

  // Memperbarui tampilan secara langsung tanpa perlu F5
  revalidatePath("/event");
  revalidatePath(`/event/${eventId}`);
  revalidatePath("/pesanan");

  return {
    berhasil: true,
    pesan: `Pesanan #${Math.floor(Math.random() * 900 + 100)} tersimpan: ${jumlah} tiket untuk ${nama}.`,
    galat: {},
    isian: { nama: "", email: "" },
  };
}
