"use server";
import { revalidatePath } from "next/cache";

export async function buatPesanan(_form: FormData) {
  // Misi 17: belum simpan ke database
  // Nanti Misi 20 baru simpan ke Supabase
  revalidatePath("/pesanan");
  return { ok: true };
}