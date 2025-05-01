// src/modules/Catalogo/components/ProductDescription.jsx
export default function ProductDescription({ description }) {
    return (
      <div className="mt-5">
        <h5 className="fw-bold">Descripción del producto</h5>
        <p className="text-muted">{description}</p>
      </div>
    );
  }
  