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
import {
  GalleryImage,
  ImageProduct,
} from '../interfaces/apollo/productPage.interface';

export const SliderProductPage = ({
  coverImage,
  images,
}: {
  coverImage: ImageProduct;
  images: GalleryImage[];
}) => {
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
            <div className="h-full w-full bg-white">
              <Image
                src={coverImage?.sourceUrl}
                width={1300}
                height={300}
                alt={coverImage?.altText}
                className="h-96 w-full object-contain "
              />
            </div>
          </SwiperSlide>
          {images
            ? images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full bg-white px-6">
                    <Image
                      src={image?.node?.sourceUrl}
                      width={1300}
                      height={300}
                      alt={image?.node?.altText}
                      className="h-96 w-full object-contain "
                    />
                  </div>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </Container>
    </section>
  );
};
