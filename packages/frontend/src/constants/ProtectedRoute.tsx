import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { user } = useAuth();

  return <div>{!user ? <Navigate to="/account/login" /> : props.children}</div>;
};

export default ProtectedRoute;
