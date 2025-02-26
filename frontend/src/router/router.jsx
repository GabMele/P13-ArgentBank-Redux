import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/MainLayout/MainLayout';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/SignInPage';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Dashboard from '../components/Dashboard/Dashboard';

function AppRouter() {
  const user = useSelector((state) => state.user?.user);

  return (
    <Router>
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
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
