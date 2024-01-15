import { Dayjs } from "dayjs";
export interface IProfile {
  alamat: string;
  createdAt: Dayjs;
  email: string;
  eo: {
    instagram: string;
    nama_eo: string;
    kota: string;
  };
  name: string;
  nohp: string;
  status_eo: boolean;
}
