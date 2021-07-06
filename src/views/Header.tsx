import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

import Searchbar from './Searchbar';


function Header() {
  return (
    <header id={styles.header}>
      <nav id={styles.nav}>
        <Link to='/'>Home</Link>
        <Link to='/library'>Library</Link>
        <Link to='/account'>Account</Link>
      </nav>
      <Searchbar />
    </header>
  );
}

export default Header;
