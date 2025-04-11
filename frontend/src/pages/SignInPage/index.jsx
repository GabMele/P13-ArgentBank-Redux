// src/pages/SignInPage/index.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authThunks';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '', 
    rememberMe: false });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      console.debug('✅ SignInPage useEffect: User updated: ', user);
      navigate('/dashboard');
      console.debug('✅ SignInPage useEffect: NAVIGATE to /dashboard');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (error) {
      setShowError(true); // Show error when it occurs
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.debug('Signin dispatch loginUser with Credentials:', credentials);
    dispatch(loginUser(credentials));
  };

  const handleDismissError = () => {
    setShowError(false); // Dismiss the error message
  };

  return (
    <section className={styles.signInContainer}>

      <FontAwesomeIcon icon={faUserCircle} size={40} className={styles.signInIcon} />

      <h1>Sign In</h1>
      {showError && error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={handleDismissError}>OK, understood</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.username}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <div className={styles.inputRemember}>
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={credentials.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button type="submit" className={styles.signInButton} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default SignInPage;
