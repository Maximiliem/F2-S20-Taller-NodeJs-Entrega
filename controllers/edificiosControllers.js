const edificiosModel = require("../models/edificiosModel");

const getEdificios = async (req, res)=>{
    const edificios = await edificiosModel.getEdificios();
    res.json(edificios);
};


const getEdificiosById = async (req, res)=>{
    const id = parseInt(req.params.id);
    const user = await edificiosModel.getEdificiosById(id);
    if (user){
        res.json(user);
    } else {
        res.status(404).json({message: "Usuario no encontrado"});
    }
};

const createEdificio = async (req, res) => {
    const createdEdificio = await edificiosModel.createEdificio(req.body);
    if(createdEdificio){
        res.json(createdEdificio);
    } else {
        res.status(500).json({message: "Se rompió el servidor"});
    }
};

const updateEdificio = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await edificiosModel.getEdificiosById(id);
    if (user) {
        const updatedEdificio = await edificiosModel.updateEdificio(parseInt(req.params.id),{
            ...user,
            ...req.body,
        });

        if (updatedEdificio){
            res.json(updatedEdificio);
        } else {
            res.status(500).json({message: "Se rompió el servidor"});
        }
    } else {
        res.status(404).json({message: "Usuario no encontrado"});
    }
};

const deleteEdificio = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await edificiosModel.getEdificiosById(id);
    if (user) {
        const result = await edificiosModel.deleteEdificioById(parseInt(req.params.id));

        if (result) {
            res.json(user);
        } else {
            res.status(500).json({message: "Se rompió el servidor"});
        }
    } else {
        res.status(404).json({message: "Usuario no encontrado"});
    }
};

module.exports = {
    getEdificios,
    getEdificiosById,
    createEdificio,
    updateEdificio,
    deleteEdificio,
}