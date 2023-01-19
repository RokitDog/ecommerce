import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from 'swiper';
import Image from 'next/image';
import img1 from '../../../../public/images/swiper/1.jpg';
import img2 from '../../../../public/images/swiper/2.jpg';
import img3 from '../../../../public/images/swiper/3.jpg';
import img4 from '../../../../public/images/swiper/4.jpg';
import img5 from '../../../../public/images/swiper/5.jpg';
import img6 from '../../../../public/images/swiper/6.jpg';
import img7 from '../../../../public/images/swiper/7.jpg';
import img8 from '../../../../public/images/swiper/8.jpg';
import img9 from '../../../../public/images/swiper/9.jpg';
import img10 from '../../../../public/images/swiper/10.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function swiper() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image src={image} alt="swiper-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default swiper;
