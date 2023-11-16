const express = require('express');

const app = express();

const puerto = 3000;

let edificios = require('./API/data.json');

// Inicio de los endpoints - GET, POST, PUT, DELETE
//esto va a ir en modules creo
app.get('/', (req, res)=>{
    res.send('<h1>Bienvenid@ al servidor de Genova SRL</h1>');
});

app.get('/listadoEdificios', (req, res)=>{
    res.json(edificios);
});
app.get('/listadoEdificios/:id', (req, res)=>{
    res.json(edificios[req.params.id]);
});
app.listen(puerto, ()=>{
    console.log('Servidor funcionando.')
});