import styles from './styles.module.scss';
import Image from 'next/image';
import Visa from '../../public/images/payment/visa.webp';
import Mastercard from '../../public/images/payment/mastercard.webp';
import Paypal from '../../public/images/payment/paypal.webp';

function Payments() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <Image alt="visa" src={Visa} />
        <Image alt="mastercard" src={Mastercard} />
        <Image alt="paypal" src={Paypal} />
      </div>
    </div>
  );
}

export default Payments;
