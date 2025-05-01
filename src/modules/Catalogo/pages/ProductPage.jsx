// src/modules/Catalogo/pages/ProductPage.jsx
import { useParams } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetails";
import { useProductoImagen } from "../hooks/useProductoImagen";
import ReviewList from "../components/ReviewList";
import { useReseñas } from "../hooks/useReseñas";

import ProductImagesSlide from "../components/ProductImagesSlide";
import { useProductoImagenes } from "../hooks/useProductoImagenes";

import ProductImages from '../components/ProductImages';
import ProductInfo from '../components/ProductInfo';
import ProductDescription from '../components/ProductDescription';
import RelatedProducts from '../components/RelatedProducts';

export default function ProductPage() {
  const { id } = useParams();
  const { producto, loading } = useProductDetails(id);
  const { imagenUrl, loading: loadingImg } = useProductoImagen(id);
  const { reseñas, loading: loadingReseñas } = useReseñas(id);
  const { imagenes, loading: loadingImgs } = useProductoImagenes(id);



  if (loading || loadingImg) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <p className="text-danger">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <main className="container my-4">
      <div className="row">
        <div className="col-md-6">
          {loadingImgs ? (
            <div className="text-center py-4">
              <div className="spinner-border text-secondary" role="status" />
            </div>
          ) : (
            <ProductImagesSlide imagenes={imagenes} />
          )}
        </div>
        <div className="col-md-6">
          <ProductInfo
            title={producto.nombre}
            price={`$${producto.precio.toFixed(2)}`}
            productoId={producto.id}
            stock={producto.stock}                
            vendedor={producto.vendedorNombre}  
            vendedorId={producto.vendedorId}
          />
        </div>
      </div>

      <ProductDescription description={producto.descripcion} />

      <RelatedProducts />

      {/* -----RESEÑAS------ */}
      {loadingReseñas ? (
        <div className="text-center my-4">
          <div className="spinner-border text-secondary" role="status" />
          <p className="mt-2">Cargando reseñas...</p>
        </div>
      ) : (
        <ReviewList reseñas={reseñas} />
      )}

    </main>
  );
}
