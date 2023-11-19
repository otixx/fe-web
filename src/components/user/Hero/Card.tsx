import { Link } from "react-router-dom";

interface cardProps {
  image: any;
  title: string;
  date: string;
  price: string;
  location: string;
  id: string;
}
const Card = ({ image, title, date, price, location, id }: cardProps) => {
  return (
    <>
      <Link to={`/detail/${id}`}>
        <div className="flex flex-col gap-2 hover:scale-105 transition ease-in-out cursor-pointer">
          <div className="border-2 shadow-lg rounded-xl truncate">
            <div className="w-full h-full">
              <img className=" rounded-t-lg" src={image} alt="" />
            </div>
            <h1 className="px-4 pt-5 lg:font-bold font-bold text-sm">
              {title}
            </h1>
            <p className="px-4 pt-3 lg:text-[14px] font-medium  text-[12px] text-gray-500">
              {date}
            </p>
            <div className="flex px-4 py-1 gap-2 flex-row">
              <p className="font-semibold text-xs lg:text-base">{price}</p>
              {/* <s>
                <p className="font-normal text-red-400 text-[10px] lg:text-base">
                  asdasdadada
                </p>
              </s> */}
            </div>
            <div className="py-4 px-2">
              <hr />
            </div>
            <p className="px-4 pb-4 font-bold text-xs lg:text-base">
              {location}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
