import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('admin') 
  return user ? <Outlet/> : <Navigate to="/" replace />;
};

export default ProtectedRoute;