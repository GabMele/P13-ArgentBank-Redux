// src/pages/SignInPage/index.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authThunks';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  console.log("user", user);

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/profile');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h2>Sign In</h2>
      
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
