// src/modules/Catalogo/components/ReviewList.jsx
export default function ReviewList({ reseñas }) {
    return (
      <div className="mt-5">
        <h5 className="fw-bold mb-3">Reseñas de usuarios</h5>
  
        {reseñas.length === 0 ? (
          <p className="text-muted">Aún no hay reseñas para este producto.</p>
        ) : (
          reseñas.map((resena) => (
            <div key={resena.id} className="mb-4 border-bottom pb-3">
              <div className="d-flex justify-content-between">
                <strong>{resena.nombreUsuario}</strong>
                <small className="text-muted">{new Date(resena.fecha).toLocaleDateString()}</small>
              </div>
              <div className="text-warning">
                {'★'.repeat(resena.calificacion)}{'☆'.repeat(5 - resena.calificacion)}
              </div>
              <p className="text-muted">{resena.comentario}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  