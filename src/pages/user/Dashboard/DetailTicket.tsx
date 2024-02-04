import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import dayjs from "dayjs";
import { FormatDayjs, FormatDetailTicket } from "@/shared/dayjs/format";
import {
  LuAlertCircle,
  LuCalendarDays,
  LuKey,
  LuMap,
  LuTimer,
  LuShieldCheck,
  LuTicket,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { Image, Tag } from "antd";
import { IDataEventImg, IDataImgUrl } from "@/utils/interface/ticket.interface";
import { Helmet } from "react-helmet";

const DetailTiket = () => {
  const [quantity, setQuantity] = useState(1);
  const [dataImg, setDataImg] = useState({} as IDataImgUrl);
  const [dataEventImg, setDataEventImg] = useState<IDataEventImg[]>();
  const idTiket = useParams();
  const navigate = useNavigate();

  const ticketDetail = QfindTicketbyId({
    id: idTiket?.id,
  });

  if (ticketDetail?.data === null) {
    navigate("/");
  }

  const parseImgData = async () => {
    if (ticketDetail?.data && ticketDetail?.data?.image_url) {
      const imageUrl = await JSON.parse(ticketDetail?.data?.image_url);
      return imageUrl;
    }
  };

  const parseImgEventData = async () => {
    if (ticketDetail?.data && ticketDetail?.data?.event?.img_rundown) {
      const imageUrl = await JSON.parse(ticketDetail?.data?.event?.img_rundown);
      return imageUrl;
    }
  };

  useEffect(() => {
    parseImgData().then((res) => setDataImg(res));
    parseImgEventData().then((res) => setDataEventImg(res));
  }, [ticketDetail?.data]);

  const handlePlus = (qty: number) => {
    if (quantity == qty) {
      return toast.error(`Tiket hanya sisa ${qty}`);
    } else {
      setQuantity(quantity + 1);
    }
  };
  if (quantity === 5) {
    toast.error("Maksimal Tiket yang dapat dibeli hanya 5");
  }

  const handleMin = () => {
    setQuantity(quantity - 1);
  };

  const handleInput = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const handleCheckout = (e: any) => {
    e.preventDefault();
    navigate(`/detail/payment/${idTiket?.id}`, { state: { data: quantity } });
  };
  const tanggalAcara = dayjs(ticketDetail?.data?.tanggal_preorder).format(
    "YYY-MM-DD",
  );
  const hariIni = dayjs().format(FormatDetailTicket);
  const belumMulai =
    hariIni < dayjs(ticketDetail?.data?.tanggal_preorder).format("YYY-MM-DD");
  const dahAbis =
    hariIni >
    dayjs(ticketDetail?.data?.tanggal_expired).format(FormatDetailTicket);

  return (
    <div className="container mx-auto my-10 max-w-7xl p-5">
      <Helmet>
        {/* <meta charSet="utf-8" property="og:tittle" content="Test" />
        <meta
          charSet="utf-8"
          property="og:url"
          content="https://otixx.online/tiket"
        />
        <meta
          charSet="utf-8"
          property="og:description"
          content="ini adalah sebuah deskripsi"
        />
        <meta
          charSet="utf-8"
          property="og:site_name"
          content="ini adalah site name nya otixx"
        />
        <meta
          charSet="utf-8"
          property="og:image"
          content="https://res.cloudinary.com/dkaxlvjbb/image/upload/v1705933163/otixx/thumnailTiket/Pengunjung_1705933162548_bd560b3cd9_Payload.png"
        /> */}
        <title>Otakutixx - Detail Tiket</title>
        <meta property="og:title" content={ticketDetail?.data?.nama_kegiatan} />
        <meta property="og:image" content={dataImg && dataImg?.url} />
        <meta
          property="og:url"
          content={`https://www.otixx.online/detail/${ticketDetail?.data?.id}`}
        />
      </Helmet>
      <div className="mx-auto mt-6 space-y-4">
        <div className="grid grid-cols-3 justify-between gap-5">
          <div className="order-1 col-span-3 h-80 lg:col-span-2">
            <Image
              width="100%"
              style={{ objectFit: "cover", borderRadius: "5px" }}
              height={320}
              src={dataImg && dataImg?.url}
            />
          </div>
          <div className="order-2 col-span-3 rounded-lg lg:col-span-1 lg:shadow-lg">
            <div className="h-full w-full rounded-lg bg-white px-2 lg:p-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {ticketDetail?.data ? (
                    ticketDetail?.data?.nama_kegiatan
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </h1>
                <h3 className="text-sm font-semibold text-mainColors">
                  Highlights :
                </h3>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuCalendarDays />
                  {ticketDetail?.data ? (
                    dayjs(ticketDetail?.data?.event?.tanggal_acara).format(
                      FormatDayjs,
                    )
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </span>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuMap />
                  {ticketDetail?.data ? (
                    ticketDetail?.data?.event?.lokasi
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </span>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuTicket />
                  {ticketDetail?.data ? (
                    ticketDetail?.data?.quantity == 0 ||
                    ticketDetail?.data?.quantity === null ? (
                      "Stok Habis"
                    ) : (
                      `${ticketDetail?.data?.quantity} Qty`
                    )
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </span>
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  <LuKey />
                  {ticketDetail?.data ? (
                    <Tag color="blue">{ticketDetail?.data?.tags}</Tag>
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-9 justify-between">
          <div className="order-1 col-span-9  lg:col-span-6 lg:border-gray-200">
            <div className="px-2 lg:px-0">
              <div className="mb-20">
                <h3 className="text-lg font-semibold text-mainColors">
                  Description Event :
                </h3>
                <div className="  text-base text-gray-900">
                  {ticketDetail?.data ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: ticketDetail?.data?.event?.description,
                      }}
                    />
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {dataEventImg ? (
                  dataEventImg &&
                  dataEventImg.map((img, index) => (
                    <Image
                      width={350}
                      height={350}
                      src={img?.url}
                      key={index}
                    />
                  ))
                ) : (
                  <div
                    role="status"
                    className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                  >
                    <div className="w-full">
                      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="order-3 col-span-9 px-4 lg:col-span-3">
            <h2 className="font-semibold text-mainColors">Harga</h2>
            <div className="truncate px-2 text-lg tracking-tight text-gray-900 lg:px-0 lg:text-3xl">
              {ticketDetail?.data?.harga ? (
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(ticketDetail?.data?.harga) * quantity)
              ) : (
                <div
                  role="status"
                  className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                >
                  <div className="w-full">
                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              )}
            </div>
            <form className="mt-10" onSubmit={handleCheckout}>
              <div>
                {ticketDetail?.data ? (
                  ticketDetail?.data?.quantity &&
                  ticketDetail?.data?.quantity !== 0 && (
                    <fieldset className="mt-4">
                      <h1>Qty</h1>
                      <div className="items-center space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-gray-200 px-2 py-1 shadow-sm transition duration-150 hover:bg-gray-300"
                          onClick={() => handleMin()}
                          disabled={quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          disabled
                          value={quantity}
                          onChange={handleInput}
                          className="w-20 rounded-md border border-gray-300 py-1 text-center focus:outline-none"
                        />
                        <button
                          type="button"
                          disabled={quantity === 5}
                          className="rounded-md bg-gray-200 px-2 py-1 shadow-sm transition duration-150 hover:bg-gray-300"
                          onClick={() =>
                            handlePlus(ticketDetail?.data?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </fieldset>
                  )
                ) : (
                  <div
                    role="status"
                    className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                  >
                    <div className="w-full">
                      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="cursor-pointer">
                <button
                  disabled={
                    ticketDetail?.data?.quantity === 0 ||
                    ticketDetail?.data?.quantity === null ||
                    belumMulai ||
                    dahAbis
                  }
                  type="submit"
                  className={`mt-10 ${
                    ticketDetail?.data?.quantity === 0 ||
                    tanggalAcara > hariIni ||
                    dahAbis
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-secondColors hover:bg-mainColors"
                  } flex w-full items-center justify-center gap-2 rounded-md border border-transparent py-3 text-base font-semibold text-white transition duration-500 `}
                >
                  {ticketDetail?.data ? (
                    ticketDetail?.data?.quantity === 0 ||
                    ticketDetail?.data?.quantity === null ||
                    belumMulai ? (
                      <>
                        <LuAlertCircle size={20} />
                        {belumMulai
                          ? `Maaf belum tanggal preorder, Mulai Oder ${dayjs(
                              ticketDetail?.data?.tanggal_preorder,
                            ).format("DD-MM-YYYY")}`
                          : "Tiket Habis"}
                      </>
                    ) : (
                      <>
                        {dahAbis ? (
                          <span className="flex gap-2">
                            <LuTimer size={20} />
                            Maaf Pembelian sudah tutup
                          </span>
                        ) : (
                          <span className="flex gap-2">
                            <LuShieldCheck size={20} />
                            Checkout
                          </span>
                        )}
                      </>
                    )
                  ) : (
                    <div
                      role="status"
                      className="animate-pulse space-y-8 rtl:space-x-reverse md:flex md:items-center md:space-x-8 md:space-y-0"
                    >
                      <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTiket;
