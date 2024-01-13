import { Dayjs } from "dayjs";

export interface ITicketData {
  status: number;
  message: string;
  data: Ticket[];
}
export interface Ticket {
  data: [
    {
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
    },
  ];
  jumlah: number;
}

export interface IFindTicketProps {
  id?: string;
}

export interface ITicketDetail {
  event: {
    description: string;
    lokasi: string;
    tanggal_acara: Dayjs;
    img_rundown?: string;
  };
  quantity: number;
  harga: number;
  id: number;
  image_url: string;
  nama_kegiatan: string;
  tanggal_expired: string;
  tanggal_preorder: string;
  tags: string;
}

export interface IDataImgUrl {
  url: string;
  idPublic: string;
}

export interface IDataEventImg {
  url: string;
}
