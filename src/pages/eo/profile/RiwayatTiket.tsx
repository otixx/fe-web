import { useParams } from "react-router-dom";
import {
  QHistoryTicketId,
  QTotalPendapatan,
} from "@/service/ticket/ticket.service";
import { Col, Modal, Pagination, Row, Statistic } from "antd";
import {
  IHistoryTicketDetailForm,
  IHistoryTransactionData,
} from "@/utils/interface/history.interface";
import { useState } from "react";

const RiwayatTiket = () => {
  const idTiket = useParams();
  const detailTicket = QHistoryTicketId(idTiket?.id);
  const pendapatan = QTotalPendapatan(idTiket?.id);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({} as IHistoryTicketDetailForm);
  const handleDetail = (e: IHistoryTicketDetailForm) => {
    setOpen(true);
    setData(e);
  };
  return (
    <div className="w-full">
      <div className="grid h-28 grid-cols-12 items-center px-2">
        <div className="col-span-12 items-center">
          <h1 className="text-2xl font-bold">History / Transaction</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-12">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            {pendapatan.isFetched && (
              <Row style={{ paddingLeft: 20 }}>
                <Col span={6}>
                  <Statistic
                    title="Total Pendapatan"
                    value={"Rp. " + pendapatan?.data}
                  />
                </Col>
              </Row>
            )}
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
                </tr>
              </thead>
              <tbody>
                {detailTicket?.data?.data.map(
                  (element: IHistoryTransactionData, index: any) => {
                    const tags: IHistoryTicketDetailForm = JSON.parse(
                      element?.detail_form,
                    );
                    return (
                      <tr
                        className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={index}
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{element?.profile?.name}</td>
                        <td className="px-6 py-4">
                          {element?.profile?.alamat}
                        </td>
                        <td className="px-6 py-4">{element?.total_harga}</td>
                        <td className="px-6 py-4">{element?.quantity}</td>
                        <td className="px-6 py-4">{element?.tiket.tags}</td>
                        <td className="px-6 py-4">{element?.status_payment}</td>
                        <td className="px-6 py-4">{element?.status}</td>
                        <td className="px-6 py-4">
                          {tags?.tags === "visitor" ? (
                            tags?.tags
                          ) : (
                            <button
                              onClick={() => handleDetail(tags)}
                              className="h-10 w-14 rounded-md bg-secondColors font-semibold text-white shadow-sm hover:bg-mainColors "
                            >
                              Detail
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {detailTicket?.data && detailTicket?.data?.data.length > 0 && (
        <div className="flex w-full items-center justify-center ">
          <div className="p-5">
            <Pagination
              current={page}
              total={detailTicket?.data?.jumlah}
              pageSize={10}
              onChange={(page) => setPage(page)}
            />
          </div>
        </div>
      )}

      <Modal
        open={open}
        footer={false}
        onCancel={() => setOpen(false)}
        closeIcon={false}
      >
        <div className="p-4">
          <div className="mb-4">
            <strong>Asal Kota:</strong> {data?.asal_kota}
          </div>
          <div className="mb-4">
            <strong>Instagram:</strong> {data?.instagram}
          </div>
          <div className="mb-4">
            <strong>Judul Lagu:</strong> {data?.judul_lagu}
          </div>
          <div className="mb-4">
            <strong>Nama:</strong> {data?.nama}
          </div>
          <div className="mb-4">
            <strong>No HP:</strong> {data?.nohp}
          </div>
          <div className="mb-4">
            {data?.music ? (
              <>
                <strong>Music URL:</strong>{" "}
                <button
                  className="rounded-lg bg-secondColors px-4 py-2 font-semibold text-white hover:bg-mainColors"
                  onClick={() => window.open(data?.music?.url, "_blank")}
                >
                  Download Music
                </button>
              </>
            ) : (
              <div className="mb-4">
                <strong>Cosplay Name:</strong>
                {data?.cosplay_name}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RiwayatTiket;
