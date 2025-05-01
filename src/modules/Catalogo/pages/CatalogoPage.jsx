// src/modules/Catalogo/pages/CatalogoPage.jsx
import { useState, useEffect, useMemo } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";
import { useProductos } from "../hooks/useProductos";
import { fetchCategorias } from "../services/categoriasService";
import { useLocation } from "react-router-dom";

export default function CatalogoPage() {
  const [categoriaPadre, setCategoriaPadre] = useState(null);
  const [categoriaHija, setCategoriaHija] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const categoriaActiva = categoriaHija || categoriaPadre;
  const location = useLocation();

  const categoriasPadre = categorias.filter(
    (cat) => cat.categoriaPadreId === null
  );

  const categoriasHijas = useMemo(() => {
    return categorias.filter(
      (cat) => cat.categoriaPadreId === parseInt(categoriaPadre)
    );
  }, [categorias, categoriaPadre]);

  const { productos, loading } = useProductos({
    categoriaPadreId: categoriaPadre,
    categoriaHijaId: categoriaHija,
    categoriasHijas,
  });

  useEffect(() => {
    if (location.state?.categoriaPadre) {
      setCategoriaPadre(location.state.categoriaPadre);
    }
  }, [location.state]);

  useEffect(() => {
    fetchCategorias()
      .then(setCategorias)
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []);


  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <FiltersSidebar
            categoriaPadre={categoriaPadre}
            setCategoriaPadre={setCategoriaPadre}
            categoriaHija={categoriaHija}
            setCategoriaHija={setCategoriaHija}
            categoriasPadre={categoriasPadre}
            categoriasHijas={categoriasHijas}
          />
        </div>
        <div className="col-md-9">
          {loading ? (
            <p>Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p>
              No hay productos para la categoría seleccionada (ID:{" "}
              {categoriaActiva})
            </p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {productos.map((producto) => (
                <div className="col" key={producto.id}>
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
