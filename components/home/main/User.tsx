import styles from './styles.module.scss';
import img1 from '../../../public/images/userheader.jpg';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {IoSettingsOutline} from 'react-icons/io5';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {AiOutlineMessage} from 'react-icons/ai';
import {BsHeart} from 'react-icons/bs';
import newMarker from '../../../public/images/new.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards, Navigation} from 'swiper';
import {userSwiperArray} from '../../../data/home';

import 'swiper/css';
import 'swiper/css/effect-cards';

function User() {
  const {data: session} = useSession();
  return (
    <div className={styles.user}>
      <Image src={img1} alt="image" />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image src={session.user.image} alt="user-image" width={100} height={100} />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              src="https://res.cloudinary.com/dnkc0hbix/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1673365394/pngegg_yqtset.jpg"
              alt="user-image"
              width={100}
              height={100}
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Image src={newMarker} alt="new-marker" className={styles.new} />
          <Swiper
            effect={'cards'}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: '180px',
              height: '240px',
              marginTop: '1rem',
            }}
          >
            {userSwiperArray.map(item => (
              <SwiperSlide key={item.image}>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default User;
