const mongoose = require('mongoose');

const Perfil = mongoose.model('Perfil', {
    nome: String,
    identificador: Number
});

module.exports = Perfil;