import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure, setLoading } from '@/store/userSlice';  // Import actions
import './SignInPage.module.scss';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();  // Use dispatch to trigger actions
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (you can enhance this)
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Start loading
    dispatch(setLoading());

    // Simulate API call to log in the user
    try {
      // Here you would call your API to sign in the user and get the profile
      const response = { // Simulating a successful response
        data: { 
          email,
          token: 'sample-token',
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      // Dispatch the login success action to store user data in Redux
      dispatch(loginSuccess(response.data));
      
      // Redirect to homepage or any other page
      navigate('/');
    } catch (err) {
      // Dispatch login failure if there's an error
      dispatch(loginFailure(err.message));
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign-in-page">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="sign-in-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
