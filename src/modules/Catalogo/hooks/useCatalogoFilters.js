import { useState, useEffect } from "react";

export function useCatalogoFilters() {
  const [categoriaPadre, setCategoriaPadre] = useState(null);
  const [categoriaHija, setCategoriaHija] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const categoriaActiva = categoriaHija || categoriaPadre;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8080/categorias");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    fetchCategorias();
  }, []);

  const categoriasPadre = categorias.filter(cat => cat.categoriaPadreId === null);
  const categoriasHijas = categorias.filter(cat => cat.categoriaPadreId === parseInt(categoriaPadre));

  return {
    categoriaPadre,
    setCategoriaPadre,
    categoriaHija,
    setCategoriaHija,
    categoriaActiva,
    categoriasPadre,
    categoriasHijas
  };
}
