import { useContext } from 'react';
import { InventarioContext } from '../context/inventarioContext.js';

export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de un InventarioProvider');
  }
  return context;
};