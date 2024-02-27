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
import Container from './container';

export const Slider = () => {
  return (
    <section className="pb-5 pt-3">
      <Container>
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
              src={'/offers/2.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/offers/3.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/offers/4.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Image
              src={'/offers/2.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/offers/3.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={'/offers/4.jpg'}
              width={1300}
              height={300}
              alt="1"
              className="h-96 w-full object-cover"
            />
          </SwiperSlide> */}
        </Swiper>
      </Container>
    </section>
  );
};
