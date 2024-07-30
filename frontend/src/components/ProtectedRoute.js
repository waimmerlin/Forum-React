import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Cookies from "js-cookie"
import Spinner from './Spinner';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, refreshToken, removeUser } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  
  if (Cookies.get('Refresh_token')) {
    Cookies.get('Access_token') ?? refreshToken();
  } else {
    removeUser()
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export const ProtectedRouteForAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/" />;
};