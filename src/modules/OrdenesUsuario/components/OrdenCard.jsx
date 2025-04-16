import ProductoEnOrdenCard from "./ProductoEnOrdenCard";

export default function OrdenCard({ orden }) {

    console.log({ orden });
    return (
        <div className="card mb-4 shadow-sm p-3">
            <h6 className="fw-bold mb-2">Orden: #{orden.id}</h6>
            <span
                className={`badge bg-${orden.estado === "ENTREGADO" ? "success" : "warning"} text-dark mb-3 px-2 py-1`}
                style={{ width: "fit-content", minWidth: "auto" }}
            >
                {orden.estado}
            </span>

            {orden.productos
                ?.filter(Boolean)
                .map((prod, i) => (
                    console.log(prod),
                    <ProductoEnOrdenCard key={prod.id || i} producto={prod} />
                ))}
        </div>
    );
}
