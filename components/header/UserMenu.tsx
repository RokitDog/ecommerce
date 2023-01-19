import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import {useSession, signOut, signIn} from 'next-auth/react';

function UserMenu() {
  const {data: session} = useSession();
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay!</h4>
      {session ? (
        <div className={styles.flex}>
          <Image
            src={session.user.image}
            alt="user-image"
            width={40}
            height={40}
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sign Out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button onClick={() => signIn()} className={styles.btn_outlined}>
            Login
          </button>
        </div>
      )}

      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
