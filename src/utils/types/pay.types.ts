export type BarcodePopupProps = {
  barcode: string;
  onClose: () => void;
  showPopup: boolean;
  device: string;
  payment: string;
  idTransaction: string | undefined;
};
