export interface IEvent {
  jumlah: number;
  data: IDataEvent[];
}

export interface IDataEvent {
  id: string;
  description: string;
  img_rundown: string;
  lokasi: string;
  nama_acara: string;
  tanggal_acara: string;
}

export interface ICreateEventsProps {
  nama_acara: string;
  description: string;
  lokasi: string;
  file?: any;
  tanggal_acara: any;
  waktu_event: any;
}
