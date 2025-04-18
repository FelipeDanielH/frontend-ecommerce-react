// src/modules/DashboardVendedor/components/EditarStockModal.jsx
import { useState } from 'react';

export default function EditarStockModal({ producto, onClose, onStockUpdated }) {
  const [nuevoStock, setNuevoStock] = useState(producto.stock);
  const [loading, setLoading] = useState(false);

  const actualizarStock = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/productos/${producto.id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: nuevoStock })
      });

      if (!res.ok) throw new Error('Error al actualizar stock');
      const actualizado = await res.json();
      onStockUpdated(actualizado);
      onClose();
    } catch (err) {
      alert('Error al actualizar el stock');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar stock</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Stock actual: <strong>{producto.stock}</strong></p>
            <input
              type="number"
              className="form-control"
              value={nuevoStock}
              onChange={(e) => setNuevoStock(Number(e.target.value))}
              min={0}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-success" onClick={actualizarStock} disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
