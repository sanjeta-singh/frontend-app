import { Navigate, useLocation } from 'react-router-dom';

const ProtectedDashboard = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  if (!location.state?.fromDoctors) {
    return <Navigate to="/hospitals" replace />;
  }
  
  return children;
};

export default ProtectedDashboard;