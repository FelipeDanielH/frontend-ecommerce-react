const API_URL = import.meta.env.VITE_API_URL

export async function fetchProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('[fetchProductos]', error);
        return [];
    }
}

export async function fetchProductoById(id) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener producto");
        return await response.json();
    } catch (error) {
        console.error("Error al cargar producto:", error);
        return null;
    }
}

export async function getImagenesPorProducto(productoId) {
    const res = await fetch(`${API_URL}/imagenes-producto/producto/${productoId}`);
    if (!res.ok) throw new Error('Error al obtener las imágenes del producto');
    return await res.json();
}

export async function fetchProductosPorCategoria(idCategoria) {
    const res = await fetch(`${API_URL}/productos/categoria/${idCategoria}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
        },
    });
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
}

export async function obtenerProductoConVendedor(productoId) {
    const [productoRes, vendedorRes] = await Promise.all([
      fetch(`${API_URL}/productos/${productoId}`),
      fetch(`${API_URL}/productos/${productoId}/vendedor`)
    ]);
  
    if (!productoRes.ok || !vendedorRes.ok) {
      throw new Error("Error al obtener producto o vendedor");
    }
  
    const producto = await productoRes.json();
    const vendedor = await vendedorRes.json();
  
    return {
      ...producto,
      vendedorNombre: vendedor.nombre,
    };
  }

export const productoService = {
    async actualizarStock(productoId, nuevoStock) {
        const res = await fetch(`${API_URL}/productos/${productoId}/stock`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock: nuevoStock }),
        });

        if (!res.ok) {
            throw new Error("No se pudo actualizar el stock");
        }

        return await res.json(); 
    },

    
};

