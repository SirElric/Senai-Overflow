

const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");


module.exports = {

    async index(req, res){

        const postagens = await Postagem.findAll({
            include: {
                association: "Aluno",
                attributes: ["id", "nome", "ra"],
            },
            order: [["created_at", "DESC"]],
        });

        res.send(postagens);

    },

    async store(req, res){

        const created_aluno_id = req.alunoID;

        const { titulo, descricao, imagem, gists } = req.body;

        try {

            const aluno = await Aluno.findByPk(created_aluno_id);

            if (!aluno) {
                res.status(404).send({erro: "Aluno não encontrado!"});
            };

            let postagem = await aluno.createPostagem({
                titulo, 
                descricao, 
                imagem, 
                gists, 
            });
    
            res.status(201).send(postagem);

        } catch (error) {
            return res
                .status(500)
                .send({erro: "Não foi possivel criar postagem. tente novamente mais tarde!"});
        }

    },

    async delete(req, res) {

        const created_aluno_id = req.alunoID;

        const { id } = req.params;

        let postagem = await Postagem.findByPk(id);

        if (!postagem) {
            return res.status(404).send({erro: "Postagem não encontrada!"});            
        };

        if (postagem.created_aluno_id != created_aluno_id) {
            return res.status(401).send({erro: "você não tem autorização para excluir essa postagem!"});
        };

        await postagem.destroy();

        res.status(204).send();

    }

};