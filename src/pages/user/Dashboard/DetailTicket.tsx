import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QfindTicketbyId } from "@/service/ticket/ticket.service";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
import { LuCalendarDays, LuMap } from "react-icons/lu";

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
    <div className="container mx-auto my-10 p-5">
      <div className="mx-auto mt-6 grid max-h-96 grid-cols-3 justify-between gap-5">
        <div className="col-span-2  h-96 rounded-lg">
          <img
            src={JSON.parse(ticketDetail?.image_url || '{"url": ""}').url}
            alt="imgDetail"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="col-span-1 h-96 rounded-lg shadow-lg">
          <div className="h-full w-full bg-white p-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {ticketDetail?.nama_kegiatan}
              </h1>
              <h3 className="text-sm font-semibold text-mainColors">
                Highlights :
              </h3>
              <span className="flex items-center gap-2 text-gray-800">
                <LuCalendarDays />
                {dayjs(ticketDetail?.event?.tanggal_acara).format(FormatDayjs)}
              </span>
              <span className="flex items-center gap-2 text-gray-800">
                <LuMap />
                {ticketDetail?.event?.lokasi}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <div>
            <h3 className="text-lg font-semibold text-mainColors">
              Description Event :
            </h3>
            <div className="space-y-6">
              <p className="text-base text-gray-900">
                {ticketDetail?.event?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(ticketDetail?.harga))}
          </p>
          <form className="mt-10" onSubmit={handleCheckout}>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <fieldset className="mt-4">
                <legend className="sr-only">Qty</legend>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="rounded-md bg-gray-200 px-2 py-1"
                    onClick={() => handleMin()}
                    hidden={quantity === 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleInput}
                    className="w-16 rounded-md border border-gray-300 py-1 text-center focus:outline-none"
                  />
                  <button
                    type="button"
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
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-secondColors px-8 py-3 text-base font-medium text-white hover:bg-mainColors"
              >
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailTiket;
