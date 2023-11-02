import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = (allowedRole) => {
  const { auth } = useAuth();
  
  console.log();
  if (auth.userRole === allowedRole.allowedRole) {
    console.log("aici");
    return <Outlet />;
  } else {
    console.log("aici nu");
    return <Navigate to="/register" />;
  }
};

export default RequireAuth;