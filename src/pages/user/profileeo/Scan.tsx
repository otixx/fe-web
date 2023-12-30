import { Html5QrcodeScanner, Html5QrcodeResult } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { privateApi } from "@/shared/axios/axios";

const QRCodeScannerPage = () => {
  const navigate = useNavigate();
  const idEvent = useParams().id;
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    async function onScanSuccess(
      decodedText: string,
      decodedResult: Html5QrcodeResult,
    ) {
      try {
        await privateApi
          .put(`/transaction/checkin`, {
            idQr: decodedText,
            idEvent: idEvent,
          })
          .then((res) => {
            toast.success("Berhasil scan!");
            navigate("/");
            console.log(res);
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } catch (error: any) {
        console.error("Error calling API:", error.message);
      }
    }

    function onScanError() {}
    const verbose: boolean = false;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      verbose,
    );
    scanner.render(onScanSuccess, onScanError);
    setHtml5QrcodeScanner(scanner);
  }, []);

  const handleCloseScanner = () => {
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear();
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-md">
        <div className="w-full" id="reader"></div>
        <Toaster />
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleCloseScanner}
        >
          Tutup Scan
        </button>
      </div>
    </div>
  );
};

export default QRCodeScannerPage;
