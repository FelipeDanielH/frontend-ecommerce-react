import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import PerfilPage from "../pages/PerfilPage";

export default function PerfilRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <PerfilPage />;
}
