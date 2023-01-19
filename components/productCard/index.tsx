import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ProductTypes} from '../../models/Product';
import ProductSwiper from './ProductSwiper';
import styles from './styles.module.scss';

type Props = {
  product: ProductTypes;
};

function ProductCard({product}: Props) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active].images);
  const [prices, setPrices] = useState(
    product.subProducts![active].sizes.map(size => {
      return size.price;
    })
  ).sort((a, b) => {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }
    return 0;
  });
  const [styless, setStyless] = useState(product.subProducts.map(p => p.color));
  console.log(styless);

  useEffect(() => {
    setImages(product.subProducts![active].images);
    setPrices(
      product
        .subProducts![active].sizes.map(size => {
          return size.price;
        })
        .sort((a, b) => {
          if (a > b) {
            return 1;
          }

          if (a < b) {
            return -1;
          }
          return 0;
        })
    );
  }, [active]);

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active + 1}`}>
          <div>
            <ProductSwiper images={images} />
          </div>
          {product.subProducts[active].discount ? (
            <div className={styles.product__discount}>
              -{product.subProducts[active].discount.toString()}%
            </div>
          ) : (
            ''
          )}
          <div className={styles.product__infos}>
            <h1>
              {product.name.length > 45 ? `${product.name.substring(0, 45)}...` : product.name}
            </h1>
            <span>
              {prices.length === 1
                ? `USD${prices[0]}$`
                : `USD${prices[0]}-${prices[prices.length - 1]}$`}
            </span>
            <div className={styles.product__colors}>
              {styless &&
                styless.map((style, i) =>
                  style.image ? (
                    <img
                      src={style.image}
                      key={i}
                      className={i === active ? styles.active : ''}
                      alt="product-image"
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                    />
                  ) : (
                    <span
                      key={style.color}
                      style={{backgroundColor: `${style.color}`}}
                      onMouseOver={() => {
                        setImages(product.subProducts[i].images);
                        setActive(i);
                      }}
                    ></span>
                  )
                )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
