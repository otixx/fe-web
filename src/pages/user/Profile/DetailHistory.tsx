import { useNavigate } from "react-router-dom";
import { useHistory } from "@/service/transaction/history.service";
import { useEffect } from "react";
import { dataTransaction } from "@/interface/profile/history.interface";
import QRCode from "qrcode.react";

const Detailhistory = () => {
  const navigate = useNavigate();
  const history: dataTransaction[] = useHistory((state) => state?.history);
  const getHistory = useHistory((state) => state?.getHistory);

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {history.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-md bg-white p-6 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">
            {" "}
            {history[0]?.tiket.nama_kegiatan}
          </h1>
          <p className="mb-2 text-gray-600">
            Total Harga: {history[0]?.total_harga}
          </p>
          <p className="mb-4 text-gray-600">
            Tanggal Transaksi:{" "}
            {`${new Date(history[0]?.createdAt).toLocaleString()}`}
          </p>
          {new Date(history[0]?.tiket.event.tanggal_acara) <= new Date() ? (
            <>
              <p className="mb-4 text-gray-600">
                Tanggal Mulai:{" "}
                {`${new Date(
                  history[0]?.tiket.event.tanggal_acara,
                ).toLocaleString()}`}
              </p>
              <img src={history[0]?.barcode} alt="Barcode" className="mb-4" />
              <QRCode value={history[0].barcode} />
            </>
          ) : (
            <p className="text-red-500">
              Barcode will be available when the event starts.
            </p>
          )}
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => navigate("/history")}
          >
            Back to History
          </button>
        </div>
      )}
    </div>
  );
};

export default Detailhistory;
