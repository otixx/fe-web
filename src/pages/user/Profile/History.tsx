import { Status } from "@/enum/status.enum";
import { IDetailFormHistory } from "@/interface/history.interface";
import { useHistory } from "@/service/transaction/history.service";
import { FormatDayjs } from "@/shared/dayjs/format";
import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodePopup from "../payment/pay";
import { useDevice } from "@/service/device/device.service";
import { EPayment } from "@/enum/payment.enum";

const History = () => {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Transaction History</h1>
      {transactions ? (
        transactions?.length === 0 ? (
          <p>Anda Belum Melakukan Transaksi.</p>
        ) : (
          <div className="min-h-screen">
            <ul className="space-y-4">
              {transactions?.map((transaction, index) => {
                const formDetail: IDetailFormHistory = JSON.parse(
                  transaction?.response_payment,
                );
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
                          {dayjs(
                            transaction?.tiket?.event?.tanggal_acara,
                          ).format(FormatDayjs)}
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
                        <button
                          className={`rounded-md bg-secondColors px-4 py-2 font-semibold text-white transition duration-300 hover:bg-mainColors`}
                          onClick={() => handleSubmit(formDetail)}
                        >
                          Selesaikan Pembayaran
                        </button>
                      ) : (
                        <button
                          className={`rounded-md px-4 py-2 font-semibold text-white  ${
                            transaction.status === Status?.checkin
                              ? "cursor-not-allowed bg-gray-400"
                              : "bg-secondColors hover:bg-mainColors"
                          }`}
                          disabled={transaction.status === Status?.checkin}
                          onClick={() =>
                            navigate(`/history/${transaction?.id}`)
                          }
                        >
                          Detail
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
    </div>
  );
};

export default History;
