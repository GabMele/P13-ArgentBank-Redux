/**
/**
 * @file App.jsx
 * @description Root component of the React application. It initializes
 * the main router and restores the user session using a token previously
 * saved in localStorage and rehydrated into the Redux store.
 *
 * This component doesn't reads from localStorage directly. The token is
 * restored via handleAuthStorage in authSlice's initial state.
 *
 * Only the token is persisted between sessions. The user object is
 * not stored in localStorage. On app load or refresh, if a token is
 * available in Redux but the user object is missing, this component
 * dispatches an action to fetch the user profile and complete the
 * session restoration.
 *
 * @module App
 */


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './store/authThunks';
import AppRouter from '@/router/router';

/**
 * Root component of the application.
 * Connects to Redux to manage authentication state and restores the
 * session if needed.
 *
 * @returns {JSX.Element} The main application router wrapped in the
 * App component.
 */
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user?.user);
  const error = useSelector((state) => state.user?.error);

  console.debug("App state token:", token);
  console.debug("App state user:", user);
  console.debug("App state:", useSelector((state) => state.user));
  
  // This effect runs on app load or whenever token/user changes
  useEffect(() => {
    // If we have a token but no user loaded in
    // Redux, we trigger session restoration by fetching the user
    // profile
    if (token && !user) {
      console.debug(
        "✅App useEffect: Restoring session from token, dispatch fetchUserProfile..."
      );
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error);
    }
  }, [error]);

  return (
    <AppRouter />
  );
}

export default App;
