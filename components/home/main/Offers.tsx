import styles from './styles.module.scss';
import {offersAarray} from '../../../data/home';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {Pagination, Navigation} from 'swiper';
import Link from 'next/link';

export default function Offers() {
  return (
    <div className={styles.offers}>
      <div className={styles.offers__text}>
        <p>
          use code <b>“MHAJJI”</b> for 30% off all products.
        </p>
        <Link href="/browse">Shop now</Link>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map(offer => (
          <SwiperSlide key={offer.image}>
            <Link href="" className={styles.offerLinks}>
              <img src={offer.image} alt="swiper-image" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
