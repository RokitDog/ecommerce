import styles from './styles.module.scss';
import Link from 'next/link';

function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styles.flex}>
        <input type="email" name="email" id="email" placeholder="Your Email Address" />
        <button className={styles.btn_primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{' '}
        <Link href="/">ourPrivacy & Cookie Policy</Link>
      </p>
    </div>
  );
}

export default NewsLetter;
