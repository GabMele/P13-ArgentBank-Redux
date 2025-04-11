// src/components/Footer/Footer.jsx
/**
 * Footer component renders the footer section of the application.
 * 
 * This includes:
 * - A paragraph displaying the copyright text.
 * - The footer is styled using `Footer.module.scss`.
 */
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Copyright 2020 Argent Bank</p>
    </footer>
  );
};

export default Footer;
