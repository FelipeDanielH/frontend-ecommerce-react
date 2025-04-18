import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onRemove, onCantidadChange }) {
  const [cantidad, setCantidad] = useState(item.qty);
  const [error, setError] = useState(null);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);

  useEffect(() => {
    setCantidad(item.qty); // sincroniza con backend si cambia externamente
    setMostrarActualizar(false); // oculta botón si backend actualiza
  }, [item.qty]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) return;

    if (value > item.stock) {
      setCantidad(item.stock);
      setError(`Solo hay ${item.stock} unidades disponibles`);
      setMostrarActualizar(true);
    } else {
      setCantidad(value);
      setError(null);
      setMostrarActualizar(value !== item.qty);
    }
  };

  const handleActualizar = () => {
    if (cantidad !== item.qty) {
      onCantidadChange(item.id, cantidad);
      setMostrarActualizar(false); // ocultamos el botón
    }
  };

  return (
    <div className="d-flex align-items-start border-bottom py-3">
      <img
        src={item.img}
        alt={item.title}
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        className="me-3 rounded"
      />

      <div className="flex-grow-1">


        <div className="d-flex flex-column">
          <h6 className="mb-3">
            <Link to={`/producto/${item.id}`} className="text-decoration-none">
              {item.title}
            </Link>
          </h6>
          <p className="text-muted mb-1">Stock disponible: <strong>{item.stock}</strong></p>
          <p className="text-muted mb-1">Precio: <strong>{item.price}</strong></p>
        </div>


        <div className="d-flex align-items-top justify-content-end gap-2">
          {mostrarActualizar && (
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleActualizar}
            >
              Actualizar
            </button>
          )}

          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={handleChange}
            className="form-control form-control-sm"
            style={{ width: '60px' }}
          />

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onRemove(item.id)}
          >
            Eliminar
          </button>
        </div>
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
}
