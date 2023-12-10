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
    "pending"
  );

  const handlePay = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/transaction/${idTransaction}`
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
            <div className="p-8  rounded-md shadow-md text-center">
              <img
                src="https://logowik.com/content/uploads/images/wallet8302.logowik.com.webp"
                alt="Success Logo"
                className="mx-auto mb-4"
              />

              <h2 className="text-2xl font-bold mb-4">Pembelian Berhasil</h2>

              <p className="text-gray-600 mb-4">
                Terima kasih! Pembelian tiket telah berhasil.
              </p>

              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => {
                  console.log("direct ke halaman tiket yang sudah di beli");
                  onClose();
                  navigate("/profile/eo");
                }}
              >
                Selesai
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4">Barcode</h2>

              {/* Tampilkan barcode di sini */}
              <img src={barcodeData} alt="Barcode" className="mb-4" />

              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                  onClick={onClose}
                >
                  Tutup
                </button>

                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
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
