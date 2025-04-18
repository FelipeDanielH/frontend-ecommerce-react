// src/modules/DashboardVendedor/hooks/useProductosVendedor.js
import { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../../context/authContext';

export function useProductosVendedor() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      const res = await fetch(`http://localhost:8080/productos/vendedor/${user.id}`);
      const data = await res.json();
      // Ordenamos del más reciente al más antiguo por id (suponiendo que crece)
      setProductos(data.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error('Error al obtener productos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchProductos();
  }, [user]);

  return { productos, loading, refetch: fetchProductos };
}
