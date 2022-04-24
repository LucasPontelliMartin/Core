const mongoose = require('mongoose');

const Cliente = mongoose.model('Cliente', {
    nome: String,
    email: String,
    dataNascimento: Date,
    usuario: String,
    senha: String,
    Ativo: Boolean,
    perfil: Number
});

module.exports = Cliente;