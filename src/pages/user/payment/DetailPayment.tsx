import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import BarcodePopup from "./pay";
import { privateApi } from "@/shared/axios/axios";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import { Form, Input, Select } from "antd";
import toast from "react-hot-toast";

const DetailPayment = () => {
  const idTiket = useParams().id;
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const [idTransaction, setIdTransaction] = useState("");

  const qty = location?.state?.data;

  let userAgent = navigator.userAgent;
  let isMobile = /Mobi/.test(userAgent);
  let isTablet = /Tablet|iPad/.test(userAgent);
  let isDesktop = !isMobile && !isTablet;

  const { data: tiket } = QfindTicketbyId({ id: idTiket });

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

  const handleSubmit = async (value: any) => {
    if (selectedMethod) {
      try {
        const response = await privateApi.post(`/transaction/${idTiket}`, {
          quantity: qty,
          nama: value?.name,
          asal_kota: value?.lokasi,
          judul_lagu: value?.cosplay,
          instagram: value?.instagram,
          nohp: value?.noHp,
          cosplay_name: value?.cosplay,
          payment:
            isDesktop && selectedMethod === "shopeepay" ? "" : selectedMethod,
        });
        if (!isDesktop && selectedMethod === "shopeepay") {
          setIdTransaction(response.data.response.transaction_id);
          window.open(`${response.data.response.actions[1].url}`, "_blank");
        } else if (!isDesktop && selectedMethod === "gopay") {
          setIdTransaction(response.data.response.transaction_id);
          window.open(`${response.data.response.actions[1].url}`, "_blank");
        } else {
          setIdTransaction(response.data.response.transaction_id);
          setBarcodeData(response.data.response.actions[0].url);
          setShowPopup(true);
          console.log(response.data.response.actions[0].url);
        }
      } catch (error: any) {
        console.log(error?.response?.data);
      }
    } else {
      return toast.error("Payment Wajib Dipilih");
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const { Item } = Form;
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="container mx-auto">
      <div className="p-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="order-2 col-span-5 gap-2 rounded-sm p-4 lg:order-1 lg:col-span-3">
            <div className="mt-2 py-4">
              <h1 className="text-2xl font-bold">Detail Pemesanan</h1>
            </div>

            <div className="flex justify-between py-4">
              <h1 className="text-[16px] font-bold">{tiket?.nama_kegiatan}</h1>
              <h1 className="font-semibold text-[#666666]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(tiket?.harga))}
              </h1>
            </div>
            <hr />
            <div className="py-4">
              <Form layout="vertical" onFinish={handleSubmit}>
                {tiket?.tags === "visitor" ? null : (
                  <>
                    <Item name="name" label="Nama">
                      <Input size="large" />
                    </Item>
                    <Item name="lokasi" label="Kota">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Pilih Kota"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={[
                          {
                            value: "jember",
                            label: "Jember",
                          },
                        ]}
                      />
                    </Item>
                    <Item name="instagram" label="Instagram">
                      <Input addonBefore="@" size="large" />
                    </Item>
                    <Item name="noHp" label="No Hp">
                      <Input size="large" />
                    </Item>
                    {tiket?.tags === "music" ? (
                      <Item name="song" label="Judul Lagu">
                        <Input size="large" />
                      </Item>
                    ) : (
                      <Item name="cosplay" label="Cosplay Name">
                        <Input size="large" />
                      </Item>
                    )}
                  </>
                )}
                <div className="py-4">
                  <div className="flex justify-between py-4">
                    <h1 className="font text-[14px] font-semibold">Qty</h1>
                    <h1 className="font-semibold text-[#666666]">x {qty}</h1>
                  </div>
                  <hr />
                  <div className="flex justify-between py-4">
                    <h1 className="font text-[14px] font-semibold">Total</h1>
                    <h1 className="font-semibold ">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Number(tiket?.harga) * qty)}
                    </h1>
                  </div>
                  <div className="flex flex-col py-4">
                    <button
                      type="submit"
                      className="rounded-sm bg-secondColors px-8 py-2.5 text-[14px] font-semibold text-white transition duration-300 hover:bg-mainColors"
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
                </div>
              </Form>
            </div>
          </div>

          <div className="order-2 col-span-5 h-fit rounded-sm p-4 shadow-lg lg:order-1 lg:col-span-2">
            <h1 className="p-4 text-2xl font-bold"> Pilih Metode Pembayaran</h1>
            <div className="flex flex-col gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index}>
                  {isDesktop && method.name === "shopeepay" ? null : (
                    <div
                      className={`flex cursor-pointer justify-between rounded-sm border-2 px-4 shadow-sm`}
                      onClick={() => setSelectedMethod(method.name)}
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
    </div>
  );
};

export default DetailPayment;
