import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
import {
  LuAlertCircle,
  LuCalendarDays,
  LuKey,
  LuMap,
  LuShieldCheck,
  LuTicket,
} from "react-icons/lu";
import toast from "react-hot-toast";
import { Image, Tag } from "antd";
import { IDataEventImg, IDataImgUrl } from "@/interface/ticket.interface";

const DetailTiket = () => {
  const [quantity, setQuantity] = useState(1);
  const [dataImg, setDataImg] = useState({} as IDataImgUrl);
  const [dataEventImg, setDataEventImg] = useState<IDataEventImg[]>();
  const idTiket = useParams();
  const navigate = useNavigate();

  const { data: ticketDetail } = QfindTicketbyId({
    id: idTiket?.id,
  });

  const parseImgData = async () => {
    if (ticketDetail && ticketDetail?.image_url) {
      const imageUrl = await JSON.parse(ticketDetail?.image_url);
      return imageUrl;
    }
  };

  const parseImgEventData = async () => {
    if (ticketDetail && ticketDetail?.event?.img_rundown) {
      const imageUrl = await JSON.parse(ticketDetail?.event?.img_rundown);
      return imageUrl;
    }
  };

  useEffect(() => {
    parseImgData().then((res) => setDataImg(res));
    parseImgEventData().then((res) => setDataEventImg(res));
    parseImgEventData();
  }, [ticketDetail]);

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

  return (
    <div className="container mx-auto my-10 max-w-7xl p-5">
      <div className="mx-auto mt-6 space-y-4">
        <div className="grid grid-cols-3 justify-between gap-5">
          <div className="order-1 col-span-3 h-80 lg:col-span-2">
            <img
              src={dataImg && dataImg.url}
              alt="imgDetail"
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="order-2 col-span-3 rounded-lg lg:col-span-1 lg:shadow-lg">
            <div className="h-full w-full rounded-lg bg-white px-2 lg:p-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {ticketDetail?.nama_kegiatan}
                </h1>
                <h3 className="text-sm font-semibold text-mainColors">
                  Highlights :
                </h3>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuCalendarDays />
                  {dayjs(ticketDetail?.event?.tanggal_acara).format(
                    FormatDayjs,
                  )}
                </span>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuMap />
                  {ticketDetail?.event?.lokasi}
                </span>
                <span className="flex items-center gap-2 text-gray-800">
                  <LuTicket />
                  {ticketDetail?.quantity == 0 ||
                  ticketDetail?.quantity === null
                    ? "Stok Habis"
                    : `${ticketDetail?.quantity} Qty`}
                </span>
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  <LuKey />
                  <Tag color="blue">{ticketDetail?.tags}</Tag>
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
                <p className="  text-base text-gray-900">
                  {ticketDetail?.event?.description}
                </p>
              </div>
              {dataEventImg &&
                dataEventImg.map((img, index) => (
                  <Image width={350} height={350} src={img?.url} key={index} />
                ))}
            </div>
          </div>

          <div className="order-3 col-span-9 px-4 lg:col-span-3">
            <h2 className="font-semibold text-mainColors">Harga</h2>
            <p className="truncate px-2 text-lg tracking-tight text-gray-900 lg:px-0 lg:text-3xl">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(ticketDetail?.harga) * quantity)}
            </p>
            <form className="mt-10" onSubmit={handleCheckout}>
              <div>
                {ticketDetail?.quantity && ticketDetail?.quantity !== 0 && (
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
                        onClick={() => handlePlus(ticketDetail?.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </fieldset>
                )}
              </div>
              <div className="cursor-pointer">
                <button
                  disabled={
                    ticketDetail?.quantity === 0 ||
                    ticketDetail?.quantity === null
                  }
                  type="submit"
                  className={`mt-10 ${
                    ticketDetail?.quantity === 0
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-secondColors hover:bg-mainColors"
                  } flex w-full items-center justify-center gap-2 rounded-md border border-transparent py-3  text-base  font-semibold text-white transition duration-500 `}
                >
                  {ticketDetail?.quantity === 0 ||
                  ticketDetail?.quantity === null ? (
                    <>
                      <LuAlertCircle size={20} />
                      Tiket Habis
                    </>
                  ) : (
                    <>
                      <LuShieldCheck size={20} />
                      Checkout
                    </>
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
