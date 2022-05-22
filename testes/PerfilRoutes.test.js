const perfil = require('../models/Perfil')
const perfilRouter = require('../routes/PerfilRoutes')

describe('Perfil', () => {

    test('Listar Dados de Perfil da base', () =>{
        expect(perfilRouter.get('/'))
    });

    test('Listar Filtro de Perfil da base por Nome', () =>{
        expect(perfilRouter.get('/perfil=Administrador'))
    });

    test('Listar Filtro de Perfil da base por Id', () =>{
        expect(perfilRouter.get('/2'))
    });

    test('Realizar Cadastro de Perfil passando o model de perfil', () =>{
        expect(perfilRouter.post('/Cadastro', perfil))
    });

    test('Realizar Update de Perfil passando Id e o model de perfil', () =>{
        expect(perfilRouter.put('/2', perfil))
    });

    test('Realizar Delete de Perfil passando Id', () =>{
        expect(perfilRouter.delete('/2'))
    });
});