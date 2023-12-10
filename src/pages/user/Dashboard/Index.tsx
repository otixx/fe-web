import { useEffect, useState } from "react";
import Card from "@/components/user/Card";
import { Ticket } from "@/interface/ticket/ticket.interface";
import Carousel from "@/components/user/Carousel";
import { getTiket } from "@/service/ticket/ticket.service";
import { LuSearch } from "react-icons/lu";
const Index = () => {
  const [ticket, setTiket] = useState<Ticket[]>([]);

  useEffect(() => {
    getTiket()
      .then((res) => setTiket(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(ticket);
  return (
    <div>
      <Carousel />
      <div className="container mx-auto py-5">
        <div className="flex w-full justify-center md:justify-end lg:justify-end">
          <form>
            <div className="relative">
              <div className="black pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[20px]">
                <LuSearch />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border-2 border-gray-300 bg-gray-50 px-60 py-3.5 pl-10 text-[14px] text-black focus:outline-none"
                placeholder="Search Events..."
              />
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto mb-2 grid grid-cols-2 items-center  justify-center pb-10 lg:grid-cols-5">
        {ticket?.map((item: Ticket, index) => (
          <div className="p-2" key={index}>
            <Card
              image={JSON.parse(item.image_url)["url"]}
              title={item.nama_kegiatan}
              date={`${new Date(
                item.event["tanggal_acara"],
              ).getDate()} ${new Date(
                item.event["tanggal_acara"],
              ).toLocaleString("default", { month: "long" })} ${new Date(
                item.event["tanggal_acara"],
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
