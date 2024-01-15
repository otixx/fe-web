import { Dayjs } from "dayjs";

export type TTicketProps = {
  id?: number;
};

export type TicketProps = {
  file?: any;
  harga: any | Blob;
  nama_tiket: string;
  tags: string;
  tanggal_exp: Dayjs;
  tanggal_pre: Dayjs;
};

export type TDetailTicketProps = {
  nama_kegiatan: string;
  quantity: string;
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
};
