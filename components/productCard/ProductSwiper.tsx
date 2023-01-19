import styles from './styles.module.scss';
import {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay} from 'swiper';
import {useEffect} from 'react';

type Props = {
  images: {
    url: string;
    public_url: string;
  }[];
};
export default function ProductSwiper({images}: Props) {
  const swiperRef = useRef(null) as any;
  console.log(images);
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);
  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{delay: 500, stopOnLastSlide: false}}
        speed={500}
        modules={[Autoplay]}
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.public_url}>
            <img src={img.url} alt="product-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
