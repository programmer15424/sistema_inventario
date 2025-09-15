import { useState } from 'react';
import { InventarioProvider } from './context/InventarioContext';
import Dashboard from './components/Dashboard';
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProducto';
import Reportes from './components/Reportes';

function App() {
  const [vistaActual, setVistaActual] = useState('dashboard');

  const renderizarVista = () => {
    switch (vistaActual) {
      case 'dashboard':
        return <Dashboard />;
      case 'lista':
        return <ListaProductos />;
      case 'agregar':
        return <FormularioProducto onExito={() => setVistaActual('lista')} />;
      case 'reportes':
        return <Reportes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <InventarioProvider>
      <div className="app">
        <header>
          <h1 style={{ 
            textAlign: 'center', 
            color: '#2c3e50', 
            marginBottom: '30px',
            fontSize: '36px' 
          }}>
            Sistema de Inventario
          </h1>
        </header>
        
        <nav className="navegacion">
          <div className="nav-botones">
            <button
              className={`nav-boton ${vistaActual === 'dashboard' ? 'activo' : ''}`}
              onClick={() => setVistaActual('dashboard')}
            >
              📊 Panel de Control
            </button>
            <button
              className={`nav-boton ${vistaActual === 'lista' ? 'activo' : ''}`}
              onClick={() => setVistaActual('lista')}
            >
              📋 Inventario
            </button>
            <button
              className={`nav-boton ${vistaActual === 'agregar' ? 'activo' : ''}`}
              onClick={() => setVistaActual('agregar')}
            >
              ➕ Agregar Producto
            </button>
            <button
              className={`nav-boton ${vistaActual === 'reportes' ? 'activo' : ''}`}
              onClick={() => setVistaActual('reportes')}
            >
              📈 Reportes
            </button>
          </div>
        </nav>

        <main>
          {renderizarVista()}
        </main>
      </div>
    </InventarioProvider>
  );
}

export default App;
