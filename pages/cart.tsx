import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import {GetServerSideProps} from 'next';
import {countryProps} from '../typings';

export default function Cart({country}: countryProps) {
  return (
    <div>
      <Header country={country} />
      <Footer country={country} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let data = await axios
    .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_KEY}`)
    .then(res => res.data.location.country)
    .catch(error => console.log(error));

  return {
    props: {
      country: {name: data.name, flag: data.flag.emojitwo},
    },
  };
};
