// src/modules/Home/components/HeroSection.jsx
export default function HeroSection() {
    return (
     <section className="bg-light py-4 border-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold">Encuentra todo lo que necesitas</h2>
            <p className="lead">Miles de productos de diferentes categorías al mejor precio.</p>
            <a href="/catalogo" className="btn btn-green-custom fw-bold">
              Explorar catálogo
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*n8KSGt3obc-HWZs7"
              className="img-fluid rounded"
              alt="Promoción"
            />
          </div>
        </div>
      </div>
    </section>
    );
  }
  