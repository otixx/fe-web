import { privateApi } from "@/shared/axios/axios";
import { Modal } from "antd";
import { useState } from "react";
import { LuWallet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { BarcodePopupProps } from "@/types/pay.types";

const BarcodePopup = ({
  barcode,
  onClose,
  device,
  payment,
  showPopup,
  idTransaction,
}: BarcodePopupProps) => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  console.log(barcode);
  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await privateApi.get(
        `/transaction/payment/${idTransaction}`,
      );
      if (response?.data?.status === 200) {
        setPaymentStatus("success");
      } else {
        alert("lanjut ke page transaction panding tiket");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Modal
      footer={false}
      width={768}
      title="Selesaikan Pembayaran"
      open={showPopup}
      onCancel={onClose}
    >
      {paymentStatus === "success" ? (
        <>
          <div className="flex flex-col items-center justify-center rounded-md p-4">
            <div className="text-mainColors">
              <LuWallet size={200} />
            </div>
            <h2 className="mb-4 text-2xl font-bold">Pembelian Berhasil</h2>

            <p className="mb-4 text-gray-600">
              Terima kasih! Pembelian tiket telah berhasil.
            </p>

            <button
              className="rounded-md bg-secondColors px-4 py-2 font-extrabold text-white hover:bg-mainColors"
              onClick={() => {
                navigate("/history");
              }}
            >
              Selesai
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 shadow-md">
            {device === "dekstop" && payment === "shopeepay" ? (
              <>
                <div className="p-4">
                  <h1 className="text-center text-mainColors">
                    Maaf, untuk melanjutkan, kami sarankan membuka aplikasi ini
                    melalui perangkat ponsel Anda. Metode pembayaran ShopeePay
                    hanya dapat diakses secara optimal melalui mobile. Terima
                    kasih atas pengertian dan kerjasamanya!
                  </h1>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={onClose}
                    className="rounded-md bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400"
                  >
                    Tutup
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={barcode} alt="Barcode" className="p-4" />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={onClose}
                    className="rounded-md bg-gray-300 px-4 py-2 font-semibold hover:bg-gray-400"
                  >
                    Tutup
                  </button>

                  <button
                    className="w-48 rounded-md bg-secondColors py-2 text-white hover:bg-mainColors"
                    onClick={handlePay}
                  >
                    {loading ? <LoadingOutlined /> : "Selesaikan Pembayaran"}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default BarcodePopup;
