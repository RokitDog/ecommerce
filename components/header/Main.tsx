import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import Logo from '../../public/logo.png';
import {RiSearch2Line} from 'react-icons/ri';
import {FaOpencart} from 'react-icons/fa';
import {useSelector} from 'react-redux';

function Main() {
  const {cart} = useSelector(state => ({...state}));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <Image alt="logo" src={Logo} />
        </Link>
        <div className={styles.search}>
          <input type="search" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>{cart.length}</span>
        </Link>
      </div>
    </div>
  );
}

export default Main;
