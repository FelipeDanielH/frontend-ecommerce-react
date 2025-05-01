// src/modules/Catalogo/components/ProductImagesSlide.jsx
export default function ProductImagesSlide({ imagenes }) {
    if (!imagenes || imagenes.length === 0) return null;
  
    return (
      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {imagenes.map((img, index) => (
            <div
              key={img.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={img.urlImagen}
                className="d-block w-100 img-fluid border rounded"
                alt={`Imagen ${index + 1}`}
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
  
        {imagenes.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </>
        )}
      </div>
    );
  }
  