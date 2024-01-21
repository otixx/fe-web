import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FormatDayjsInput, FormatHistory } from "@/shared/dayjs/format";
import { QRCode, Tag } from "antd";
import { QfindHistoryDetail } from "@/service/transaction/history.service";
import { IHistoryTransactionData } from "@/utils/interface/history.interface";

const Detailhistory = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const history = QfindHistoryDetail({ id });
  const dataHistory: IHistoryTransactionData | undefined = history?.data as
    | IHistoryTransactionData
    | undefined;
  const hariIni = dayjs().format(FormatHistory);
  const eventStart = dataHistory?.tiket?.event?.tanggal_acara;
  const eventTime = dataHistory?.tiket?.event?.waktu_acara;
  const eventStartTime = dayjs(`${eventStart} ${eventTime}`);
  const twoHoursBeforeEvent = eventStartTime.subtract(2, "hour");
  const lastCheckinTime = dayjs(`${eventStart} 23:59:59`);
  const tanggalAcara = dayjs(dataHistory?.tiket?.event?.tanggal_acara);
  const belumMulai =
    tanggalAcara.isAfter(hariIni, "day") ||
    dayjs().isBefore(twoHoursBeforeEvent);
  const sudahBerakhir = dayjs().isAfter(lastCheckinTime);
  return (
    <div className="container mx-auto h-screen p-8">
      {history.isFetched && history.data ? (
        <div className="w-full rounded-md bg-white p-6 shadow-md">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-8 lg:col-span-8">
              <h1 className="mb-4 text-2xl font-bold">
                {dataHistory?.tiket?.nama_kegiatan}{" "}
              </h1>
              <div className="space-y-2">
                <p>
                  Event :{" "}
                  <span className="font-semibold text-mainColors">
                    {dataHistory?.tiket?.event?.nama_acara}
                  </span>
                </p>
                <p className="mb-2 text-mainColors">
                  Total Harga:{" "}
                  <span className="font-semibold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(dataHistory?.total_harga))}
                  </span>
                </p>
                <p className="mb-4 text-mainColors">
                  Tanggal Transaksi:{" "}
                  {dayjs(dataHistory?.createdAt).format(FormatDayjsInput)}
                </p>
                <p className="mb-4 text-mainColors">
                  Tanggal Mulai:{" "}
                  {dayjs(dataHistory?.tiket?.event?.tanggal_acara).format(
                    FormatDayjsInput,
                  )}
                </p>
                <p className="mb-4 text-mainColors">
                  Status : {""}
                  <Tag color="blue">{dataHistory?.status}</Tag>
                </p>
              </div>
            </div>

            <div className="col-span-12 mt-10 md:col-span-4 lg:col-span-4">
              {belumMulai ? (
                <>
                  <p className="font-semibold text-red-500">
                    Barcode dapat diakses 2 jam sebelum acara dimulai
                  </p>
                </>
              ) : (
                <>
                  {sudahBerakhir ? (
                    <>
                      <p className="font-semibold text-red-500">
                        Maaf Barcode tidak dapat ditampilkan karena acara Sudah
                        Berakhir
                      </p>
                    </>
                  ) : (
                    <QRCode
                      size={300}
                      iconSize={100}
                      errorLevel="H"
                      value={dataHistory?.barcode as any}
                      icon="https://res.cloudinary.com/dkaxlvjbb/image/upload/v1705650090/OTIXX_tzlegh.png"
                    />
                  )}
                </>
              )}
              <div className="py-5">
                <button
                  className="w-full rounded-md bg-secondColors px-4 py-2 font-semibold text-white transition duration-300 hover:bg-mainColors"
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
