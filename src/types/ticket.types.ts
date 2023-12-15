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
