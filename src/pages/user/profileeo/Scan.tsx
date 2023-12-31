import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { privateApi } from "@/shared/axios/axios";
import { Modal } from "antd";

const QRCodeScannerPage = () => {
  const navigate = useNavigate();
  const idEvent = useParams().id;
  const [modal, setModal] = useState(false);
  const [res, setRes] = useState<any>(null);
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5QrcodeScanner | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const verbose: boolean = false;

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 5, qrbox: 250 },
      verbose,
    );

    const onScanSuccess = async (decodedText: string) => {
      setRes("");
      if (!requestSent) {
        try {
          const res = await privateApi.put(`/transaction/checkin`, {
            idQr: decodedText,
            idEvent: idEvent,
          });
          console.log("Server response:", res?.data?.message);
          setModal(true);
          setRes(res);
          setRequestSent(true);
        } catch (err: any) {
          toast.error(err?.response?.data?.message);
          setRes(err?.response?.data?.message);
        }
      }
    };

    function onScanError() {}

    scanner.render(onScanSuccess, onScanError);
    setHtml5QrcodeScanner(scanner);

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
      }
    };
  }, [idEvent, requestSent]);

  const handleCloseScanner = () => {
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear();
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-2">
      <div className="w-full max-w-screen-md space-y-2">
        <div className="grid grid-cols-12">
          <div className="col-span-4 ">
            <h1>Nama : </h1>
          </div>
          <div className="col-span-8">
            {res?.data?.data?.name && res?.data?.data?.name}
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4 ">
            <h1>Status : </h1>
          </div>
          <div className="col-span-8">{res && `user ini ${res}`}</div>
        </div>
        <div className="w-full" id="reader"></div>
        <Toaster />
        <button
          className="w-full rounded bg-mainColors py-2 font-semibold text-white"
          onClick={handleCloseScanner}
        >
          Tutup Scan
        </button>
      </div>
      <Modal
        title="Selesaikan Pembayaran"
        footer={false}
        onCancel={() => setModal(false)}
        open={modal}
      >
        sdd
      </Modal>
    </div>
  );
};

export default QRCodeScannerPage;
