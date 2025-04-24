import { useState } from 'react';
import { useCatalogoFilters } from '../../Catalogo/hooks/useCatalogoFilters';
import { useCrearProducto } from '../hooks/useCrearProducto';
import { useNavigate } from 'react-router-dom';
import ToastSuccess from '../../../components/ToastSuccess';

export default function CrearProductoForm() {
  const navigate = useNavigate();
  const { crearProducto, loading } = useCrearProducto();
  const { categoriaPadre, setCategoriaPadre, categoriaHija, setCategoriaHija, categoriasPadre, categoriasHijas } = useCatalogoFilters();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [estado, setEstado] = useState('');
  const [imagenes, setImagenes] = useState(['']);
  const [toastMsg, setToastMsg] = useState('');

  const handleChangeImagen = (index, value) => {
    const nuevas = [...imagenes];
    nuevas[index] = value;
    setImagenes(nuevas);
  };

  const agregarImagen = () => {
    setImagenes([...imagenes, '']);
  };

  const eliminarImagen = (index) => {
    if (imagenes.length === 1) return;
    const nuevas = imagenes.filter((_, i) => i !== index);
    setImagenes(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriaId = categoriaHija || categoriaPadre;

    await crearProducto(
      {
        nombre,
        descripcion,
        precio,
        stock,
        estado,
        categoriaId,
        imagenes,
      },
      (msg) => setToastMsg(msg), // toastSuccess
      (msg) => alert(msg),       // toastError
      navigate
    );
  };

  return (
    <form className="bg-white p-4 shadow rounded" onSubmit={handleSubmit}>
      <ToastSuccess msg={toastMsg} />

      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre del producto</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ej: iPhone 13 Pro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Descripción</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Describe los detalles del producto..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Precio</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 999.99"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Stock disponible</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 5"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Estado del producto</label>
        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Seleccionar estado</option>
          <option value="NUEVO">Nuevo</option>
          <option value="USADO">Usado</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Imágenes del producto (URLs)</label>
        {imagenes.map((url, index) => (
          <div className="input-group mb-2" key={index}>
            <input
              type="url"
              className="form-control"
              value={url}
              onChange={(e) => handleChangeImagen(index, e.target.value)}
              placeholder={`https://ejemplo.com/imagen-${index + 1}.jpg`}
            />
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => eliminarImagen(index)}
              disabled={imagenes.length === 1}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={agregarImagen}
        >
          ➕ Agregar imagen
        </button>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Categoría principal</label>
          <select
            className="form-select"
            value={categoriaPadre || ''}
            onChange={(e) => {
              setCategoriaPadre(e.target.value);
              setCategoriaHija(null);
            }}
          >
            <option value="">Seleccione una categoría</option>
            {categoriasPadre.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {categoriasHijas.length > 0 && (
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Subcategoría</label>
            <select
              className="form-select"
              value={categoriaHija || ''}
              onChange={(e) => setCategoriaHija(e.target.value)}
            >
              <option value="">Seleccione una subcategoría</option>
              {categoriasHijas.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-green-custom fw-bold mt-3"
        disabled={loading}
      >
        {loading ? "Publicando..." : "Publicar producto"}
      </button>
    </form>
  );
}
