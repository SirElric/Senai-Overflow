

const Aluno = require("../models/Aluno");
const { Op } = require("sequelize");

module.exports = {
    async listar(req, res) {

        const alunos = await Aluno.findAll();

        res.send(alunos);

    },

    async buscarPorId(req, res) {

        const {id} = req.params;

        let aluno = await Aluno.findByPk(id, {raw: true});

        if (!aluno) {
            return res.status(404).send({erro: "Aluno não encontrado!"});
        }

        delete aluno.senha;

        res.send(aluno);

    },

    async store(req,res){

        const { ra, nome, email, senha } = req.body;

        let aluno = await Aluno.findOne({
            where: {
                [Op.or]: [
                    {ra: ra},{email: email},
                ],
            },
        });

        if (aluno) {
            return res.status(400).send({erro: "Aluno ja cadastrado!"});
        }

        aluno = await Aluno.create({ ra, nome, email, senha });

        res.status(201).send(aluno);
    },

    update(){},

    delete(){},
}