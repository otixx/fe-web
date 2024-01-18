import { useParams } from "react-router-dom";
// import { IHistoryTicket } from "@/interface/history.interface";
import { QHistoryTicketId } from "@/service/ticket/ticket.service";

const RiwayatTiket = () => {
  const idTiket = useParams();
  const detailTicket = QHistoryTicketId(idTiket?.id);

  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">History / Transaction</h1>
      </div>
      <div className="grid grid-cols-12 px-2 py-2">
        <div className="col-span-12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Historu Pembelian Tiket Event disini
                </p>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
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
                    Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Pembayaran
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Checkin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Detail Form
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {detailTicket?.data?.map((element: any, index: any) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{element?.profile.name}</td>
                    <td className="px-6 py-4">{element?.profile.alamat}</td>
                    <td className="px-6 py-4">{element?.total_harga}</td>
                    <td className="px-6 py-4">{element?.quantity}</td>
                    <td className="px-6 py-4">{element?.tiket.tags}</td>
                    <td className="px-6 py-4">{element?.status_payment}</td>
                    <td className="px-6 py-4">{element?.status}</td>
                    <td className="px-6 py-4">{element?.detail_form}</td>
                    {/* <td className="flex gap-4 px-6 py-4 text-center">
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
                    </td> */}
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
