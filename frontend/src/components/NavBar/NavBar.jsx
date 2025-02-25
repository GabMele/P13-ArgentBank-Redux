import styles from './NavBar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logoutUser } from '@/store/authThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '@/assets/argentBankLogo.png';
import { fetchUserProfile } from '../../store/authThunks';

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchUserProfile());
    }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className={styles.mainNav}>
      <Link className={styles.mainNavLogo} to="/">
        <img className={styles.mainNavLogoImage} src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <Link className={styles.mainNavItem} to="/profile">
              <FontAwesomeIcon icon={faUserCircle} /> {user.name}
            </Link>
            <button className={styles.mainNavItem} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
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
};

export default NavBar;
