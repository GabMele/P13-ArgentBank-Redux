// src/router/index.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Profile from '@/components/Profile/Profile';
import SignInPage from '@/pages/SignInPage';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default AppRouter;
