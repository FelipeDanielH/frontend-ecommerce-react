import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import InfoPersonal from "./InfoPersonal";
import DatosCuenta from "./DatosCuenta";
import Compras from "./Compras";
import { useAuth } from "../../../context/authContext";

export default function PerfilPage() {
    const location = useLocation();
    const [seccion, setSeccion] = useState(location.state?.seccion || "info");

    const { user } = useAuth();

    const renderContenido = () => {
        switch (seccion) {
            case "info": return <InfoPersonal />;
            case "cuenta": return <DatosCuenta />;
            case "compras": return <Compras />;
            default: return <InfoPersonal />;
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar setSeccion={setSeccion} seccion={seccion} tipoUsuario={user?.tipo} />
                </div>
                <div className="col-md-9">
                    {renderContenido()}
                </div>
            </div>
        </div>
    );
}
