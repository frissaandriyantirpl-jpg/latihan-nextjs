
import Link from "next/link";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { pesanan } from "@/data/pesanan";
import { rupiah } from "@/data/events";

type PesananItem = {
  nomor: number;
  judul: string;
  nama: string;
  jumlah: number;
  total: number;
};

// Komponen yang membaca Cookie
async function KontenPesanan() {
  const cookieStore = await cookies();
  const namaCookie = cookieStore.get("nama")?.value ?? "";

  const daftarPesanan = pesanan as PesananItem[];

  const totalTiket = daftarPesanan.reduce(
    (total, p) => total + p.jumlah,
    0
  );

  const pendapatan = daftarPesanan.reduce(
    (total, p) => total + p.total,
    0
  );

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">
        Daftar Pesanan
      </h1>

      {namaCookie && (
        <div className="mb-4 rounded-xl bg-green-50 p-4 text-green-800">
          <p className="font-semibold">
            Halo, {namaCookie}!
          </p>
          <p className="text-sm">
            Pesananmu ditandai "Kamu".
          </p>
        </div>
      )}

      {daftarPesanan.length === 0 ? (
        <p className="text-slate-500">
          Belum ada pesanan.{" "}
          <Link
            href="/event"
            className="text-blue-600 underline"
          >
            Pilih event
          </Link>
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-500">
            {daftarPesanan.length} pesanan · {totalTiket} tiket
            · pendapatan {rupiah(pendapatan)}
          </p>

          <table className="w-full rounded-xl border bg-white text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Event</th>
                <th className="p-2">Pemesan</th>
                <th className="p-2">Tiket</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {daftarPesanan.map((p) => {
                const milikSaya =
                  namaCookie !== "" &&
                  p.nama.trim().toLowerCase() ===
                    namaCookie.trim().toLowerCase();

                return (
                  <tr key={p.nomor} className="border-t">
                    <td className="p-2">{p.nomor}</td>
                    <td className="p-2">{p.judul}</td>
                    <td className="p-2">
                      {p.nama}

                      {milikSaya && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Kamu
                        </span>
                      )}
                    </td>
                    <td className="p-2">{p.jumlah}</td>
                    <td className="p-2">
                      {rupiah(p.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// Halaman utama dengan Suspense
export default function HalamanPesanan() {
  return (
    <Suspense
      fallback={
        <p className="p-4 text-slate-500">
          Memuat daftar pesanan...
        </p>
      }
    >
      <KontenPesanan />
    </Suspense>
  );
}
