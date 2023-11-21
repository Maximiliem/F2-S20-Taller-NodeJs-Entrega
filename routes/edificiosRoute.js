const express = require('express');
const edificiosRouter = express.Router();
const edificiosController = require("../controllers/edificiosControllers");

edificiosRouter.get("/", edificiosController.getEdificios);

edificiosRouter.get("/:id", edificiosController.getEdificiosById);

edificiosRouter.post("/", edificiosController.createEdificio);

edificiosRouter.put("/:id", edificiosController.updateEdificio);

edificiosRouter.delete("/:id", edificiosController.deleteEdificio);

module.exports = edificiosRouter;

