const mongoose = require('mongoose');

const Perfil = mongoose.model('Cliente', {
    nome: String,
    identificador: Number
});

module.exports = Perfil;