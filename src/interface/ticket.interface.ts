import { Dayjs } from "dayjs";

export interface ITicketData {
  status: number;
  message: string;
  data: Ticket[];
}
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

export interface IFindTicketProps {
  id?: string;
}

export interface ITicketDetail {
  event: {
    description: string;
    lokasi: string;
    tanggal_acara: Dayjs;
  };
  quantity: number;
  harga: number;
  id: number;
  image_url: string;
  nama_kegiatan: string;
  tags: string;
}
