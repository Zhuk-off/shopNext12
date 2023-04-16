import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cube';
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCube,
  EffectCards,
} from 'swiper';
import Image from 'next/image';

export const Slider = () => {
  return (
    <section className="pb-5 pt-3">
      <div className="container mx-auto max-w-7xl px-4">
        <Swiper
          speed={1000}
          effect={'cube'}
          grabCursor={true}
          loop={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          //   pauseOnMouseEnter: true,
          // }}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          navigation={true}
          pagination={true}
          modules={[EffectCube, Pagination, Autoplay, Navigation, EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image
              src={'/slider/1.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/slider/2.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/slider/3.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/slider/4.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/slider/5.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/slider/6.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
