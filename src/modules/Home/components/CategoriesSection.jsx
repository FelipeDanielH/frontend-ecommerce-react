export default function CategoriesSection() {
    const categories = [
      { name: 'Tecnología', icon: 'laptop' },
      { name: 'Ropa', icon: 'shop' },
      { name: 'Hogar', icon: 'house' },
      { name: 'Juguetes', icon: 'emoji-smile' },
      { name: 'Deportes', icon: 'bicycle' },
    ];
  
    return (
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <h4 className="mb-4 fw-bold">Categorías populares</h4>
          <div className="row text-center">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-6 col-md-2 mb-4">
                <i className={`bi bi-${cat.icon} fs-2 text-green-custom`}></i>
                <p className="mt-2">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }