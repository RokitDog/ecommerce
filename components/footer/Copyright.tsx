import Link from 'next/link';
import styles from './styles.module.scss';
import {IoLocationSharp} from 'react-icons/io5';
import {countryProps} from '../../typings';

export default function Copyright({country}: countryProps) {
  return (
    <div className={styles.footer__copyright}>
      <section>©2023 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map(link => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {country.name || 'Morocco'}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

type dataType = {
  name: string;
  link: string;
};

const data: dataType[] = [
  {
    name: 'Privacy Center',
    link: '',
  },
  {
    name: 'Privacy & Cookie Policy',
    link: '',
  },
  {
    name: 'Manage Cookies',
    link: '',
  },
  {
    name: 'Terms & Conditions',
    link: '',
  },
  {
    name: 'Copyright Notice',
    link: '',
  },
];
