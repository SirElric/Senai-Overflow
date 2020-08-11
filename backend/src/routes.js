

const express = require('express');

const routes = express.Router();

const alunoController = require('./controller/aluno');
const postagemController = require('./controller/postagem');
const comentarioController = require('./controller/comentario');

routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

routes.get("/postagens", postagemController.index);
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;


