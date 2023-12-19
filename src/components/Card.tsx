import { ICardProps } from "@/interface/card.interface";
import { Link } from "react-router-dom";
const Card = ({ image, title, date, price, location, id }: ICardProps) => {
  return (
    <>
      <Link to={`/detail/${id}`}>
        <div className="flex w-auto cursor-pointer flex-col">
          <div className="truncate rounded-xl shadow-lg">
            <div className="h-64 w-full">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                src={image}
                alt="imgEvent"
              />
            </div>
            <h1 className="px-4 pt-5 text-sm font-bold text-mainColors lg:font-bold">
              {title}
            </h1>
            <p className="px-4 pt-3 text-[12px] font-medium  text-gray-500 lg:text-[14px]">
              {date}
            </p>
            <div className="flex flex-row gap-2 px-4 py-1">
              <p className="text-xs font-semibold lg:text-base">{price}</p>
            </div>
            <div className="px-2 py-4">
              <hr />
            </div>
            <p className="px-4 pb-4 text-xs font-bold lg:text-base">
              {location}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
