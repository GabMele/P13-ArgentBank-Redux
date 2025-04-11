// src/components/NavBar/NavBar.jsx
/**
 * NavBar component displays the navigation bar of the application.
 * 
 * It includes:
 * - The logo linking to the home page.
 * - A link to the user's profile page if the user is logged in.
 * - A sign-out button that logs out the user.
 * - A sign-in link if the user is not logged in.
 *
 * It uses React Router for navigation and Redux for managing the user's
 * authentication state.
 */
import React from 'react';
import styles from './NavBar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '@/assets/argentBankLogo.png';

const NavBar = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  /**
   * Handles the user logout process by dispatching the `logoutUser` action.
   * After logging out, the user is navigated back to the home page.
   *
   * The `unwrap` method is used to handle the action result directly, 
   * allowing us to easily handle both the fulfilled and rejected states 
   * of the `logoutUser` action. If the action is fulfilled, the logout 
   * process continues, otherwise, we can handle any errors.
   */
  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    navigate('/');
  };

  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} to="/">
        <img className={styles.mainNavLogoImage} src={argentBankLogo} 
          alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <Link className={styles.mainNavItem} to="/profilepage">
              <FontAwesomeIcon icon={faUserCircle} /> {user.firstName}
            </Link>
            <button className={styles.mainNavItem} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
            </button>
          </>
        ) : (
          <Link className={styles.mainNavItem} to="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
