// src/modules/Catalogo/components/ProductImages.jsx
export default function ProductImages({ image }) {
    return (
      <div className="text-center mb-4">
        <img
          src={image}
          alt="Producto"
          className="img-fluid border rounded"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
      </div>
    );
  }
  