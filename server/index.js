import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
app.use(express.json());

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'inventario.sqlite'
});

// Modelo Producto
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

// Sincronizar base de datos
sequelize.sync();

// CRUD API
app.get('/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

app.post('/productos', async (req, res) => {
  const { nombre, cantidad } = req.body;
  const producto = await Producto.create({ nombre, cantidad });
  res.status(201).json(producto);
});

app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad } = req.body;
  const producto = await Producto.findByPk(id);
  if (!producto) return res.status(404).json({ error: 'No encontrado' });
  producto.nombre = nombre;
  producto.cantidad = cantidad;
  await producto.save();
  res.json(producto);
});

app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (!producto) return res.status(404).json({ error: 'No encontrado' });
  await producto.destroy();
  res.json({ eliminado: true });
});

app.listen(3001, () => {
  console.log('Servidor inventario escuchando en puerto 3001');
});
