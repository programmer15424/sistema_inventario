import { useState } from 'react';
import { useInventario } from '../context/InventarioContext';
import FormularioProducto from './FormularioProducto';

const ListaProductos = () => {
  const { 
    obtenerProductosFiltrados, 
    eliminarProducto, 
    filtro, 
    setFiltro, 
    categoriaFiltro, 
    setCategoriaFiltro,
    obtenerCategorias 
  } = useInventario();
  
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const productos = obtenerProductosFiltrados();
  const categorias = obtenerCategorias();

  const manejarEliminar = (id) => {
    try {
      if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const resultado = eliminarProducto(id);
        setMensaje(resultado.mensaje);
        setTimeout(() => setMensaje(''), 3000);
      }
    } catch (error) {
      setMensaje('Error al eliminar el producto');
      console.error('Error al eliminar:', error);
    }
  };

  const manejarEditar = (producto) => {
    try {
      setProductoEditando(producto);
      setMostrarFormulario(true);
    } catch (error) {
      setMensaje('Error al cargar el producto para editar');
      console.error('Error al editar:', error);
    }
  };

  const cerrarFormulario = () => {
    setProductoEditando(null);
    setMostrarFormulario(false);
  };

  const onExitoFormulario = () => {
    setMensaje('Operación realizada exitosamente');
    cerrarFormulario();
    setTimeout(() => setMensaje(''), 3000);
  };

  const formatearPrecio = (precio) => {
    try {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(precio);
    } catch {
      return `S/ ${precio.toFixed(2)}`;
    }
  };

  const obtenerEstadoStock = (cantidad) => {
    if (cantidad === 0) return 'sin-stock';
    if (cantidad < 10) return 'stock-bajo';
    return 'stock-normal';
  };

  if (mostrarFormulario) {
    return (
      <FormularioProducto
        productoAEditar={productoEditando}
        onCancelar={cerrarFormulario}
        onExito={onExitoFormulario}
      />
    );
  }

  return (
    <div className="lista-productos-container">
      <div className="header-lista">
        <h2>Inventario de Productos</h2>
        <button 
          onClick={() => setMostrarFormulario(true)} 
          className="btn-primario"
        >
          Agregar Producto
        </button>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'exito'}`}>
          {mensaje}
        </div>
      )}

      <div className="filtros">
        <div className="filtro-busqueda">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busqueda"
          />
        </div>
        
        <div className="filtro-categoria">
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="select-categoria"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="resumen-inventario">
        <div className="estadistica">
          <span className="numero">{productos.length}</span>
          <span className="etiqueta">Productos</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {productos.reduce((total, producto) => total + producto.cantidad, 0)}
          </span>
          <span className="etiqueta">Unidades Totales</span>
        </div>
        <div className="estadistica">
          <span className="numero">
            {formatearPrecio(productos.reduce((total, producto) => 
              total + (producto.precio * producto.cantidad), 0))}
          </span>
          <span className="etiqueta">Valor Total</span>
        </div>
      </div>

      {productos.length === 0 ? (
        <div className="mensaje-vacio">
          <p>No se encontraron productos que coincidan con los filtros.</p>
        </div>
      ) : (
        <div className="tabla-container">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>
                    <div className="info-producto">
                      <strong>{producto.nombre}</strong>
                      {producto.descripcion && (
                        <div className="descripcion">{producto.descripcion}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="categoria-tag">{producto.categoria}</span>
                  </td>
                  <td>
                    <span className={`cantidad ${obtenerEstadoStock(producto.cantidad)}`}>
                      {producto.cantidad}
                      {producto.cantidad === 0 && ' (Sin stock)'}
                      {producto.cantidad < 10 && producto.cantidad > 0 && ' (Stock bajo)'}
                    </span>
                  </td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>{formatearPrecio(producto.precio * producto.cantidad)}</td>
                  <td>{producto.fechaIngreso}</td>
                  <td>
                    <div className="acciones">
                      <button
                        onClick={() => manejarEditar(producto)}
                        className="btn-editar"
                        title="Editar producto"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => manejarEliminar(producto.id)}
                        className="btn-eliminar"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaProductos;
