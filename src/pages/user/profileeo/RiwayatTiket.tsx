import Sidebar from "../../../components/Sidebar";
import dataEvent from "../../../api/dummy.json";

const RiwayatTiket = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Event / Tiket</h1>
          <div className="btnSignin cursor-pointer rounded-full bg-secondColors px-8 py-3 hover:border-secondColors hover:bg-mainColors">
            <button className="text-[14px] font-semibold text-white">
              Tambah Tiket
            </button>
          </div>
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
                    Nama Tiket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Pembeli
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataEvent.map((element, index) => (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {element?.name}
                    </th>
                    <td className="px-6 py-4">{element?.nama_pembeli}</td>
                    <td className="px-6 py-4">{element?.harga}</td>
                    <td className="px-6 py-4">{element?.qty}</td>
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
