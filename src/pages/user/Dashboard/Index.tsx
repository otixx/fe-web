import { QfindTicket } from "@/service/ticket/ticket.service";
import { LuSearch } from "react-icons/lu";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
import { Ticket } from "@/interface/ticket.interface";
import SkeletonCard from "@/components/Skeleton";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
const Index = () => {
  const { data: ticket, status } = QfindTicket();

  return (
    <div>
      <Carousel />
      <div className="container mx-auto py-5">
        <div className="flex w-full justify-end">
          <form>
            <div className="relative">
              <div className="black pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[20px]">
                <LuSearch />
              </div>
              <input
                type="text"
                className="block w-80 rounded-full border-2 border-gray-300 bg-gray-50 px-6 py-3.5 pl-10 text-[14px] text-black transition hover:border-secondColors hover:duration-500 focus:outline-none"
                placeholder="Search Events..."
              />
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto mb-2 grid grid-cols-2 items-center justify-center gap-5 pb-10 lg:grid-cols-5">
        {status === "pending" ? (
          <SkeletonCard total={5} />
        ) : ticket.length > 0 ? (
          ticket?.map((item: Ticket, index: number) => (
            <div key={index}>
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
          ))
        ) : (
          <p>sd</p>
        )}
      </div>
    </div>
  );
};

export default Index;
