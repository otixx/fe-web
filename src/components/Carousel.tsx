import { TDataSlide } from "@/types/carousel.types";
import { Carousel as CarouselAntd } from "antd";

const dataSlide: TDataSlide[] = [
  {
    id: 1,
    imageUrl:
      "https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1688307238_rJo0og.jpg",
  },
  {
    id: 2,
    imageUrl:
      "https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1687933053_LzkDZx.jpg",
  },
  {
    id: 3,
    imageUrl:
      "https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1688712460_XMK9vp.png",
  },
];

const Carousel = () => {
  return (
    <div className="container mx-auto mt-10 overflow-hidden px-4 lg:px-0">
      <CarouselAntd dotPosition="bottom" effect="fade" autoplay>
        {dataSlide.map((slide) => (
          <div key={slide?.id} className="h-44 overflow-hidden lg:h-auto">
            <img
              src={slide?.imageUrl}
              alt={` ${slide?.id}`}
              className="h-full w-full rounded-2xl  object-cover lg:h-1/2"
            />
          </div>
        ))}
      </CarouselAntd>
    </div>
  );
};

export default Carousel;
