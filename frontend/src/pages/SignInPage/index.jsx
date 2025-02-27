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
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user && !loading) {
      console.log('✅ SignInPage useEffect: User updated: ', user);
      navigate('/dashboard');
      console.log('✅ SignInPage useEffect: NAVIGATE to /dashboard');
    }
  }, [user, loading,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signin dispatch loginUser with Credentials:', credentials);
    dispatch(loginUser(credentials));
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
            autoComplete="email"
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
            autoComplete="current-password"
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
