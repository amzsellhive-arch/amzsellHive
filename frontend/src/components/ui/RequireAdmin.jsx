import { Navigate, useLocation } from 'react-router-dom';

/**
 * Guards admin-only routes. If there is no admin token stored locally,
 * redirects the user to /admin/login (preserving the intended destination).
 */
export default function RequireAdmin({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
