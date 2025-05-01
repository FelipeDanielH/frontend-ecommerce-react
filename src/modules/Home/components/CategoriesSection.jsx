import { useEffect, useState } from "react";
import { fetchCategorias } from "../../Catalogo/services/categoriasService";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
  const [categoriasAleatorias, setCategoriasAleatorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const todas = await fetchCategorias();
        const padres = todas.filter((cat) => cat.categoriaPadreId === null);
        const aleatorias = [...padres].sort(() => Math.random() - 0.5).slice(0, 5);
        setCategoriasAleatorias(aleatorias);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };

    cargarCategorias();
  }, []);

  const handleClick = (categoriaId) => {
    navigate("/catalogo", { state: { categoriaPadre: categoriaId } });
  };

  return (
    <section className="py-5 bg-white border-bottom">
      <div className="container">
        <h4 className="mb-4 fw-bold">Categorías populares</h4>
        <div className="row text-center justify-content-center">
          {categoriasAleatorias.map((cat) => (
            <div key={cat.id} className="col-6 col-md-2 mb-4">
              <button
                className="btn btn-outline-green-custom w-100"
                onClick={() => handleClick(cat.id)}
              >
                {cat.nombre}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
