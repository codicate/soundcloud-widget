import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

import Searchbar from './Searchbar';


const HeaderNavLink = ({
  to,
  text,
}: {
  to: string;
  text: string;
}) => (
  <NavLink exact activeClassName={styles.activeLink} to={to}>
    {text}
  </NavLink>
);

const Header = () => {
  return (
    <header id={styles.header}>
      <nav id={styles.nav}>
        <HeaderNavLink to='/' text='Home' />
        <HeaderNavLink to='/library' text='Library' />
        <HeaderNavLink to='/account' text='Account' />
      </nav>
      <Searchbar />
    </header>
  );
};

export default Header;
