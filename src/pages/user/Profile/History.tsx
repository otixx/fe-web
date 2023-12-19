import { Status } from "@/enum/status.enum";
import { useHistory } from "@/service/transaction/history.service";
import { FormatDayjs } from "@/shared/dayjs/format";
import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const transactions = useHistory((state) => state?.history);
  const getHistory = useHistory((state) => state?.getHistory);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Transaction History</h1>
      {transactions ? (
        transactions.length === 0 ? (
          <p>Anda Belum Melakukan Transaksi.</p>
        ) : (
          <div className="min-h-screen">
            <ul className="space-y-4">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="mb-4 rounded-md bg-white p-6 shadow-md"
                >
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                    {transaction.tiket.nama_kegiatan}
                  </h2>
                  <p className="mb-2 text-gray-600">
                    Total Harga: {transaction.total_harga}
                  </p>
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-600">
                      Tanggal Transaksi:{" "}
                      {dayjs(transaction?.tiket?.event?.tanggal_acara).format(
                        FormatDayjs,
                      )}
                    </p>
                    <p className="text-gray-600">
                      Tanggal Mulai:{" "}
                      {dayjs(transaction?.tiket?.event?.tanggal_acara).format(
                        FormatDayjs,
                      )}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className={`rounded-md px-4 py-2 text-white  ${
                        transaction.status === Status?.checkin
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={transaction.status === Status?.checkin}
                      onClick={() => {
                        navigate("/detailhistory");
                      }}
                    >
                      Detail
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <Skeleton avatar active paragraph={{ rows: 3 }} />
      )}
    </div>
  );
};

export default History;
