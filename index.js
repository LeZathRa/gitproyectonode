const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const idProducto = req.params.id;
    const productoActualizado = req.body;
    productos = productos.map(producto => {
        if (producto.id.toString() === idProducto) {
            return { ...producto, ...productoActualizado };
        }
        return producto;
    });
    res.json(productos);
});

app.delete('/productos/:id', (req, res) => {
    const idProducto = req.params.id;
    productos = productos.filter(producto => producto.id.toString() !== idProducto);
    res.json(productos);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
