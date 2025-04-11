// src/router/router.jsx

/**
 * The AppRouter component handles routing for the application, 
 * including public and private pages. Private routes are protected 
 * using the PrivateRoute component. 
 * 
 * Pages:
 * - HomePage: Public page for users who are not signed in.
 * - SignInPage: Public page for user sign-in.
 * - Dashboard: Protected page for logged-in users.
 * - ProfilePage: Protected page for logged-in users to view/edit their 
 * profile.
 * 
 * The `Outlet` component is used to render nested route components 
 * defined inside the `<MainLayout />`. This enables the layout to be 
 * consistent across different pages while rendering specific content 
 * depending on the route.
 * 
 * @component
 * @returns {JSX.Element} The AppRouter component.
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/MainLayout/MainLayout';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/SignInPage';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Dashboard from '@/components/Dashboard/Dashboard';
import ProfilePage from '@/pages/ProfilePage';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

/**
 * Renders the router with routes for the application.
 * 
 * @returns {JSX.Element} The rendered Router component.
 */
function AppRouter() {
  const user = useSelector((state) => state.user?.user);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={user 
            ? <Navigate to="/dashboard" /> 
            : <HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/profilepage" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
