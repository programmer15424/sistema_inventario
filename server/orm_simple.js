import { Sequelize, DataTypes } from 'sequelize';

// Configuración básica de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'inventario_simple.sqlite'
});

// Modelo simple Producto
const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Función para crear y listar productos
async function ejemploORM() {
  await sequelize.sync({ force: true });
  await Producto.create({ nombre: 'Lapiz', cantidad: 100 });
  await Producto.create({ nombre: 'Cuaderno', cantidad: 50 });
  const productos = await Producto.findAll();
  console.log('Productos:', productos.map(p => p.toJSON()));
}

ejemploORM();
