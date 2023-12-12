import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BarcodePopup from "./pay";
import { privateApi } from "@/shared/axios/axios";
import { Ticket } from "@/interface/ticket.interface";

const DetailPayment = () => {
  const [Tiket, setTiket] = useState<Ticket[]>([]);
  const idTiket = useParams().id;
  const location = useLocation();
  const dataQtyPreviousPage = location.state?.data || 0;
  const [selectedMethod, setSelectedMethod] = useState("");
  const [nama, setNama] = useState("");
  const [kota, setKota] = useState("");
  const [instagram, setInstagram] = useState("");
  const [noHp, setNoHp] = useState("");
  const [lagu, setLagu] = useState("");
  const [cosplay, setCosplay] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const [idTransaction, setIdTransaction] = useState("");

  // Check Device  -------------------------------------------------------
  let userAgent = navigator.userAgent;

  // Mengekstrak informasi tambahan dari User Agent String
  let isMobile = /Mobi/.test(userAgent);
  let isTablet = /Tablet|iPad/.test(userAgent);
  let isDesktop = !isMobile && !isTablet;
  // Check Device End -------------------------------------------------------

  useEffect(() => {
    const getTiket = async () => {
      try {
        const response = await privateApi.get(`/tiket/${idTiket}`);
        setTiket([response.data.data]);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getTiket();
  }, [idTiket]);

  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };

  const paymentMethods = [
    {
      name: "qris",
      logoSrc:
        "https://logowik.com/content/uploads/images/qris-qris-quick-response-code-indonesian-standard8461.logowik.com.webp",
    },
    {
      name: "gopay",
      logoSrc: "https://logowik.com/content/uploads/images/gopay7196.jpg",
    },
    {
      name: "shopeepay",
      logoSrc: "https://logowik.com/content/uploads/images/shopeepay4268.jpg",
    },
  ];

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (selectedMethod.length === 0) {
      return console.log("harus isi method");
    }

    const data = {
      quantity: dataQtyPreviousPage,
      nama: nama,
      asal_kota: kota,
      judul_lagu: lagu,
      instagram: instagram,
      nohp: noHp,
      cosplay_name: cosplay,
      payment:
        isDesktop && selectedMethod === "shopeepay" ? "" : selectedMethod,
    };

    const pushSubmit = async () => {
      try {
        const responses = await privateApi.post(
          `/transaction/${idTiket}`,
          data,
        );
        if (isDesktop === false && selectedMethod === "shopeepay") {
          setIdTransaction(responses.data.response.transaction_id);
          window.open(`${responses.data.response.actions[1].url}`, "_blank");
        } else if (isDesktop === false && selectedMethod === "gopay") {
          setIdTransaction(responses.data.response.transaction_id);
          window.open(`${responses.data.response.actions[1].url}`, "_blank");
        } else {
          setIdTransaction(responses.data.response.transaction_id);
          setBarcodeData(responses.data.response.actions[0].url);
          setShowPopup(true);
          console.log(responses.data.response.actions[0].url);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    pushSubmit();
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="grid grid-cols-5 gap-4">
          {Tiket.map((item, index) => (
            <div
              className="order-2 col-span-5 gap-2 rounded-sm p-4 lg:order-1 lg:col-span-3"
              key={index}
            >
              <div className="mt-2 py-4">
                <h1 className="text-2xl font-bold">Detail Pemesanan</h1>
              </div>

              <div className="flex justify-between py-4">
                <h1 className="text-[16px] font-bold">{item.nama_kegiatan}</h1>
                <h1 className="font-semibold text-[#666666]">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(item.harga))}
                </h1>
              </div>
              <hr />
              <div className="py-4">
                {Tiket[0].tags === "visitor" ? null : (
                  <form className="py-4">
                    <div className="py-2">
                      <label htmlFor="name" className="block font-semibold">
                        Nama
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full rounded-md border-2 p-2"
                        placeholder="Isi Nama"
                      />
                    </div>

                    <div className="py-2">
                      <label htmlFor="city" className="block font-semibold">
                        Asal Kota
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={(e) => setKota(e.target.value)}
                        className="w-full rounded-md border-2 p-2"
                        placeholder="Isi Asal Kota"
                      />
                    </div>

                    <div className="py-2">
                      <label
                        htmlFor="instagram"
                        className="block font-semibold"
                      >
                        Instagram
                      </label>
                      <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full rounded-md border-2 p-2"
                        placeholder="Isi Instagram"
                      />
                    </div>

                    <div className="py-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block font-semibold"
                      >
                        Nomor HP
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={(e) => setNoHp(e.target.value)}
                        className="w-full rounded-md border-2 p-2"
                        placeholder="Isi Nomor HP"
                      />
                    </div>
                    {Tiket[0].tags === "music" ? (
                      <div className="py-2">
                        <label
                          htmlFor="songTitle"
                          className="block font-semibold"
                        >
                          Judul Lagu
                        </label>
                        <input
                          type="text"
                          id="songTitle"
                          name="songTitle"
                          onChange={(e) => setLagu(e.target.value)}
                          className="w-full rounded-md border-2 p-2"
                          placeholder="Isi Judul Lagu"
                        />
                      </div>
                    ) : (
                      <div className="py-2">
                        <label
                          htmlFor="cosplayName"
                          className="block font-semibold"
                        >
                          Cosplay Name
                        </label>
                        <input
                          type="text"
                          id="cosplayName"
                          name="cosplayName"
                          onChange={(e) => setCosplay(e.target.value)}
                          className="w-full rounded-md border-2 p-2"
                          placeholder="Isi Cosplay Name"
                        />
                      </div>
                    )}
                  </form>
                )}
                <form className="py-4" onSubmit={handleSubmit}>
                  <div className="flex justify-between py-4">
                    <h1 className="font text-[14px] font-semibold">Qty</h1>
                    <h1 className="font-semibold text-[#666666]">
                      x {dataQtyPreviousPage}
                    </h1>
                  </div>
                  <hr />
                  <div className="flex justify-between py-4">
                    <h1 className="font text-[14px] font-semibold">Total</h1>
                    <h1 className="font-semibold ">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Number(item.harga) * dataQtyPreviousPage)}
                    </h1>
                  </div>
                  <div className="flex flex-col py-4">
                    <button
                      type="submit"
                      className="rounded-sm bg-secondColors px-8 py-2.5 text-[14px] font-semibold text-white"
                    >
                      {" "}
                      Buat Tagihan Pembayaran
                    </button>
                    <p className="py-2 text-[12px] font-semibold text-[#666666]">
                      Dengan checkout, Anda setuju dengan Ketentuan Penggunaan
                      kami dan mengonfirmasi bahwa Anda telah membaca Kebijakan
                      Privasi kami. Anda dapat membatalkan biaya perpanjangan
                      layanan kapan saja.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          ))}

          <div className="order-2 col-span-5 h-fit rounded-sm p-4 shadow-lg lg:order-1 lg:col-span-2">
            <h1 className="p-4 text-2xl font-bold"> Pilih Metode Pembayaran</h1>
            <div className="flex flex-col gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index}>
                  {isDesktop === true && method.name === "shopeepay" ? null : (
                    <div
                      className={`flex cursor-pointer justify-between rounded-sm border-2 px-4 shadow-sm`}
                      onClick={() => handleMethodChange(method.name)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={selectedMethod === method.name}
                          onChange={() => {}}
                        />
                        <h1 className="text-[16px] font-semibold">
                          {method.name}
                        </h1>
                      </div>
                      <img
                        className="right-0 h-full w-20 bg-transparent"
                        src={method.logoSrc}
                        alt={method.name}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <BarcodePopup
          barcodeData={barcodeData}
          onClose={closePopup}
          idTransaction={idTransaction}
        />
      )}

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default DetailPayment;
