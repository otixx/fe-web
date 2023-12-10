import { useEffect, useState } from "react";
import { dataTransaction } from "@/interface/profile/history.interface";
import { privateApi } from "@/shared/axios/axios";

const History = () => {
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

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Transaction History</h1>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="rounded-md bg-gray-100 p-4">
              <h2 className="mb-2 text-xl font-bold">
                {transaction.status_payment}
              </h2>
              <p className="text-gray-600">{transaction.total_harga}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
