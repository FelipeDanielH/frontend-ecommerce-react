import { useOrdenesUsuario } from "../../OrdenesUsuario/hooks/useOrdenesUsuario";
import OrdenCard from "../../OrdenesUsuario/components/OrdenCard";

export default function Compras() {
  const { activas, historial, loading } = useOrdenesUsuario();

  if (loading) return <p>Cargando compras...</p>;

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-center">Mis compras</h4>

      {activas.length > 0 ? (
        activas
          .slice()
          .reverse()
          .map((orden) => <OrdenCard key={orden.id} orden={orden} />)
      ) : (
        <p className="text-muted text-center">No tienes compras activas.</p>
      )}

      {historial.length > 0 && (
        <>
          <hr className="my-4" />
          <h5 className="mb-3">Historial de compras</h5>
          {historial
            .slice()
            .reverse()
            .map((orden) => <OrdenCard key={orden.id} orden={orden} />)}
        </>
      )}
    </div>
  );
}