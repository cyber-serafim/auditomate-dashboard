
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, AccessLevel } from '@/contexts/AuthContext';

type PrivateRouteProps = {
  pageName: string;
  requiredAccess?: AccessLevel;
};

export const PrivateRoute = ({ 
  pageName,
  requiredAccess = 'view'
}: PrivateRouteProps) => {
  const { isAuthenticated, hasAccess } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess(pageName, requiredAccess)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
