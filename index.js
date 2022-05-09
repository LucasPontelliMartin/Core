// config inicial
const express = require('express');
const res = require('express/lib/response');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const app = express();
var cors = require('cors')

const clienteRoutes = require('./routes/ClienteRoutes');
const perfilRoutes = require('./routes/PerfilRoutes');



//forma de ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with, authorization");
    next(); // Important
});


// rotas API
app.use('/cliente', clienteRoutes);
app.use('/perfil', perfilRoutes);

// rota Inicial (endpoint)
app.get('/', (req, res) =>{

    res.json({message: "Olá Express!"});

});


// string conexão
// mongodb+srv://AgroTI:AgroTI_2022@cluster0.w4e3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


//entregar uma porta de conexao
const DB_USUARIO = 'AgroTI';
const DB_PASSWORD = encodeURIComponent('AgroTI_2022');
const DB_DATABASE = 'AgroTI_DB';

mongoose.connect(`mongodb+srv://${DB_USUARIO}:${DB_PASSWORD}@cluster0.w4e3f.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectado com o MongoDB");
    app.listen(3000);
})
.catch((error) => console.log(error));
