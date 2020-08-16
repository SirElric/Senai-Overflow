

const express = require('express');

const routes = express.Router();

const autorizacaoMid = require('./middleware/autorizacao');

const alunoController = require('./controller/aluno');
const postagemController = require('./controller/postagem');
const comentarioController = require('./controller/comentario');
const sessaoController = require('./controller/sessao');

routes.post("/sessao", sessaoController.store);
routes.post("/alunos", alunoController.store);

routes.use(autorizacaoMid);

routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);

routes.get("/postagens", postagemController.index);
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

routes.post("/postagens/:postId/comentarios", comentarioController.store);
routes.get("/postagens/:postId/comentarios", comentarioController.index);

module.exports = routes;


