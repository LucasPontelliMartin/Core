const cliente = require('../models/Cliente')
const clienteRoutes = require('../routes/ClienteRoutes')

describe('Cliente', () => {

    test('Teste de Login', () =>{
        expect(clienteRoutes.post('/Login', cliente))
    });

    test('Listar Dados de Clientes da base', () =>{
        expect(clienteRoutes.get('/'))
    });

    test('Listar Dados de Clientes filtrando por Usuario', () =>{
        expect(clienteRoutes.get('/Usuario=LucasPontelli'))
    });
    
    test('Listar Dados de Clientes filtrando por E-mail', () =>{
        expect(clienteRoutes.get('/Email=pontelli.lucas@gmail.com'))
    });
    
    test('Listar Dados de Clientes filtrando por id', () =>{
        expect(clienteRoutes.get('/5'))
    });
    
    test('Teste Cadastro', () =>{
        expect(clienteRoutes.post('/Cadastro', cliente))
    });

    test('Realizar Update de Clientes passando Id e o model de Cliente', () =>{
        expect(clienteRoutes.put('/2', cliente))
    });

    test('Realizar Delete de Clientes passando Id', () =>{
        expect(clienteRoutes.delete('/2'))
    });
});