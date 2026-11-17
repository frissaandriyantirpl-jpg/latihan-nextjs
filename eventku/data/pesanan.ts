export type Pesanan={id?:number;event_id:number;nama:string;email:string;jumlah:number;total:number;created_at?:string};
export function totalHarga(harga:number,jumlah:number){ return harga*jumlah; }
