export interface Ticket {
  nama_kegiatan: string;
  date: string;
  harga: string;
  location: string;
  image_url: string;
  event: {
    tanggal_acara: string;
    lokasi: string;
  };
  id: string;
  tanggal_preorder: Date;
  tanggal_expired: Date;
  tags: string;
}
