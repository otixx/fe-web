import { Status } from "@/utils/enum/status.enum";
import { IDetailFormHistory } from "@/utils/interface/history.interface";
import { useHistory } from "@/service/transaction/history.service";
import { FormatDayjs } from "@/shared/dayjs/format";
import { Empty, Modal, Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodePopup from "../payment/pay";
import { useDevice } from "@/service/device/device.service";
import { EPayment } from "@/utils/enum/payment.enum";
import { privateApi } from "@/shared/axios/axios";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const History = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");
  const [idTransaction, setIdTransaction] = useState("");
  const [barcode, setBarcode] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const transactions = useHistory((state) => state?.history);
  const getHistory = useHistory((state) => state?.getHistory);
  const device = useDevice((state) => state?.device);

  const handleSubmit = (data: IDetailFormHistory) => {
    setPayment(data?.payment_type);
    if (device === "mobile" && data?.payment_type === EPayment.shopee) {
      setIdTransaction(data?.transaction_id);
      window.open(`${data?.actions[0].url}`, "_blank");
    } else if (device === "mobile" && data?.payment_type === EPayment.gopay) {
      setIdTransaction(data?.transaction_id);
      window.open(`${data?.actions[1].url}`, "_blank");
    } else {
      setIdTransaction(data?.transaction_id);
      setBarcode(data?.actions[0].url);
      setOpen(true);
    }
  };

  const handleDelete = async () => {
    const data = JSON.parse(id);
    setLoading(true);
    try {
      const res = await privateApi.post(`/transaction/cancel`, {
        order_id: data?.transaction_id,
      });
      setLoading(false);
      setOpenDelete(false);
      toast.success(res?.data?.message);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div
      className={`container mx-auto ${
        transactions && transactions.length === 0 && "h-[80vh]"
      } p-8`}
    >
      <h1 className="mb-2 text-3xl font-bold">Transaction History</h1>
      {transactions ? (
        transactions?.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <Empty />
          </div>
        ) : (
          <div className="min-h-screen">
            <ul className="space-y-4">
              {transactions?.map((transaction, index) => {
                const formDetail: IDetailFormHistory = JSON.parse(
                  transaction?.response_payment,
                );
                const tanggalAcara = dayjs(
                  transaction?.tiket?.event?.tanggal_acara,
                );
                const hariIni = dayjs();

                const belumMulai = tanggalAcara.isAfter(hariIni, "day");
                const dahAbis = tanggalAcara.isBefore(hariIni, "day");
                return (
                  <li
                    key={index}
                    className="mb-4 rounded-md bg-white p-6 shadow-md"
                  >
                    <h2 className="mb-2 text-xl font-bold text-gray-800">
                      {transaction?.tiket?.nama_kegiatan}
                    </h2>
                    <p className="mb-2 text-gray-600">
                      Total Harga:{" "}
                      <span className="font-semibold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(Number(transaction?.total_harga))}
                      </span>
                    </p>
                    <div className="mb-2 flex flex-col lg:justify-between">
                      <p className="text-gray-600">
                        Tanggal Transaksi:{" "}
                        <span className="font-semibold">
                          {dayjs(transaction?.tiket?.event?.createdAt).format(
                            FormatDayjs,
                          )}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Tanggal Mulai:{" "}
                        <span className="font-semibold">
                          {dayjs(
                            transaction?.tiket?.event?.tanggal_acara,
                          ).format(FormatDayjs)}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-end">
                      {transaction?.status_payment === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setOpenDelete(true),
                                setId(transaction?.response_payment);
                            }}
                            className={` rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-red-900`}
                          >
                            Batalkan Pesanan
                          </button>
                          <button
                            className={` rounded-md bg-secondColors px-4 py-2 font-semibold text-white transition duration-300 hover:bg-mainColors`}
                            onClick={() => handleSubmit(formDetail)}
                          >
                            Selesaikan Pembayaran
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`rounded-md px-4 py-2 font-semibold text-white  ${
                            transaction.status === Status?.checkin
                              ? "cursor-not-allowed bg-gray-400"
                              : belumMulai
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-mainColors hover:bg-hoverMainColors"
                          }`}
                          disabled={
                            transaction.status === Status?.checkin
                              ? true
                              : belumMulai || dahAbis
                                ? true
                                : false
                          }
                          onClick={() =>
                            navigate(`/history/${transaction?.id}`)
                          }
                        >
                          {transaction.status === Status?.checkin
                            ? "Sudah Checkin"
                            : belumMulai
                              ? "Event belum mulai"
                              : "Event sudah berakhir"}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )
      ) : (
        <Skeleton avatar active paragraph={{ rows: 3 }} />
      )}

      <BarcodePopup
        device={device}
        payment={payment}
        barcode={barcode}
        onClose={() => setOpen(false)}
        showPopup={open}
        idTransaction={idTransaction}
      />
      {openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          footer={false}
        >
          <div className="flex flex-col justify-center space-y-5">
            <div className="text-center">
              <h1 className="text-lg font-semibold">Batalkan Pesanan ?</h1>
            </div>
            <div className="text-center text-sm">
              Harap diperhatikan bahwa pembatalan pesanan mungkin berdampak pada
              status pembayaran dan ketersediaan produk. Pastikan untuk
              memeriksa kebijakan pembatalan dan konfirmasi kembali sebelum
              melanjutkan.
            </div>
            <div className="flex justify-center gap-2 py-2 md:justify-end lg:justify-end xl:justify-end">
              <button
                onClick={() => {
                  setOpenDelete(false);
                }}
                className=" rounded-full border border-mainColors px-10 py-2 text-center text-sm font-semibold text-black transition duration-500 hover:border-mainColors hover:bg-mainColors hover:text-white focus:outline-none focus:ring-4"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleDelete}
                className="flex w-32 items-center justify-center rounded-full bg-red-600 py-2 text-center text-sm font-semibold text-white transition duration-500 hover:bg-red-900 focus:outline-none focus:ring-4"
              >
                {loading ? <LoadingOutlined /> : "Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default History;
