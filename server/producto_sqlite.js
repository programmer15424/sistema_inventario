import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'inventario_sqlite.sqlite'
});

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

async function main() {
  await sequelize.sync({ force: true });
  await Producto.create({ nombre: 'Lapiz', cantidad: 100 });
  await Producto.create({ nombre: 'Cuaderno', cantidad: 50 });
  const productos = await Producto.findAll();
  console.log(productos.map(p => p.toJSON()));
  console.log('Verificación exitosa: productos listados.');
}

main();
