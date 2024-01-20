import SkeletonTable from "@/components/SkeletonTable";
import { useNavigate } from "react-router-dom";
import { QfindHistoryTiket } from "@/service/ticket/ticket.service";
import { FormatDayjs } from "@/shared/dayjs/format";
import { Button, Empty } from "antd";
import dayjs from "dayjs";

const Riwayat = () => {
  const navigate = useNavigate();
  const tiketHistory = QfindHistoryTiket();
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-12 items-center">
          <h1 className="text-2xl font-bold">Tiket</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-12">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                List Tiket
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Lihat Semua Tiket Event disini
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
                {tiketHistory && tiketHistory?.data ? (
                  tiketHistory?.data?.length > 0 ? (
                    tiketHistory?.data?.map((element) => (
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
                        <td className="px-6 py-4">
                          {dayjs(element?.tanggal_preorder).format(FormatDayjs)}
                        </td>
                        <td className="px-6 py-4">
                          {dayjs(element?.tanggal_expired).format(FormatDayjs)}
                        </td>
                        <td className="flex gap-4 px-6 py-4 text-center">
                          <Button
                            type="primary"
                            className="bg-secondColors font-semibold"
                            onClick={() =>
                              navigate(
                                `/profile/eo/riwayat/tiket/${element.id}`,
                              )
                            }
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-4" colSpan={5}>
                        <Empty />
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <SkeletonTable totalId={true} />
                    </td>
                  </tr>
                )}
                {}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {ticket?.data && ticket?.data?.length > 0 && (
        <div className="flex w-full items-center justify-center ">
          <div className="p-5">
            <Pagination
              current={page}
              total={50}
              pageSize={10}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Riwayat;
