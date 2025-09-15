import { createContext, useContext, useState, useEffect } from 'react';
import { productosIniciales } from '../data/productosIniciales.js';

const InventarioContext = createContext();

export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de un InventarioProvider');
  }
  return context;
};

export const InventarioProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  useEffect(() => {
    try {
      const productosGuardados = localStorage.getItem('inventario-productos');
      if (productosGuardados) {
        setProductos(JSON.parse(productosGuardados));
      } else {
        setProductos(productosIniciales);
        localStorage.setItem('inventario-productos', JSON.stringify(productosIniciales));
      }
    } catch (error) {
      console.error('Error al cargar productos del localStorage:', error);
      setProductos(productosIniciales);
    }
  }, []);

  const guardarEnLocalStorage = (nuevosProductos) => {
    try {
      localStorage.setItem('inventario-productos', JSON.stringify(nuevosProductos));
    } catch {
      throw new Error('Error al guardar en el almacenamiento local');
    }
  };

  const agregarProducto = (nuevoProducto) => {
    try {
      if (!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.precio) {
        throw new Error('Todos los campos obligatorios deben ser completados');
      }

      if (nuevoProducto.cantidad < 0 || nuevoProducto.precio < 0) {
        throw new Error('La cantidad y el precio deben ser valores positivos');
      }

      const producto = {
        ...nuevoProducto,
        id: Date.now(),
        fechaIngreso: new Date().toISOString().split('T')[0]
      };

      const nuevosProductos = [...productos, producto];
      setProductos(nuevosProductos);
      guardarEnLocalStorage(nuevosProductos);
      
      return { exito: true, mensaje: 'Producto agregado exitosamente' };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  };

  const editarProducto = (id, productoEditado) => {
    try {
      if (!productoEditado.nombre || !productoEditado.categoria || !productoEditado.precio) {
        throw new Error('Todos los campos obligatorios deben ser completados');
      }

      if (productoEditado.cantidad < 0 || productoEditado.precio < 0) {
        throw new Error('La cantidad y el precio deben ser valores positivos');
      }

      const nuevosProductos = productos.map(producto => 
        producto.id === id ? { ...producto, ...productoEditado } : producto
      );
      
      setProductos(nuevosProductos);
      guardarEnLocalStorage(nuevosProductos);
      
      return { exito: true, mensaje: 'Producto editado exitosamente' };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  };

  const eliminarProducto = (id) => {
    try {
      const nuevosProductos = productos.filter(producto => producto.id !== id);
      setProductos(nuevosProductos);
      guardarEnLocalStorage(nuevosProductos);
      
      return { exito: true, mensaje: 'Producto eliminado exitosamente' };
    } catch {
      return { exito: false, mensaje: 'Error al eliminar el producto' };
    }
  };

  const obtenerProductosPorCategoria = () => {
    try {
      return productos.reduce((acc, producto) => {
        acc[producto.categoria] = (acc[producto.categoria] || 0) + 1;
        return acc;
      }, {});
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      return {};
    }
  };

  const obtenerProductosFiltrados = () => {
    try {
      return productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(filtro.toLowerCase());
        const coincideCategoria = categoriaFiltro === '' || producto.categoria === categoriaFiltro;
        return coincideNombre && coincideCategoria;
      });
    } catch (error) {
      console.error('Error al filtrar productos:', error);
      return productos;
    }
  };

  const obtenerCategorias = () => {
    try {
      return [...new Set(productos.map(producto => producto.categoria))];
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return [];
    }
  };

  const valor = {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductosPorCategoria,
    obtenerProductosFiltrados,
    obtenerCategorias,
    filtro,
    setFiltro,
    categoriaFiltro,
    setCategoriaFiltro
  };

  return (
    <InventarioContext.Provider value={valor}>
      {children}
    </InventarioContext.Provider>
  );
};
