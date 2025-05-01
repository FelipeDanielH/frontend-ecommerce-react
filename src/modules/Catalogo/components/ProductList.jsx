// src/modules/Catalogo/components/ProductList.jsx
import ProductCard from './ProductCard';

export default function ProductList() {
  const fakeProducts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: `Producto ${i + 1}`,
    price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
    img: `https://via.placeholder.com/250x180?text=Producto+${i + 1}`,
  }));

  return (
    <div className="row">
      {fakeProducts.map((p) => (
        <div key={p.id} className="col-6 col-md-4 col-lg-3 mb-4">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
