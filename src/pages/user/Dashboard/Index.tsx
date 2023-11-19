import { useEffect, useState } from "react";
import Card from "../../../components/user/Hero/Card";
import Carousel from "../../../components/user/Hero/Carousel";
import axios from "axios";
const Index = () => {
  interface Ticket {
    nama_kegiatan: string;
    date: string;
    harga: string;
    location: string;
    image_url: string; // atau sesuaikan dengan struktur objek yang sebenarnya
    event: {
      tanggal_acara: string;
      lokasi: string;
    };
    id: string;
  }

  const [Tiket, setTiket] = useState<Ticket[]>([]);

  useEffect(() => {
    const getTiket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tiket`);
        setTiket(response.data.data);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getTiket();
  }, []);

  return (
    <div>
      <Carousel />
      <div className="container mx-auto py-5 md:block lg:block">
        <div className="flex justify-end w-full">
          <form>
            <label
              htmlFor="default-search"
              className=" mb-2 text-sm font-medium text-white sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute text-white text-[20px] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full block py-3.5 px-60 pl-10 text-[14px] text-black border-2 border-gray-300 rounded-full bg-gray-50 focus:outline-none"
                placeholder="Search Events..."
              />
              {/* <button type="submit" className="text-white absolute text-[14px] right-2 bottom-1.5 bg-secondColors hover:bg-mainColors font-medium rounded-full text-sm px-4 py-2">Search</button> */}
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-5 pb-10 mb-2 justify-center items-center">
        {Tiket.map((item: Ticket, index) => (
          <div className="p-2" key={index}>
            <Card
              image={JSON.parse(item.image_url)["url"]}
              title={item.nama_kegiatan}
              date={`${new Date(
                item.event["tanggal_acara"]
              ).getDate()} ${new Date(
                item.event["tanggal_acara"]
              ).toLocaleString("default", { month: "long" })} ${new Date(
                item.event["tanggal_acara"]
              ).getFullYear()}`}
              price={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(item.harga))}
              location={item.event["lokasi"]}
              id={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
