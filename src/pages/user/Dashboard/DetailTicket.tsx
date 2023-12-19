import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
import { LuCalendarDays, LuMap } from "react-icons/lu";
import toast from "react-hot-toast";

const DetailTiket = () => {
  const [quantity, setQuantity] = useState(1);
  const idTiket = useParams();
  const navigate = useNavigate();

  const { data: ticketDetail } = QfindTicketbyId({
    id: idTiket?.id,
  });

  const handlePlus = () => {
    setQuantity(quantity + 1);
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
              src={JSON.parse(ticketDetail?.image_url || '{"url": ""}').url}
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
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 justify-between">
          <div className="col-span-3 lg:col-span-2 lg:border-gray-200">
            <div className="px-2 lg:px-0">
              <h3 className="text-lg font-semibold text-mainColors">
                Description Event :
              </h3>
              <div className="space-y-6">
                <p className="  text-base text-gray-900">
                  {ticketDetail?.event?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-3 px-4 lg:col-span-1">
            <h2 className="font-semibold text-mainColors">Harga</h2>
            <p className="truncate px-2 text-lg tracking-tight text-gray-900 lg:px-0 lg:text-3xl">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(ticketDetail?.harga) * quantity)}
            </p>
            <form className="mt-10" onSubmit={handleCheckout}>
              <div>
                <fieldset className="mt-4">
                  <h1>Qty</h1>
                  <div className="items-center space-x-3">
                    <button
                      type="button"
                      className="rounded-md bg-gray-200 px-2 py-1"
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
                      className="rounded-md bg-gray-200 px-2 py-1"
                      onClick={() => handlePlus()}
                    >
                      +
                    </button>
                  </div>
                </fieldset>
              </div>
              <div className="cursor-pointer">
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-secondColors px-8 py-3 text-base font-medium text-white transition duration-500 hover:bg-mainColors"
                >
                  Checkout
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
