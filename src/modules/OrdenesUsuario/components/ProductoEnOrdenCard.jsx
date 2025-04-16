export default function ProductoEnOrdenCard({ producto }) {
    if (!producto) return null; // 🧱 protección básica
  
    const {
        imagen,
        nombreProducto,
        vendedor, 
        estado,
        productoId,
      } = producto;
  
    return (
      <div className="card p-2 mb-2 d-flex flex-row align-items-center">
        <img
          src={imagen}
          alt={nombreProducto}
          className="rounded me-3"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1">{nombreProducto}</h6>
          <p className="mb-1 text-muted small">Vendedor: {vendedor}</p>
          <span className="badge bg-secondary text-dark">{estado}</span>
        </div>
        <div>
          <a
            href={`/producto/${productoId}`}
            className="btn btn-outline-primary btn-sm"
          >
            Ver producto
          </a>
        </div>
      </div>
    );
  }
  