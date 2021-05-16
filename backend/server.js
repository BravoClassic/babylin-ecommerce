// import express from 'express';
"use strict";
const express = require('express');
const data = require('./data.js');
const app = express();
const port = 5000;

app.get('/api/products',(req,res) =>{
    res.json(data.products);
});

app.get('/',(req, res) => {
    res.send('Server is ready');
});

app.listen(port, ()=> {
    console.log(`Serve at http://localhost:${port}`);
});