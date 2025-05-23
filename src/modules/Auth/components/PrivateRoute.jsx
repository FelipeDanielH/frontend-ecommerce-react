// src/features/auth/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
