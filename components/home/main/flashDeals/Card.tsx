import Link from 'next/link';
import styles from './styles.module.scss';
import {MdFlashOn} from 'react-icons/md';

type Props = {
  product: {
    image: string;
    price: string;
    discount: string;
    link: string;
    sold: string;
  };
};

export default function FlashCard({product}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="product-image" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__price}>
        <span>
          USD{(Number(product.price) - Number(product.price) / Number(product.discount)).toFixed(2)}
          $
        </span>
        <span>
          -USD
          {(
            Number(product.price) -
            (Number(product.price) - Number(product.price) / Number(product.discount))
          ).toFixed(2)}
          $
        </span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{width: '75%'}}></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  );
}
