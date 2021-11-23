import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/useAuth";

export default function PrivateRoute({ children }) {
  let user = useAuth();
  let location = useLocation();
  if (user.login) {
    return <Navigate to="/balances" state={{ from: location }} />;
  }

  return children;
}
