// pages/history.js

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const History = () => {
  interface dataTransaction {
    id: string;
    quantity: number;
    total_harga: string;
    barcode: string;
    status_payment: string;
    detail_form: string;
    status: string;
    response_payment: string;
    profile_id: string;
    tiket_id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  }
  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);
  const [transactions, setTransactions] = useState<dataTransaction[]>([]);

  useEffect(() => {
    // Fetch transaction history data from your API or data source
    const fetchTransactionHistory = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint
        const response = await axios(
          `${import.meta.env.VITE_BE_URL}/transaction/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, []);

  console.log(transactions);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2">
                {transaction.status_payment}
              </h2>
              <p className="text-gray-600">{transaction.total_harga}</p>
              {/* Add more details based on your transaction data */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
