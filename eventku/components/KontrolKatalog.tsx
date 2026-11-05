
type Props = {
  cari: string;
  setCari: (value: string) => void;

  kategori: string;
  setKategori: (value: string) => void;
  daftarKategori: string[];

  urut: string;
  setUrut: (value: string) => void;

  hanyaTersedia: boolean;
  setHanyaTersedia: (value: boolean) => void;

  hargaMaksimal: string;
  setHargaMaksimal: (value: string) => void;

  resetTampilan: () => void;
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  daftarKategori,
  urut,
  setUrut,
  hanyaTersedia,
  setHanyaTersedia,
  hargaMaksimal,
  setHargaMaksimal,
  resetTampilan,
}: Props) {
  return (
    <div>
      {/* Pencarian, kategori, dan pengurutan */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => {
            setCari(e.target.value);
            resetTampilan();
          }}
          placeholder="Cari event..."
          className="rounded border bg-white p-3"
        />

        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            resetTampilan();
          }}
          className="rounded border bg-white p-3"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urut}
          onChange={(e) => {
            setUrut(e.target.value);
            resetTampilan();
          }}
          className="rounded border bg-white p-3"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      {/* Penyaring lanjutan */}
      <div className="mb-5 flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => {
              setHanyaTersedia(e.target.checked);
              resetTampilan();
            }}
            className="h-4 w-4"
          />
          Hanya yang masih ada tiket
        </label>

        <div className="flex items-center gap-2">
          <label
            htmlFor="hargaMaksimal"
            className="text-sm font-medium"
          >
            Harga maksimal:
          </label>

          <input
            id="hargaMaksimal"
            type="number"
            min="0"
            value={hargaMaksimal}
            onChange={(e) => {
              setHargaMaksimal(e.target.value);
              resetTampilan();
            }}
            placeholder="Tanpa batas"
            className="w-32 rounded border p-2"
          />
        </div>
      </div>
    </div>
  );
}
