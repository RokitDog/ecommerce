import axios from 'axios';
import {Db} from 'mongodb';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Category from '../../models/Category';
import Product, {ProductTypes} from '../../models/Product';
import styles from '../../styles/product.module.scss';
import {countryProps} from '../../typings';
import {connectDb, disconnectDb} from '../../utils/db';

interface Props extends countryProps {
  product: ProductTypes;
}

function productPage({product, country}: Props) {
  return (
    <>
      <Head>
        <title>Shoppay - {product.name}</title>
      </Head>
      <Header country={country} />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories?.map(sub => (
              <span key={sub.name}>/ {sub.name}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export default productPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const {query} = context;
  const slug = query.slug;
  const style = query.style?.toString() || '1';
  const size = query.size || 0;

  connectDb();

  let product: ProductTypes = await Product.findOne({slug})
    .populate({path: 'category', model: Category})
    .lean();
  let subProduct = product.subProducts[Number(style)];
  let prices = subProduct.sizes
    .map(s => s.price)
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }

      if (a < b) {
        return -1;
      }
      return 0;
    });

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map(p => p.color),
    priceRange: prices.length > 1 ? `From ${prices[0]} to ${prices[prices.length - 1]}}` : '',
    price:
      subProduct.discount > 0
        ? Number(subProduct.sizes[Number(size)].price) -
          Number(
            (Number(subProduct.sizes[Number(size)].price) / Number(subProduct.discount)).toFixed(2)
          )
        : subProduct.sizes[Number(size)].price,
    priceBefore: subProduct.sizes[Number(size)].price,
    quantity: subProduct.sizes[Number(size)].qty,
  };

  disconnectDb();

  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_KEY}`)
    .then(res => res.data.location.country)
    .catch(error => console.log(error));

  return {
    props: {
      country: {name: data.name, flag: data.flag.emojitwo},
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
};
