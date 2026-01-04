import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: any) => state.auth.user);

  if (auth) {
    const roleType = auth.user?.role?.type;

    return roleType === "admin"
      ? <Navigate to="/Adashboard" replace />
      : <Navigate to="/" replace />;
  }

  return children;
};



export default GuestRoute;
