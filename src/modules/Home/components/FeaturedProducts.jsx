export default function FeaturedProducts() {
    const products = new Array(4).fill({
      title: 'Producto Ejemplo',
      price: '$99.99',
      img: 'https://http2.mlstatic.com/D_NQ_NP_824820-MLA79486201340_102024-O.webp'
    });
  
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <h4 className="mb-4 fw-bold">Productos destacados</h4>
          <div className="row">
            {products.map((p, idx) => (
              <div key={idx} className="col-6 col-md-3 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <img src={p.img} className="card-img-top" alt={p.title} />
                  <div className="card-body">
                    <h6 className="card-title">{p.title}</h6>
                    <p className="card-text text-purple-custom fw-bold">{p.price}</p>
                    <a href="#" className="btn btn-sm btn-outline-green-custom w-100">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  