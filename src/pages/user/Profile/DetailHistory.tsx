import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "dayjs";
import { FormatDayjsInput } from "@/shared/dayjs/format";
import { Tag } from "antd";
import { QfindHistoryDetail } from "@/service/transaction/history.service";

const Detailhistory = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const history = QfindHistoryDetail({ id });

  return (
    <div className="container mx-auto h-screen p-8">
      {history.isFetched && history.data ? (
        <div className="w-full rounded-md bg-white p-6 shadow-md">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-8 lg:col-span-8">
              <h1 className="mb-4 text-2xl font-bold">
                {history?.data?.tiket?.nama_kegiatan}{" "}
              </h1>
              <div className="space-y-2">
                <p>
                  Event :{" "}
                  <span className="font-semibold text-mainColors">
                    {history?.data?.tiket?.event?.nama_acara}
                  </span>
                </p>
                <p className="mb-2 text-mainColors">
                  Total Harga:{" "}
                  <span className="font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(history?.data?.total_harga))}
                  </span>
                </p>
                <p className="mb-4 text-mainColors">
                  Tanggal Transaksi:{" "}
                  {dayjs(history?.data?.createdAt).format(FormatDayjsInput)}
                </p>
                <p className="mb-4 text-mainColors">
                  Tanggal Mulai:{" "}
                  {dayjs(history?.data?.tiket?.event?.tanggal_acara).format(
                    FormatDayjsInput,
                  )}
                </p>
                <p className="mb-4 text-mainColors">
                  Status : {""}
                  <Tag color="blue">{history?.data?.status}</Tag>
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-4">
              {dayjs(history?.data?.createdAt).format(FormatDayjsInput) <
              dayjs().format(FormatDayjsInput) ? (
                <QRCodeSVG
                  height={300}
                  width={300}
                  value={history?.data?.barcode}
                />
              ) : (
                <div>
                  <p className="text-red-500">
                    Barcode will be available when the event starts.
                  </p>
                </div>
              )}
              <div className="py-5">
                <button
                  className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                  onClick={() => navigate("/history")}
                >
                  Back to History
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Detailhistory;
