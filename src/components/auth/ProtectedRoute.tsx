import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }: any) => {
  const auth = useSelector((state: any) => state.auth.user);

  if (!auth) return <Navigate to="/login" replace />;

  if (role && auth.user && auth.user.role?.type !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
