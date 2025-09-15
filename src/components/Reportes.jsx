import { useInventario } from '../hooks/useInventario';

const Reportes = () => {
  const { productos } = useInventario();

  const calcularEstadisticas = () => {
    const totalProductos = productos.length;
    const totalValor = productos.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    const stockBajo = productos.filter(producto => producto.cantidad < 10).length;
    const categorias = [...new Set(productos.map(producto => producto.categoria))];

    return {
      totalProductos,
      totalValor,
      stockBajo,
      totalCategorias: categorias.length
    };
  };

  const obtenerProductosStockBajo = () => {
    return productos.filter(producto => producto.cantidad < 10);
  };

  const stats = calcularEstadisticas();
  const productosStockBajo = obtenerProductosStockBajo();

  return (
    <div className="reportes-container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        📊 Reportes de Inventario
      </h2>

      <div className="estadisticas-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="stat-card" style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Total Productos</h3>
          <p style={{ fontSize: '2em', margin: '10px 0' }}>{stats.totalProductos}</p>
        </div>

        <div className="stat-card" style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Valor Total</h3>
          <p style={{ fontSize: '2em', margin: '10px 0' }}>
            ${stats.totalValor.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="stat-card" style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Stock Bajo</h3>
          <p style={{ fontSize: '2em', margin: '10px 0' }}>{stats.stockBajo}</p>
          <small>Productos con menos de 10 unidades</small>
        </div>

        <div className="stat-card" style={{
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>Categorías</h3>
          <p style={{ fontSize: '2em', margin: '10px 0' }}>{stats.totalCategorias}</p>
        </div>
      </div>

      {productosStockBajo.length > 0 && (
        <div className="alerta-stock">
          <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>
            ⚠️ Productos con Stock Bajo
          </h3>
          <div style={{ 
            backgroundColor: '#fff5f5', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #fed7d7'
          }}>
            {productosStockBajo.map(producto => (
              <div key={producto.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #fed7d7'
              }}>
                <span>{producto.nombre}</span>
                <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                  {producto.cantidad} unidades
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes;