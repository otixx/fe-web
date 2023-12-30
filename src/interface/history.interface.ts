import { Dayjs } from "dayjs";

export interface IDataTransaction extends IHistoryTicketDetail {
  data: IHistoryTicketDetail[];
}

export interface IHistoryTicketDetail {
  id: string;
  barcode: string;
  createdAt: Dayjs;
  isDeleted: boolean;
  quantity: 1;
  detail_form: string;
  response_payment: string;
  status: string;
  tiket: {
    id: string;
    nama_kegiatan: string;
    image_url: string;
    harga: string;
    tanggal_preorder: string;
    tags: string;
    tanggal_expired: string;
    event_id: string;
    createdAt: string;
    event: {
      id: string;
      nama_acara: string;
      description: string;
      img_rundown: string;
      tanggal_acara: string;
      lokasi: string;
      eo_id: string;
      createdAt: string;
    };
  };
  status_payment: string;
  total_harga: string;
  updatedAt: Dayjs;
}
export interface IHistoryTicket {
  id: string;
  quantity: number;
  total_harga: string;
  barcode: string;
  status_payment: string;
  detail_form: string;
  status: string;
  response_payment: string;
  profile_id: string;
  tiket_id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: false;
  profile: {
    id: string;
    name: string;
    alamat: string;
    email: string;
    nohp: string;
    status_eo: boolean;
    user_id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IAction {
  method: string;
  name: string;
  url: string;
}
export interface IDetailFormHistory extends IAction {
  acquirer: string;
  actions: IAction[];
  currency: string;
  expiry_time: Dayjs;
  fraud_status: string;
  gross_amount: string;
  merchant_id: string;
  order_id: string;
  payment_type: string;
  qr_string: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: Dayjs;
}
