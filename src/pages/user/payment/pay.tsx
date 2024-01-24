import { privateApi } from "@/shared/axios/axios";
import { Col, CountdownProps, Modal, Row, Statistic } from "antd";
import { useState } from "react";
import { LuClock, LuWallet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { BarcodePopupProps } from "@/utils/types/pay.types";

const BarcodePopup = ({
  barcode,
  onClose,
  device,
  payment,
  showPopup,
  idTransaction,
  expired,
}: BarcodePopupProps) => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("null");
  const [loading, setLoading] = useState(false);
  const { Countdown } = Statistic;

  const onFinish: CountdownProps["onFinish"] = () => {
    navigate("/");
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await privateApi.get(
        `/transaction/payment/${idTransaction}`,
      );
      if (response?.data?.data?.status_payment === "settlement") {
        setPaymentStatus("success");
      } else if (response?.data?.data?.status_payment === "pending") {
        setPaymentStatus("pending");
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
            {location.pathname !== "/history" && (
              <button
                className="rounded-md bg-secondColors px-4 py-2 font-extrabold text-white hover:bg-mainColors"
                onClick={() => {
                  setPaymentStatus("null");
                  navigate("/history");
                }}
              >
                Selesai
              </button>
            )}
            {location.pathname === "/history" && (
              <button
                className="rounded-md bg-secondColors px-4 py-2 font-extrabold text-white hover:bg-mainColors"
                onClick={() => {
                  setPaymentStatus("null");
                  onClose();
                }}
              >
                Selesai
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {paymentStatus === "pending" ? (
            <>
              <div className="flex flex-col items-center justify-center rounded-md p-4">
                <div className="text-mainColors">
                  <LuClock size={200} />
                </div>
                <h2 className="mb-4 text-2xl font-bold">Pending</h2>

                <p className="mb-4 text-gray-600">Lanjutkan Pembayaran</p>
                {location.pathname !== "/history" && (
                  <button
                    className="rounded-md bg-secondColors px-4 py-2 font-extrabold text-white hover:bg-mainColors"
                    onClick={() => {
                      navigate("/history");
                    }}
                  >
                    Tutup
                  </button>
                )}
                {location.pathname === "/history" && (
                  <button
                    className="rounded-md bg-secondColors px-4 py-2 font-extrabold text-white hover:bg-mainColors"
                    onClick={() => {
                      setPaymentStatus("null");
                      onClose();
                    }}
                  >
                    Tutup
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 shadow-md">
                {device === "dekstop" && payment === "shopeepay" ? (
                  <>
                    <div className="p-4">
                      <h1 className="text-center text-mainColors">
                        Maaf, untuk melanjutkan, kami sarankan membuka aplikasi
                        ini melalui perangkat ponsel Anda. Metode pembayaran
                        ShopeePay hanya dapat diakses secara optimal melalui
                        mobile. Terima kasih atas pengertian dan kerjasamanya!
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
                    <img
                      src={barcode}
                      alt="Barcode"
                      className="h-2/4 w-2/4 p-4"
                    />
                    <div className="py-2 text-center">
                      <h1>Mohon Bayar Sebelum Waktu Habis</h1>
                      <Row justify="center">
                        <Col span={12}>
                          <Countdown
                            title="Countdown"
                            value={new Date(expired).getTime()}
                            onFinish={onFinish}
                          />
                        </Col>
                      </Row>
                    </div>
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
                        {loading ? (
                          <LoadingOutlined />
                        ) : (
                          "Selesaikan Pembayaran"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default BarcodePopup;
