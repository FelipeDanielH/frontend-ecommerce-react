export default function CrearProducto() {
    return (
      <div>
        <h4>Publicar Nuevo Producto</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre del producto</label>
            <input className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input type="number" className="form-control" />
          </div>
          <button className="btn btn-primary">Publicar</button>
        </form>
      </div>
    );
  }
  