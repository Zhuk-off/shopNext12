import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import { Pagination, Navigation, Autoplay, Mousewheel } from 'swiper';
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
    <section className="select-none">
      <Container>
        <Swiper
          speed={300}
          effect={'slide'}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          mousewheel
          navigation={true}
          pagination={true}
          modules={[Pagination, Autoplay, Navigation, Mousewheel]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="h-full w-full bg-white">
              <Image
                src={coverImage?.sourceUrl}
                width={700}
                height={400}
                alt={coverImage?.altText}
                className="h-96 w-full object-contain "
              />
            </div>
          </SwiperSlide>
          {images
            ? images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full bg-white">
                    <Image
                      src={image?.node?.sourceUrl}
                      width={700}
                      height={400}
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
