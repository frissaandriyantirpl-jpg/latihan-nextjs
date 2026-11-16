
export default function MemuatKatalog() {
  return (
    <div className="min-h-screen bg-[#fffdf8]">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-slate-200" />

        <div className="mb-3 h-10 w-72 animate-pulse rounded bg-slate-200" />

        <div className="mb-8 h-5 w-full max-w-xl animate-pulse rounded bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
