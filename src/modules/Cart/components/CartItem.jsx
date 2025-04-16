// src/components/CartItem.jsx
import { useState } from 'react';

export default function CartItem({ item, onRemove, onCantidadChange }) {
  const [cantidad, setCantidad] = useState(item.qty);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < 1) return;

    setCantidad(newValue);
    onCantidadChange(item.id, newValue);
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
        <h6 className="mb-1">{item.title}</h6>
        <div className="d-flex align-items-center justify-content-between">
          <span className="text-success fw-bold">{item.price}</span>
          <div className="d-flex align-items-center">
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={handleChange}
              className="form-control form-control-sm me-2"
              style={{ width: '60px' }}
            />
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemove(item.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
