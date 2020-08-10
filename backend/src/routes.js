

const express = require('express');

const routes = express.Router();

const alunoController = require('./controller/aluno');
const postagemController = require('./controller/postagem');

routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

module.exports = routes;


