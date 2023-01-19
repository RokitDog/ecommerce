import styles from './styles.module.scss';
import Links from './Links';
import Socials from './Socials';
import NewsLetter from './NewsLetter';
import Payments from './Payments';
import Copyright from './Copyright';
import {countryProps} from '../../typings';

function Footer({country}: countryProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payments />
        <Copyright country={country} />
      </div>
    </footer>
  );
}

export default Footer;
