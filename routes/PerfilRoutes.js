const router = require('express').Router();
const Perfil = require('../models/Perfil');
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

// GET
router.get('/', authentication, async (req, res) => {

    try {
        
        const perfil = await Perfil.find();


        res.status(200).json({isSuccess: true, data: perfil, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

})

router.get('/Perfil=:perfil', authentication, async (req, res) => {

    const user = req.params.perfil;

    try {
        
        const perfil = await Perfil.findOne({usuario: user});
        
        if(!perfil)
            res.status(200).json({isSuccess: true, data: Perfil, message: 'Nenhum Perfil encontrado'});


        res.status(200).json({isSuccess: true, data: Perfil, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

});

router.get('/:id', authentication, async (req, res) => {

    const user = req.params.id;

    try {
        
        const Perfil = await Perfil.findOne({_id: user});
        
        if(!Perfil)
            res.status(200).json({isSuccess: true, data: Perfil, message: 'Nenhum Perfil encontrado'});


        res.status(200).json({isSuccess: true, data: Perfil, message: null});

    } catch (error) {
        res.status(500).json({message: error})
    }

});

// POST
router.post('/Cadastro', authentication, async (req, res) => {

    const { nome, identificador} = req.body;

    const perfil = { nome, identificador };

    console.log(res)
    //create
    try {
        
        const c = await Perfil.findOne({nome: Perfil.nome});
        const cl = await Perfil.findOne({identificador: Perfil.identificador});

        if(c || cl)
            res.status(500).json({isSuccess: false, data: Perfil, message: 'Perfil já cadastrado!'});

        await Perfil.create(perfil)

        res.status(201).json({isSuccess: true, message: 'Cadastro realizado com sucesso!'});


    } catch (error) {
        res.status(500).json({message: error})
        console.log(error)

    }
});


// PUT
router.put('/:id', authentication, async (req, res) => {

    const id = rq.params.id;
    const { nome, identificador } = req.body;
    const perfil = { nome, identificador };

    //update
    try {
        
        const perfilUpdate = await Perfil.updateOne({_id: id}, Perfil)

        if(perfilUpdate.matchedCount == 0){
            res.status(422).json({isSuccess: false, data: perfilUpdate, message: 'Nenhum Perfil encontrado'});
            return;
        }

        res.status(200).json({isSuccess: true, data: perfilUpdate, message: 'Update realizado com sucesso!'});

    } catch (error) {
        res.status(500).json({message: error})
    }
});


// DELETE
router.delete('/:id', authentication, async (req, res) => {

    const user = req.params.id;

    try {
        
        const perfil = await Perfil.findOne({_id: user});
        
        if(!perfil){
            res.status(422).json({isSuccess: false, data: perfil, message: 'Nenhum Perfil encontrado'});
            return;
        }

        await Perfil.deleteOne({_id: user});
            res.status(200).json({isSuccess: true, data: null, message: 'Delete realizado com sucesso!'});

    } catch (error) {
        res.status(500).json({message: error})
    }
});


module.exports = router;

