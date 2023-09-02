import { Carousel as CarouselAntd } from 'antd';
interface Dataslide {
    id: number,
    imageUrl: string
}
const dataSlide: Array<Dataslide> = [
    {
        id: 1,
        imageUrl: 'https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1688307238_rJo0og.jpg',
    },
    {
        id: 2,
        imageUrl: 'https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1687933053_LzkDZx.jpg',
    },
    {
        id: 3,
        imageUrl: 'https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1688712460_XMK9vp.png',
    },
];
const Carousel = () => {
    return (
        <div className='container mx-auto'>
            <CarouselAntd className='mt-10 p-4 flex justify-center' autoplay>
                {dataSlide.map((slide) => (
                    <div key={slide?.id} className="h-44 lg:h-auto rounded-xl overflow-hidden">
                        <img
                            src={slide?.imageUrl}
                            alt={` ${slide?.id}`}
                            className="object-cover w-full h-full lg:h-1/2"
                        />
                    </div>
                ))}
            </CarouselAntd>
        </div>
    )
}

export default Carousel