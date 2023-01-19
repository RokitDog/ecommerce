import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import {GetServerSideProps} from 'next';
import {countryProps} from '../typings';
import styles from '../styles/Home.module.scss';
import Main from '../components/home/main';
import FlashDeals from '../components/home/main/flashDeals';
import Category from '../components/home/category/index';
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from '../data/home';
import {useMediaQuery} from 'react-responsive';
import ProductsSwiper from '../components/productsSwiper';
import {connectDb} from '../utils/db';
import Product, {ProductTypes} from '../models/Product';
import ProductCard from '../components/productCard';

interface Props extends countryProps {
  products: ProductTypes[];
}

export default function Home({country, products}: Props) {
  const isMedium = useMediaQuery({query: '(max-width:850px)'});
  const isMobile = useMediaQuery({query: '(max-width:550px)'});

  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category header="Dresses" products={women_dresses} background="#5a31f4" />
            {!isMedium && <Category header="Shoes" products={women_shoes} background="#3c811f" />}
            {isMobile && <Category header="Shoes" products={women_shoes} background="#3c811f" />}
            <Category header="Accessories" products={women_accessories} background="#000" />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper products={gamingSwiper} header="For Gamers" bg="#2f82ff" />
          <ProductsSwiper products={homeImprovSwiper} header="House Improvements" bg="#5a31f4" />

          <div className={styles.products}>
            {products.map((product, id) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  connectDb();
  let products: ProductTypes = await Product.find()
    .sort({createdAt: -1})
    .lean();

  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_KEY}`)
    .then(res => res.data.location.country)
    .catch(error => console.log(error));

  return {
    props: {
      country: {name: data.name, flag: data.flag.emojitwo},
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
