import {BsArrowRightCircle} from 'react-icons/bs';
import styles from './styles.module.scss';
import {useMediaQuery} from 'react-responsive';

type Props = {
  header: string;
  products: {
    image?: string;
    price?: string;
  }[];
  background: string;
};

function Category({header, products, background}: Props) {
  const isMedium = useMediaQuery({query: '(max-width:1300px)'});
  const isMobile = useMediaQuery({query: '(max-width:550px)'});

  return (
    <div className={styles.category} style={{background}}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map(product => (
          <div className={styles.product} key={product.image}>
            <img src={product.image} alt="product-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
