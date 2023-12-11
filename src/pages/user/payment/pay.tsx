import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components/BarcodePopup.js
interface BarcodePopupProps {
  barcodeData: string; // Make barcodeData optional
  onClose: () => void;
  idTransaction: string | undefined;
}

const BarcodePopup: React.FC<BarcodePopupProps> = ({
  barcodeData,
  onClose,
  idTransaction,
}) => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">(
    "pending",
  );

  const handlePay = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transaction/${idTransaction}`,
      );
      if (response.data.status_payment === "settlement") {
        setPaymentStatus("success");
      } else {
        alert("lanjut ke page transaction panding tiket");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup">
        {paymentStatus === "success" ? (
          <>
            <div className="rounded-md  p-8 text-center shadow-md">
              <img
                src="https://logowik.com/content/uploads/images/wallet8302.logowik.com.webp"
                alt="Success Logo"
                className="mx-auto mb-4"
              />

              <h2 className="mb-4 text-2xl font-bold">Pembelian Berhasil</h2>

              <p className="mb-4 text-gray-600">
                Terima kasih! Pembelian tiket telah berhasil.
              </p>

              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  console.log("direct ke halaman tiket yang sudah di beli");
                  onClose();
                  navigate("/history");
                }}
              >
                Selesai
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-md bg-gray-100 p-4 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Barcode</h2>

              {/* Tampilkan barcode di sini */}
              <img src={barcodeData} alt="Barcode" className="mb-4" />

              <div className="flex justify-end space-x-4">
                <button
                  className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={onClose}
                >
                  Tutup
                </button>

                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={handlePay}
                >
                  Selesaikan Pembayaran
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BarcodePopup;
