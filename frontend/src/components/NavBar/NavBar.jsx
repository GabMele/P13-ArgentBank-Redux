// src/components/NavBar/NavBar.jsx
import styles from './NavBar.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '@/assets/argentBankLogo.png';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  
  // const token = useSelector((state) => state.user.token);

  //const state = useSelector((state) => state);
  //console.log("Navbar state", state);
  console.log("Navbar state.user :", user);

/*
  useEffect(() => {
    if (!user) {
     dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);
*/

/*
  useEffect(() => {
    // Check both user and token to determine if we need to fetch profile
    if (token && !user) {
      console.log("✅UseEffect: User not found, fetching profile...");
      //console.log("✅UseEffect before despatch: state:", state);
      dispatch(fetchUserProfile());
      console.log("✅UseEffect: Profile fetched.");
      console.log("✅UseEffect: User:", user);
      //console.log("✅UseEffect after dispatch: state:", state);
    }
  }, [dispatch, user, token]);
*/

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap(); 
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
};

export default NavBar;
