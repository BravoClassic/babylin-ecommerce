"use strict";
import express from 'express';
import data from './data.js';
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product)
        res.send(product);
    else
        res.status(404).send({ message: "Product not Found!" });
});
app.get('/api/products', (req, res) => {
    res.json(data.products);
});


app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});