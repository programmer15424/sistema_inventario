import { createContext, useContext, useState, useEffect } from 'react';

const InventarioContext = createContext();

export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de un InventarioProvider');
  }
  return context;
};

const productosIniciales = [
  {
    id: 1,
    nombre: 'Laptop HP Pavilion',
    categoria: 'Electrónicos',
    cantidad: 15,
    precio: 2799.90,
    descripcion: 'Laptop HP Pavilion 15.6" Intel Core i5',
    fechaIngreso: '2025-01-15'
  },
  {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    categoria: 'Accesorios',
    cantidad: 45,
    precio: 89.90,
    descripcion: 'Mouse inalámbrico ergonómico con receptor USB',
    fechaIngreso: '2025-02-10'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    categoria: 'Accesorios',
    cantidad: 28,
    precio: 249.90,
    descripcion: 'Teclado mecánico RGB con switches azules',
    fechaIngreso: '2025-01-20'
  },
  {
    id: 4,
    nombre: 'Monitor 24 pulgadas',
    categoria: 'Electrónicos',
    cantidad: 12,
    precio: 599.90,
    descripcion: 'Monitor LED 24" Full HD 1920x1080',
    fechaIngreso: '2025-02-05'
  },
  {
    id: 5,
    nombre: 'Silla de Oficina',
    categoria: 'Mobiliario',
    cantidad: 8,
    precio: 459.90,
    descripcion: 'Silla ergonómica de oficina con soporte lumbar',
    fechaIngreso: '2025-01-25'
  }
];

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
    } catch (error) {
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
    } catch (error) {
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
