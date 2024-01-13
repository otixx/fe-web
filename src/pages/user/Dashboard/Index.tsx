import { QfindTicket } from "@/service/ticket/ticket.service";
import { LuSearch } from "react-icons/lu";
import dayjs from "dayjs";
import { FormatDayjs } from "@/shared/dayjs/format";
import { ITicketData } from "@/utils/interface/ticket.interface";
import SkeletonCard from "@/components/Skeleton";
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import Notfound from "@/components/Notfound";
const Index = () => {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");

  const [ticket, setTiket] = useState({} as ITicketData);

  const fetchData = async () => {
    const res = await QfindTicket({
      url: query.length >= 4 ? url : "",
      key: query.length >= 4 ? query : undefined,
    });
    setTiket(res);
  };

  useEffect(() => {
    if (query.length >= 4) {
      const delay = setTimeout(() => {
        fetchData();
      }, 1000);
      return () => clearTimeout(delay);
    } else {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <Carousel />
      <div className="container mx-auto py-5">
        <div className="flex w-full justify-end px-4 lg:px-0">
          <form
            onSubmit={(e) => {
              return e.preventDefault();
            }}
          >
            <div className="relative">
              <div className="black pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[20px]">
                <LuSearch />
              </div>
              <input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value), setUrl("/search");
                }}
                className="block w-80 rounded-full border-2 border-gray-300 bg-gray-50 px-6 py-3.5 pl-10 text-[14px] text-black transition hover:border-secondColors hover:duration-500 focus:outline-none"
                placeholder="Masukkan min 4 karakter.."
              />
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto mb-2 grid grid-cols-2 items-center justify-center gap-5  px-4 pb-10 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {ticket && ticket?.data ? (
          ticket?.data?.length > 0 ? (
            ticket?.data?.map((item, index: number) => (
              <div key={index}>
                <Card
                  image={JSON.parse(item?.image_url)["url"]}
                  title={item?.nama_kegiatan}
                  tags={item?.tags}
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
            <div className="col-span-12">
              <Notfound
                title="Event tidak ada"
                description="Maaf sepertinya keyword yang anda masukkan tidak ada"
              />
            </div>
          )
        ) : (
          <SkeletonCard total={5} />
        )}
      </div>
    </div>
  );
};

export default Index;
