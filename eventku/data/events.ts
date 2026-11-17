export type Event = {
  judul: string;
  id: number;
  nama: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  harga: number;
  kuota: number;
  gambar: string;
};

export const events: Event[] = [
  { id: 1, judul: "Workshop React Dasar", nama: "Workshop React Dasar", kategori: "Workshop", tanggal: "2026-11-20", lokasi: "Lab Komputer 1", deskripsi: "Belajar React dari nol sampai bisa bikin aplikasi web interaktif.", harga: 0, kuota: 50, gambar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80" },
  { id: 2, judul: "Konser Musik Sekolah", nama: "Konser Musik Sekolah", kategori: "Musik", tanggal: "2026-11-25", lokasi: "Aula Sekolah", deskripsi: "Pentas musik terbesar tahun ini, tampil dari band sekolah dan guest star.", harga: 25000, kuota: 200, gambar: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80" },
  { id: 3, judul: "Turnamen Futsal Antar Kelas", nama: "Turnamen Futsal Antar Kelas", kategori: "Olahraga", tanggal: "2026-11-28", lokasi: "Lapangan Sekolah", deskripsi: "Adu skill futsal antar kelas, rebutan piala bergilir dan hadiah jutaan.", harga: 10000, kuota: 120, gambar: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" },
  { id: 4, judul: "Bazar Kewirausahaan", nama: "Bazar Kewirausahaan", kategori: "Bazar", tanggal: "2026-12-02", lokasi: "Halaman Sekolah", deskripsi: "Jajan enak, belanja murah, dukung usaha teman-temanmu di bazar ini.", harga: 0, kuota: 300, gambar: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { id: 5, judul: "Lomba Cerdas Cermat", nama: "Lomba Cerdas Cermat", kategori: "Lomba", tanggal: "2026-12-05", lokasi: "Ruang Kelas XII", deskripsi: "Uji otak dan kecepatan, tim terbaik melaju ke tingkat kota.", harga: 5000, kuota: 60, gambar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" },
  { id: 6, judul: "Workshop Desain UI/UX", nama: "Workshop Desain UI/UX", kategori: "Workshop", tanggal: "2026-12-08", lokasi: "Lab Komputer 2", deskripsi: "Belajar bikin desain aplikasi yang cantik dan gampang dipakai.", harga: 15000, kuota: 40, gambar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
];

export function rupiah(n: number) { return n === 0 ? "GRATIS" : "Rp " + n.toLocaleString("id-ID"); }
