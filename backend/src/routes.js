

const express = require('express');

const routes = express.Router();

const alunoController = require('./controller/aluno');

routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

module.exports = routes;


