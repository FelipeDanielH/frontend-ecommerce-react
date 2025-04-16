import { Link } from 'react-router-dom';
import useRegisterForm from '../hooks/useRegisterForm';

export default function RegisterForm() {
  const { formData, handleChange, handleSubmit } = useRegisterForm();

  return (
    <div
      className="card shadow-lg border-0 px-4 py-5"
      style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}
    >
      <div className="text-center mb-4">
        <img
          src="/logo192.png"
          alt="Logo"
          style={{ width: '60px', height: '60px' }}
        />
        <h3 className="mt-3">Crea tu cuenta</h3>
        <p className="text-muted">Es rápido y fácil</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre completo</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Juan Pérez"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Contraseña</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Teléfono</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone-fill"></i>
            </span>
            <input
              type="tel"
              className="form-control"
              placeholder="Ej: 123456789"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Dirección</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-geo-alt-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Calle Falsa 123"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Tipo de cuenta</label>
          <select
            className="form-select"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="COMPRADOR">Comprador</option>
            <option value="VENDEDOR">Vendedor</option>
          </select>
        </div>

        <div className="d-grid mt-2">
          <button type="submit" className="btn btn-warning btn-lg">
            Crear cuenta
          </button>
        </div>

        <div className="text-center mt-3">
          <small>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-decoration-none fw-bold">
              Inicia sesión
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
}
