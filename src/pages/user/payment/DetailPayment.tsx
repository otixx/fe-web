import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BarcodePopup from "./pay";
import { privateApi } from "@/shared/axios/axios";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import { Form, Input, Select } from "antd";
import toast from "react-hot-toast";
import { LoadingOutlined } from "@ant-design/icons";
import { DataCity, paymentMethods } from "@/shared/tempData";
import { useDevice } from "@/service/device/device.service";
import { EPayment } from "@/utils/enum/payment.enum";
import { Helmet } from "react-helmet";

const DetailPayment = () => {
  const idTiket = useParams().id;
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState("");
  const [barcodeData, setBarcodeData] = useState("");
  const [idTransaction, setIdTransaction] = useState("");
  const device = useDevice((state) => state?.device);
  const [file, setFile] = useState<any>();

  const qty = location?.state?.data;
  const navigate = useNavigate();
  const { Item } = Form;
  const { Option } = Select;

  const { data: tiket } = QfindTicketbyId({ id: idTiket });

  const handleSubmit = async (value: any) => {
    if (selectedMethod) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("nama", value?.name);
        formData.append("asal_kota", value?.lokasi);
        formData.append("judul_lagu", value?.judul_lagu);
        formData.append("quantity", qty);
        formData.append("instagram", value?.instagram);
        formData.append("nohp", value?.noHp);
        formData.append("cosplay_name", value?.cosplay);
        formData.append("payment", selectedMethod);
        formData.append("music", file);
        const response = await privateApi.post(
          `/transaction/create/${idTiket}`,
          formData,
        );
        setLoading(false);
        setExpired(response?.data?.data?.expiry_time);
        if (response?.data?.status == 200) {
          if (device === "mobile" && selectedMethod === EPayment.shopee) {
            toast.success(response?.data?.message);
            setIdTransaction(response.data?.data?.transaction_id);
            window.open(`${response?.data?.data?.actions[0]?.url}`, "_blank");
            navigate("/history");
          } else if (device === "mobile" && selectedMethod === EPayment.gopay) {
            toast.success(response?.data?.message);
            setIdTransaction(response.data?.data?.transaction_id);
            window.open(`${response.data?.data?.actions[1]?.url}`, "_blank");
            navigate("/history");
          } else {
            setShowPopup(true);
            toast.success(response?.data?.message);
            setIdTransaction(response?.data?.data?.transaction_id);
            setBarcodeData(response?.data?.data?.actions[0]?.url);
          }
        }
      } catch (error: any) {
        setLoading(false);
        if (error?.response?.status == 400) {
          toast.error(error?.response?.data?.message);
        } else if (error?.response?.data?.status == 500) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.message);
        }
      }
    } else {
      setLoading(false);
      return toast.error("Payment Wajib Dipilih");
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const formattedDataCity = DataCity.map((city) => ({
    label: city?.name,
    value: city?.name,
  }));

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList) as File[];
      setFile(fileArray[0]);
    }
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" name="payment" />
        <title>Otakutixx - Pembayaran</title>
      </Helmet>
      <div className="space-y-2 p-4">
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-5 gap-2">
            <div className="order-1 col-span-5 gap-2 rounded-sm p-4 lg:order-1 lg:col-span-3">
              <div className="mt-2 py-4">
                <h1 className="text-2xl font-bold">Detail Pemesanan</h1>
              </div>

              <div className="flex justify-between py-4">
                <h1 className="text-[16px] font-bold">
                  {tiket?.nama_kegiatan}
                </h1>
                <h1 className="font-semibold text-[#666666]">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(tiket?.harga))}
                </h1>
              </div>
              <hr />
              <div className="py-4">
                {tiket?.tags === "visitor" || tiket?.tags === "stand" ? null : (
                  <>
                    <Item
                      rules={[{ required: true, message: "Masukkan Nama" }]}
                      name="name"
                      label="Nama"
                    >
                      <Input size="large" disabled={loading} />
                    </Item>
                    <Item
                      rules={[{ required: true, message: "Masukkan Lokasi" }]}
                      name="lokasi"
                      label="Kota"
                    >
                      <Select
                        size="large"
                        showSearch
                        placeholder="Pilih kota atau kabupaten"
                        optionFilterProp="label"
                        filterOption={filterOption}
                      >
                        {formattedDataCity.map((city) => (
                          <Option
                            key={city.value}
                            value={city.value}
                            label={city.label}
                          >
                            {city.label}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                    <Item
                      name="instagram"
                      rules={[
                        { required: true, message: "Masukkan Nama Instagram" },
                      ]}
                      label="Instagram"
                    >
                      <Input addonBefore="@" disabled={loading} size="large" />
                    </Item>
                    <Item
                      rules={[
                        { required: true, message: "Masukkan No Hp" },
                        {
                          min: 10,
                          message: "No Hp minimal 10 digit",
                        },
                      ]}
                      name="noHp"
                      label="No Hp"
                    >
                      <Input size="large" disabled={loading} />
                    </Item>
                    {tiket?.tags === "music" || tiket?.tags === "coscomp" ? (
                      <>
                        <Item
                          rules={[
                            { required: true, message: "Masukkan Judul Lagu" },
                          ]}
                          name="judul_lagu"
                          label="Judul Lagu"
                        >
                          <Input size="large" disabled={loading} />
                        </Item>
                        {tiket?.tags === "coscomp" ? (
                          <Item
                            rules={[
                              {
                                required: true,
                                message: "Masukkan Nama Cosplay",
                              },
                            ]}
                            name="cosplay"
                            label="Cosplay Name"
                          >
                            <Input size="large" disabled={loading} />
                          </Item>
                        ) : null}
                        <Item
                          rules={[
                            {
                              required: true,
                              message: "Tanggal Expired Tiket Wajib",
                            },
                          ]}
                          label="File Music"
                        >
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleMusicChange}
                            className=" block w-full rounded-sm border border-gray-300  p-2.5 text-sm text-black"
                          />
                        </Item>
                      </>
                    ) : (
                      <Item
                        rules={[
                          { required: true, message: "Masukkan Nama Cosplay" },
                        ]}
                        name="cosplay"
                        label="Cosplay Name"
                      >
                        <Input size="large" disabled={loading} />
                      </Item>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="order-2 col-span-5 h-fit rounded-sm p-4 shadow-lg lg:order-1 lg:col-span-2">
              <h1 className="p-4 text-2xl font-bold">
                {" "}
                Pilih Metode Pembayaran
              </h1>
              <div className="flex flex-col gap-4">
                {paymentMethods.map((method, index) => (
                  <div key={index}>
                    {device === "dekstop" &&
                    method.name === EPayment.shopee ? null : (
                      <div
                        className={`flex ${
                          loading ? "bg-gray-100" : ""
                        } cursor-pointer justify-between rounded-sm border-2 px-4 shadow-sm`}
                        onClick={() => setSelectedMethod(method.name)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            readOnly
                            checked={selectedMethod === method.name}
                          />
                          <h1 className="text-[16px] font-semibold">
                            {method.name}
                          </h1>
                        </div>
                        <img
                          className="right-0 h-full w-20 bg-transparent mix-blend-multiply"
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
          <div className="grid grid-cols-5">
            <div className="col-span-5 lg:col-span-3">
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
                  {loading ? <LoadingOutlined /> : "Buat Tagihan Pembayaran"}
                </button>
                <p className="py-2 text-[12px] font-semibold text-[#666666]">
                  Dengan checkout, Anda setuju dengan Ketentuan Penggunaan kami
                  dan mengonfirmasi bahwa Anda telah membaca Kebijakan Privasi
                  kami. Anda dapat membatalkan biaya perpanjangan layanan kapan
                  saja.
                </p>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <BarcodePopup
        expired={expired}
        device={device}
        payment={selectedMethod}
        barcode={barcodeData}
        onClose={closePopup}
        showPopup={showPopup}
        idTransaction={idTransaction}
      />
    </div>
  );
};

export default DetailPayment;
