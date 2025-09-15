import { useInventario } from '../context/InventarioContext';

const Dashboard = () => {
  const { productos, obtenerProductosPorCategoria } = useInventario();
  
  const productosPorCategoria = obtenerProductosPorCategoria();
  const productosConStockBajo = productos.filter(producto => producto.cantidad < 10);
  const productosSinStock = productos.filter(producto => producto.cantidad === 0);
  
  const valorTotalInventario = productos.reduce((total, producto) => 
    total + (producto.precio * producto.cantidad), 0
  );

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

  return (
    <div className="dashboard-container">
      <h2>Panel de Control</h2>
      
      <div className="metricas-principales">
        <div className="metrica">
          <div className="metrica-valor">{productos.length}</div>
          <div className="metrica-etiqueta">Total de Productos</div>
        </div>
        
        <div className="metrica">
          <div className="metrica-valor">
            {productos.reduce((total, producto) => total + producto.cantidad, 0)}
          </div>
          <div className="metrica-etiqueta">Unidades en Stock</div>
        </div>
        
        <div className="metrica">
          <div className="metrica-valor">{formatearPrecio(valorTotalInventario)}</div>
          <div className="metrica-etiqueta">Valor Total del Inventario</div>
        </div>
        
        <div className="metrica">
          <div className="metrica-valor">{Object.keys(productosPorCategoria).length}</div>
          <div className="metrica-etiqueta">Categorías</div>
        </div>
      </div>

      <div className="alertas-stock">
        {productosSinStock.length > 0 && (
          <div className="alerta alerta-critica">
            <h3>⚠️ Productos sin Stock ({productosSinStock.length})</h3>
            <ul>
              {productosSinStock.map(producto => (
                <li key={producto.id}>{producto.nombre}</li>
              ))}
            </ul>
          </div>
        )}
        
        {productosConStockBajo.length > 0 && (
          <div className="alerta alerta-advertencia">
            <h3>⚡ Stock Bajo ({productosConStockBajo.length} productos)</h3>
            <ul>
              {productosConStockBajo.map(producto => (
                <li key={producto.id}>
                  {producto.nombre} - {producto.cantidad} unidades
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="resumen-categorias">
        <h3>Productos por Categoría</h3>
        <div className="categorias-grid">
          {Object.entries(productosPorCategoria).map(([categoria, cantidad]) => (
            <div key={categoria} className="categoria-card">
              <div className="categoria-nombre">{categoria}</div>
              <div className="categoria-cantidad">{cantidad} productos</div>
            </div>
          ))}
        </div>
      </div>

      <div className="productos-recientes">
        <h3>Productos Agregados Recientemente</h3>
        <div className="productos-recientes-lista">
          {productos
            .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso))
            .slice(0, 5)
            .map(producto => (
              <div key={producto.id} className="producto-reciente">
                <div className="producto-info">
                  <strong>{producto.nombre}</strong>
                  <span className="categoria-small">{producto.categoria}</span>
                </div>
                <div className="producto-detalles">
                  <span className="cantidad">{producto.cantidad} unidades</span>
                  <span className="precio">{formatearPrecio(producto.precio)}</span>
                </div>
                <div className="fecha-ingreso">{producto.fechaIngreso}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
