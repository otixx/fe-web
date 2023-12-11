import { useEffect, useState } from "react";
import { dataTransaction } from "@/interface/profile/history.interface";
import { privateApi } from "@/shared/axios/axios";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<dataTransaction[]>([]);

  const fetchTransactionHistory = async () => {
    try {
      const response = await privateApi.get(`/transaction/user`);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  console.log(transactions);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Transaction History</h1>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
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
                  {`${new Date(transaction.createdAt).getDate()} ${new Date(
                    transaction.createdAt,
                  ).toLocaleString("default", { month: "long" })} ${new Date(
                    transaction.createdAt,
                  ).getFullYear()}`}
                </p>
                <p className="text-gray-600">
                  Tanggal Mulai:{" "}
                  {`${new Date(
                    transaction.tiket.event.tanggal_acara,
                  ).getDate()} ${new Date(
                    transaction.tiket.event.tanggal_acara,
                  ).toLocaleString("default", { month: "long" })} ${new Date(
                    transaction.tiket.event.tanggal_acara,
                  ).getFullYear()}`}
                </p>
              </div>
              <button
                className={`rounded-md px-4 py-2 text-white  ${
                  transaction.status === "Checkin"
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={transaction.status === "Checkin"}
                onClick={() => {
                  navigate("/detailhistory");
                }}
              >
                Detail
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
