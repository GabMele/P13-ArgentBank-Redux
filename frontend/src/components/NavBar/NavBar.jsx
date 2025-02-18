// src/components/NavBar/NavBar.jsx

import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '@/assets/argentBankLogo.png';

const NavBar = () => {
  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} to="/">
        <img
          className={styles.mainNavLogoImage}
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className={styles.mainNavItem} to="/sign-in">
          <FontAwesomeIcon icon={faUserCircle} /> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
