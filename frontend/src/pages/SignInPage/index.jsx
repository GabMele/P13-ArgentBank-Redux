// src/pages/SignInPage/index.jsx

/**
 * The SignInPage component handles the user login functionality.
 * It allows users to enter their email and password and submit the form;
 * it manage authentication via Redux. The component provides feedback
 * during the sign-in process and displays an error message if authentication fails.
 * 
 * It uses React's state management for form fields, error handling, and conditionally
 * rendering a loading message or the sign-in button text.
 * 
 * When the user successfully signs in, they are redirected to the dashboard.
 * 
 * @component
 * @returns {JSX.Element} The SignInPage component with form and error handling.
 */

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
    rememberMe: false 
  });
  const [showError, setShowError] = useState(false);

  // Effect to handle navigation upon successful user login
  useEffect(() => {
    if (user && !loading) {
      console.debug('✅ SignInPage useEffect: User updated: ', user);
      navigate('/dashboard'); // Redirect to the dashboard on successful login
      console.debug('✅ SignInPage useEffect: NAVIGATE to /dashboard');
    }
  }, [user, loading, navigate]);

  // Effect to display error message when an error occurs
  useEffect(() => {
    if (error) {
      setShowError(true); // Show error when it occurs
    }
  }, [error]);

  // Handle changes in the form fields (email, password, rememberMe)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Handle form submission and dispatch login action
  const handleSubmit = (e) => {
    e.preventDefault();
    console.debug('Signin dispatch loginUser with Credentials:', credentials);
    dispatch(loginUser(credentials)); // Dispatch the login action with form data
  };

  // Handle error dismissal when the user clicks "OK, understood"
  const handleDismissError = () => {
    setShowError(false); // Dismiss the error message
  };

  return (
    <section className={styles.signInContainer}>

      {/* Icon for the sign-in page */}
      <FontAwesomeIcon icon={faUserCircle} size={40} className={styles.signInIcon} />

      <h1>Sign In</h1>

      {/* Conditionally render error message */}
      {showError && error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={handleDismissError}>OK, understood</button>
        </div>
      )}

      {/* Sign-in form */}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
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

        {/* Sign-in button */}
        <button type="submit" className={styles.signInButton} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default SignInPage;
