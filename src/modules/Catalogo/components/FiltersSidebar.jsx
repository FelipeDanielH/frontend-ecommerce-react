export default function FiltersSidebar({
  categoriaPadre,
  setCategoriaPadre,
  categoriaHija,
  setCategoriaHija,
  categoriasPadre,
  categoriasHijas
}) {
  const handleCategoriaPadreChange = (e) => {
    const selectedId = e.target.value || null;
    setCategoriaPadre(selectedId);
    setCategoriaHija(null); // reset subcategoría
  };

  const handleCategoriaHijaChange = (e) => {
    const selectedId = e.target.value || null;
    setCategoriaHija(selectedId);
  };

  return (
    <aside className="bg-white p-3 shadow-sm rounded mb-4">
      <h5 className="fw-bold mb-3">Filtros</h5>

      <div className="mb-3">
        <h6 className="fw-semibold">Categoría principal</h6>
        <select className="form-select" value={categoriaPadre || ''} onChange={handleCategoriaPadreChange}>
          <option value="">Seleccione una categoría</option>
          {categoriasPadre.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      {categoriasHijas.length > 0 && (
        <div className="mb-3">
          <h6 className="fw-semibold">Subcategoría</h6>
          <select className="form-select" value={categoriaHija || ''} onChange={handleCategoriaHijaChange}>
            <option value="">Seleccione una subcategoría</option>
            {categoriasHijas.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.nombre}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <h6 className="fw-semibold">Ordenar por</h6>
        <select className="form-select">
          <option>Relevancia</option>
          <option>Precio más bajo</option>
          <option>Precio más alto</option>
        </select>
      </div>
    </aside>
  );
}
