import { useState } from 'react';
import { useInventario } from '../hooks/useInventario';

const FormularioProducto = ({ productoAEditar, onCancelar, onExito }) => {
  const { agregarProducto, editarProducto } = useInventario();
  
  const [producto, setProducto] = useState({
    nombre: productoAEditar?.nombre || '',
    categoria: productoAEditar?.categoria || '',
    cantidad: productoAEditar?.cantidad || 0,
    precio: productoAEditar?.precio || 0,
    descripcion: productoAEditar?.descripcion || ''
  });
  
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const validarCampos = () => {
    const nuevosErrores = {};
    
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!producto.categoria.trim()) {
      nuevosErrores.categoria = 'La categoría es obligatoria';
    }
    
    if (producto.cantidad < 0) {
      nuevosErrores.cantidad = 'La cantidad debe ser un número positivo';
    }
    
    if (producto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }
    
    return nuevosErrores;
  };

  const manejarCambio = (campo, valor) => {
    try {
      setProducto(prev => ({
        ...prev,
        [campo]: valor
      }));
      
      if (errores[campo]) {
        setErrores(prev => ({
          ...prev,
          [campo]: ''
        }));
      }
    } catch (error) {
      console.error('Error al manejar cambio:', error);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    try {
      const nuevosErrores = validarCampos();
      
      if (Object.keys(nuevosErrores).length > 0) {
        setErrores(nuevosErrores);
        return;
      }

      const resultado = productoAEditar 
        ? editarProducto(productoAEditar.id, producto)
        : agregarProducto(producto);

      if (resultado.exito) {
        setMensaje(resultado.mensaje);
        if (!productoAEditar) {
          setProducto({
            nombre: '',
            categoria: '',
            cantidad: 0,
            precio: 0,
            descripcion: ''
          });
        }
        onExito && onExito();
      } else {
        setMensaje(resultado.mensaje);
      }
    } catch (error) {
      setMensaje('Error inesperado al procesar el formulario');
      console.error('Error en formulario:', error);
    }
  };

  return (
    <div className="formulario-container">
      <h2>{productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      
      {mensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'exito'}`}>
          {mensaje}
        </div>
      )}
      
      <form onSubmit={manejarEnvio} className="formulario-producto">
        <div className="campo">
          <label htmlFor="nombre">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            value={producto.nombre}
            onChange={(e) => manejarCambio('nombre', e.target.value)}
            className={errores.nombre ? 'error-input' : ''}
          />
          {errores.nombre && <span className="error-texto">{errores.nombre}</span>}
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría *</label>
          <input
            type="text"
            id="categoria"
            value={producto.categoria}
            onChange={(e) => manejarCambio('categoria', e.target.value)}
            className={errores.categoria ? 'error-input' : ''}
          />
          {errores.categoria && <span className="error-texto">{errores.categoria}</span>}
        </div>

        <div className="campos-fila">
          <div className="campo">
            <label htmlFor="cantidad">Cantidad *</label>
            <input
              type="number"
              id="cantidad"
              min="0"
              value={producto.cantidad}
              onChange={(e) => manejarCambio('cantidad', parseInt(e.target.value) || 0)}
              className={errores.cantidad ? 'error-input' : ''}
            />
            {errores.cantidad && <span className="error-texto">{errores.cantidad}</span>}
          </div>

          <div className="campo">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              min="0"
              step="0.01"
              value={producto.precio}
              onChange={(e) => manejarCambio('precio', parseFloat(e.target.value) || 0)}
              className={errores.precio ? 'error-input' : ''}
            />
            {errores.precio && <span className="error-texto">{errores.precio}</span>}
          </div>
        </div>

        <div className="campo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows="3"
            value={producto.descripcion}
            onChange={(e) => manejarCambio('descripcion', e.target.value)}
          />
        </div>

        <div className="botones-formulario">
          <button type="submit" className="btn-primario">
            {productoAEditar ? 'Actualizar' : 'Agregar'} Producto
          </button>
          
          {productoAEditar && (
            <button type="button" onClick={onCancelar} className="btn-secundario">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;
