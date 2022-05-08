const router = require('express').Router();
const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');
const SECRET = 'AgroTI_Token';



function authentication(req, res, next){
    const token = req.headers['authorization'];
    console.log(token);
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err) return res.status(401).json({isSuccess: false,
        data: null,
        message: "Token não autorizado!!"});

        req.usuarioId = decoded.usuarioId;
        next();
    })
}

// Login
router.post('/login', async (req, res) => {

    const user = req.body.Usuario;
    const password = req.body.Senha;

    try {
        
        const cliente = await Cliente.findOne({usuario: user});

        if(!cliente){
            res.status(200).json({isSuccess: false, data: null, message: 'Usuário e/ou Senha incorretos!'});
            return;
        }

        if(cliente.senha != password){
            res.status(200).json({isSuccess: false, data: null, message: 'Usuário e/ou Senha incorretos!'});
            return;
        }

        const token = jwt.sign({usuarioId: cliente._id}, SECRET, {expiresIn: "1d"});

        res.status(200).json({isSuccess: true, data: {Usuario:cliente, Token: token}, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

})

// GET

router.get('/', authentication, async (req, res) => {

    try {
        
        const cliente = await Cliente.find();


        res.status(200).json({isSuccess: true, data: cliente, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

})

router.get('/Usuario=:usuario', authentication, async (req, res) => {

    const user = req.params.usuario;

    try {
        
        const cliente = await Cliente.findOne({usuario: user});
        
        if(!cliente)
            res.status(200).json({isSuccess: true, data: cliente, message: 'Nenhum cliente encontrado'});


        res.status(200).json({isSuccess: true, data: cliente, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

});

router.get('/Email=:email', authentication, async (req, res) => {

    const user = req.params.email;

    try {
        
        const cliente = await Cliente.findOne({email: user});
        
        if(!cliente)
            res.status(200).json({isSuccess: true, data: cliente, message: 'Nenhum cliente encontrado'});


        res.status(200).json({isSuccess: true, data: cliente, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

});

router.get('/:id', authentication, async (req, res) => {

    const user = req.params.id;

    try {
        
        const cliente = await Cliente.findOne({_id: user});
        
        if(!cliente)
            res.status(200).json({isSuccess: true, data: cliente, message: 'Nenhum cliente encontrado'});


        res.status(200).json({isSuccess: true, data: cliente, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

});

// POST
router.post('/Cadastro', authentication, async (req, res) => {

    const { nome, email, dataNascimento, usuario, senha, Ativo, perfil } = req.body;

    const cliente = { nome, email, dataNascimento, usuario, senha, Ativo, perfil };


    //create
    try {
        
        const c = await Cliente.findOne({usuario: cliente.usuario});
        const cl = await Cliente.findOne({email: cliente.email});

        if(c || cl)
            res.status(500).json({isSuccess: false, data: cliente, message: 'Cliente já cadastrado!'});

        await Cliente.create(cliente)

        res.status(201).json({isSuccess: true, message: 'Cadastro realizado com sucesso!'});

    } catch (error) {
        res.status(500).json({message: error})
    }
});


// PUT
router.put('/:id', authentication, async (req, res) => {

    const id = rq.params.id;
    const { nome, email, dataNascimento, usuario, senha, Ativo, perfil } = req.body;
    const cliente = { nome, email, dataNascimento, usuario, senha, Ativo, perfil };

    //update
    try {
        
        const clienteUpdate = await Cliente.updateOne({_id: id}, cliente)

        if(clienteUpdate.matchedCount == 0){
            res.status(422).json({isSuccess: false, data: clienteUpdate, message: 'Nenhum cliente encontrado'});
            return;
        }

        res.status(200).json({isSuccess: true, data: clienteUpdate, message: 'Update realizado com sucesso!'});

    } catch (error) {
        res.status(500).json({message: error})
    }
});


// DELETE
router.delete('/:id', authentication, async (req, res) => {

    const user = req.params.id;

    try {
        
        const cliente = await Cliente.findOne({_id: user});
        
        if(!cliente){
            res.status(422).json({isSuccess: false, data: cliente, message: 'Nenhum cliente encontrado'});
            return;
        }

        await Cliente.deleteOne({_id: user});
            res.status(200).json({isSuccess: true, data: null, message: 'Delete realizado com sucesso!'});

    } catch (error) {
        res.status(500).json({message: error})
    }
});


module.exports = router;

