import Card from "@/components/user/Card";
import { Ticket } from "@/interface/ticket/ticket.interface";
import Carousel from "@/components/user/Carousel";
import { QfindTicket } from "@/service/ticket/ticket.service";
import { LuSearch } from "react-icons/lu";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
const Index = () => {
  const ticket = QfindTicket();
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
        {ticket?.data?.map((item: Ticket, index: number) => (
          <div className="p-2" key={index}>
            <Card
              image={JSON.parse(item?.image_url)["url"]}
              title={item?.nama_kegiatan}
              date={dayjs(item?.date).format(FormatDayjs)}
              price={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(item?.harga))}
              location={item?.event?.lokasi}
              id={item?.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
