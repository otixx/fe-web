export interface dataTransaction {
    id: string;
    quantity: number;
    total_harga: string;
    barcode: string;
    status_payment: string;
    detail_form: string;
    status: string;
    response_payment: string;
    profile_id: string;
    createdAt: string;
    isDeleted: boolean;
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
}
