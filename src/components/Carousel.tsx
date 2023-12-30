import { dataSlide } from "@/shared/tempData";
import { Carousel as CarouselAntd } from "antd";

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
