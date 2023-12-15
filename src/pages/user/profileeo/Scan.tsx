// QRCodeScannerPage.js
import { Html5QrcodeScanner, Html5QrcodeResult } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const QRCodeScannerPage = () => {
  const navigate = useNavigate();
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5QrcodeScanner | null>(null);
  const getToken: any = Cookies.get("token");
  const token = JSON.parse(getToken);

  useEffect(() => {
    const verbose: boolean = false;

    async function onScanSuccess(
      decodedText: string,
      decodedResult: Html5QrcodeResult,
    ) {
      try {
        console.log(`Scan result: ${decodedText}`, decodedResult);

        // Example: Call an API using Axios
        await axios
          .put(
            `${import.meta.env.VITE_BE_URL}/transaction/checkin`,
            {
              id: decodedText,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(() => {
            toast.success("Berhasil scan!");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error: any) {
        console.error("Error calling API:", error.message);
      }
    }

    function onScanError(errorMessage: string) {
      console.log(errorMessage);
    }

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
