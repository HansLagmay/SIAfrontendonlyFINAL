import { Navigate } from 'react-router-dom';
import { getSession, clearSession } from '../../utils/session';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const session = getSession();
  
  if (!session) {
    // Session expired or not logged in
    return <Navigate to="/login?session_expired=true" replace />;
  }

  const user = session.user;
  
  if (!allowedRoles.includes(user.role)) {
    // Wrong role - redirect to appropriate dashboard or login
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
