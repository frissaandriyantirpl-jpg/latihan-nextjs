import type { Event } from "@/data/events";
export function saringEvents(list:Event[], q:string, kategori:string){
 const query=q.trim().toLowerCase();
 return list.filter(e=>{
  const okQ=!query||(e.nama+" "+e.lokasi+" "+e.deskripsi).toLowerCase().includes(query);
  const okK=!kategori||kategori==="Semua"||e.kategori===kategori;
  return okQ&&okK;
 });
}
export const daftarKategori=["Semua","Workshop","Musik","Olahraga","Bazar","Lomba"];
