export type BarcodePopupProps = {
  barcode: string;
  onClose: () => void;
  showPopup: boolean;
  device: string;
  expired: any;
  payment: string;
  idTransaction: string | undefined;
};
