export default function RelatedProducts() {
    const fakeProducts = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      title: `Producto ${i + 1}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      img: `https://via.placeholder.com/250x180?text=Producto+${i + 1}`,
    }));
  
    return (
      <div className="mt-5">
        <h5 className="fw-bold mb-3">Productos relacionados</h5>
        <div className="row">
          {fakeProducts.map((p) => (
            <div className="col-6 col-md-3 mb-3" key={p.id}>
              <div className="card h-100">
                <img src={p.img} className="card-img-top" alt={p.title} />
                <div className="card-body">
                  <h6 className="card-title">{p.title}</h6>
                  <p className="fw-bold text-success">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  