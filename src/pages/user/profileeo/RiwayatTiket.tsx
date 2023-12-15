import Sidebar from "../../../components/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RiwayatTiket = () => {
  interface Transaksi {
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
    isDeleted: false;
    profile: {
      id: string;
      name: string;
      alamat: string;
      email: string;
      nohp: string;
      status_eo: boolean;
      user_id: string;
      createdAt: string;
      updatedAt: string;
    };
  }
  const idTiket = useParams().id;
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transaction/tiket/${idTiket}`,
        );
        setTransaksi(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">History / Transaction</h1>
          {/* <div className="btnSignin cursor-pointer rounded-full bg-secondColors px-8 py-3 hover:border-secondColors hover:bg-mainColors">
            <button className="text-[14px] font-semibold text-white">
              Tambah Tiket
            </button>
          </div> */}
        </div>
        <div className="py-4">
          <div className=" bg-red-200 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Pembeli
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kota
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Pembayaran
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((element, index) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {element?.profile.name}
                    </th>
                    <td className="px-6 py-4">{element?.profile.alamat}</td>
                    <td className="px-6 py-4">{element?.total_harga}</td>
                    <td className="px-6 py-4">{element?.quantity}</td>
                    <td className="px-6 py-4">{element?.status_payment}</td>
                    <td className="px-6 py-4">{element?.status}</td>
                    <td className="flex gap-4 px-6 py-4 text-center">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatTiket;
