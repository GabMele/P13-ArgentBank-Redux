// src/App.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './store/authThunks';
import AppRouter from '@/router/router';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user?.user);

  
  // This effect only runs on initial load or refresh to restore session
  useEffect(() => {
    // Only fetch profile on page load/refresh if we have a token but no user data
    if (token && !user) {
      console.log("✅App useEffect: Restoring session from token, dispatch fetchUserProfile...");
      dispatch(fetchUserProfile());
    }
  }, []);  // Empty dependency array - only run once on mount


  return (
    <AppRouter />
  );
}

export default App;