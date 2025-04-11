/**
 * PrivateRoute component for protecting authenticated routes.
 * 
 * Uses handleAuthStorage to check auth status and either:
 * - Renders children if authenticated
 * - Redirects to sign-in if not authenticated
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Components to render when auth
 * @returns {React.ReactElement} Children or redirect to sign-in
 */
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import handleAuthStorage from '@/utils/handleAuthStorage'; 

const PrivateRoute = ({ children }) => {
  const isAuthenticated = handleAuthStorage.getToken();

  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;