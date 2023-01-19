import styles from './styles.module.scss';
import Image from 'next/image';
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine, RiArrowDropDownFill} from 'react-icons/ri';
import Link from 'next/link';
import {useState} from 'react';
import UserMenu from './UserMenu';
import {countryProps} from '../../typings';
import {useSession} from 'next-auth/react';

function Top({country}: countryProps) {
  const {data: session} = useSession();
  console.log(session);
  const [visibleMenu, setVisibleMenu] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image alt="country-flag" src={country.flag || ''} width={28} height={28} />
            <span>{country.name || 'Morocco'} / usd</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <div
            className={styles.li}
            onMouseOver={() => setVisibleMenu(true)}
            onMouseLeave={() => setVisibleMenu(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <Image alt="user-image" src={session.user.image} width={28} height={28} />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visibleMenu && <UserMenu />}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Top;
