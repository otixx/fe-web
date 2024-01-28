import { dataSlide } from "@/shared/tempData";
import { Carousel as CarouselAntd } from "antd";

const Carousel = () => {
  return (
    <div className="container mx-auto mt-10 overflow-hidden px-4 lg:px-0">
      <CarouselAntd dotPosition="bottom" effect="fade" autoplay>
        {dataSlide.map((slide) => (
          <div
            key={slide?.id}
            className="overflow-hidden md:h-60 lg:h-60 lg:px-4"
          >
            <img
              src={slide?.imageUrl}
              alt={` ${slide?.id}`}
              className="h-full w-full rounded-2xl  object-cover xl:h-60"
            />
          </div>
        ))}
      </CarouselAntd>
    </div>
  );
};

export default Carousel;
