import styles from './styles.module.scss';
import Ad from './Ad';
import Top from './Top';
import Main from './Main';
import {countryProps} from '../../typings';

function Header({country}: countryProps) {
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={country} />
      <Main />
    </header>
  );
}

export default Header;
