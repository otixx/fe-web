import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Ticket } from "@/interface/ticket/ticket.interface";
import { getTiket } from "@/service/ticket/ticket.service";

const DetailTiket = () => {
  const [quantity, setQuantity] = useState(1);
  const [Tiket, setTiket] = useState<Ticket[]>([]);
  const idTiket = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTiket({ id: 1 });
  }, [idTiket]);

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
  };
  return (
    <div>
      <div className="bg-white">
        {Tiket.map((item, index) => (
          <div className="pt-6" key={index}>
            <div className="mx-auto mt-6 max-w-2xl justify-between sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-5 lg:px-8">
              <div className="overflow-hidden rounded-lg lg:block">
                <img
                  src={JSON.parse(item?.image_url || '{"url": ""}').url}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {item.nama_kegiatan}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {item.harga}
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

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Ea voluptatibus dicta minus illum eum incidunt, veritatis
                      debitis! Similique fugiat suscipit itaque enim natus,
                      possimus autem eius assumenda illo voluptas sint!
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          {`${new Date(
                            item.event["tanggal_acara"],
                          ).getDate()} ${new Date(
                            item.event["tanggal_acara"],
                          ).toLocaleString("default", {
                            month: "long",
                          })} ${new Date(
                            item.event["tanggal_acara"],
                          ).getFullYear()}`}
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          {item.event["lokasi"]}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTiket;
