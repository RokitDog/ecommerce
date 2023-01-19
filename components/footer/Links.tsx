import styles from './styles.module.scss';
import Link from 'next/link';
import Logo from '../../public/logo.png';
import Image from 'next/image';

function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={link.heading}>
          {i === 0 ? <Image alt="logo" src={Logo} /> : <b>{link.heading}</b>}
          {link.links.map((link, i) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

type LinkTypes = {
  heading: string;
  links: {name: string; link: string}[];
};

const links: LinkTypes[] = [
  {
    heading: 'SHOPPAY',
    links: [
      {
        name: 'About us',
        link: '',
      },
      {
        name: 'Contact us',
        link: '',
      },
      {
        name: 'Social Responsibility',
        link: '',
      },
      {
        name: '',
        link: '',
      },
    ],
  },
  {
    heading: 'HELP & SUPPORT',
    links: [
      {
        name: 'Shipping Info',
        link: '',
      },
      {
        name: 'Returns',
        link: '',
      },
      {
        name: 'How To Order',
        link: '',
      },
      {
        name: 'How To Track',
        link: '',
      },
      {
        name: 'Size Guide',
        link: '',
      },
    ],
  },
  {
    heading: 'Customer service',
    links: [
      {
        name: 'Customer service',
        link: '',
      },
      {
        name: 'Terms and Conditions',
        link: '',
      },
      {
        name: 'Consumers (Transactions)',
        link: '',
      },
      {
        name: 'Take our feedback survey',
        link: '',
      },
    ],
  },
];

export default Links;
