export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">EcoMarket</h6>
            <p>Tu sitio de confianza para comprar y vender.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Enlaces</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Catálogo</a></li>
              <li><a href="#" className="text-white text-decoration-none">Carrito</a></li>
              <li><a href="#" className="text-white text-decoration-none">Soporte</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contacto</h6>
            <p>Email: contacto@ecomarket.com</p>
            <p>Tel: +1 123 456 789</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>© {new Date().getFullYear()} EcoMarket. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
