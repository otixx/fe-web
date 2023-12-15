import { QfindTicket } from "@/service/ticket/ticket.service";
import { useNavigate } from "react-router-dom";

const Riwayat = () => {
  const { data: ticket } = QfindTicket();
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-12 items-center">
          <h1 className="text-2xl font-bold">Tiket</h1>
        </div>
      </div>
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-12 p-2">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-2 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Data anda disini
                </p>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tgl Preorder
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tgl Exp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ticket?.map((element: any) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={element.id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {element?.nama_kegiatan}
                    </th>
                    <td className="px-6 py-4">{element?.harga}</td>
                    <td className="px-6 py-4">{element?.tags}</td>
                    <td className="px-6 py-4">{element?.tanggal_preorder}</td>
                    <td className="px-6 py-4">{element?.tanggal_expired}</td>
                    <td className="flex gap-4 px-6 py-4 text-center">
                      <a
                        onClick={() =>
                          navigate(`/profile/eo/riwayat/tiket/${element.id}`)
                        }
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        View
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

export default Riwayat;
