const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auto.json");

module.exports = {

    async store(req, res){

        const {email, senha} = req.body;

        const aluno = await Aluno.findOne({
            where: {
                email,
            },
        });

        if (!aluno || !bcrypt.compareSync(senha, aluno.senha)) {
            return res.status(403).send({erro: "Email e/ou Senha incorretos!"});
        }

        const token = jwt.sign(
            {alunoID: aluno.id},
            authConfig.secret,    
        );

        res.status(201).send({
            aluno: {
                alunoID: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra,
            },
            token,

        });

    },

};