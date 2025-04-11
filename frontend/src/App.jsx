// src/App.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './store/authThunks';
import AppRouter from '@/router/router';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user?.user);

  console.debug("App token:", token);
  console.debug("App user:", user);
  console.debug("App state:", useSelector((state) => state.user));
  
  // This effect only runs on initial load or refresh to restore session
  useEffect(() => {
    // Only fetch profile on page load/refresh if we have a token but no user data
    if (token && !user) {
      console.debug("✅App useEffect: Restoring session from token, dispatch fetchUserProfile...");
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, user]);  // Empty dependency array - only run once on mount


  return (
    <AppRouter />
  );
}

export default App;