import React, { useState } from 'react';

import {
    Container, 
    ImageCropped, 
    Form, 
    Titulo, 
    Subtitulo, 
    InputGroup,
    Button,
} from "./styles";

import foto from "../../assets/foto.jpg";
import { api } from '../../services/api';
// import Alerts from "../../components/Alerts";
import { useHistory } from 'react-router-dom';
import { signIn } from '../../services/security';

const FormLogin = (props) => {

    const history = useHistory();

    const [alunoLogin, setAlunoLogin] = useState({
        email: "",
        senha: ""
    });

    const entrar = async (e) => {
        e.preventDefault();

        try {
            const retorno = await api.post("/sessao", alunoLogin);

            if (retorno.status === 201) {
                // window.alert("Logado com sucesso!");

                signIn(retorno.data);

                return history.push("/home");

            }

        } catch (erro) {
            if(erro.response){
                window.alert(erro.response.data.erro);
            }

            window.alert("Ops, algo deu errado, tente novamente.")
        }
        
    }; 

    const handlerInput = (e) => {
        setAlunoLogin({...alunoLogin, [e.target.id]: e.target.value});

    }

    return (
        <Form onSubmit={entrar}>
                {/* <Alerts mensagem=""/> */}
                <Titulo>SENAI OVERFLOW</Titulo>
                <Subtitulo>Compartilhe suas duvidas</Subtitulo>
                <InputGroup>
                    <label> E-mail </label>
                    <input 
                        type="email" 
                        id="email" 
                        onChange={handlerInput} 
                        value={alunoLogin.email} 
                        placeholder="Insira seu e-mail" 
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label> Senha </label>
                    <input 
                        type="password" 
                        id="senha" 
                        onChange={handlerInput} 
                        value={alunoLogin.senha} 
                        placeholder="Insira sua senha" 
                        required
                    />
                </InputGroup>
                <Button type="submit">
                    Entrar
                </Button>
                <Button type="button" onClick={() => {
                    props.mostrarForm("registrar");
                }}>
                    Registrar-se
                </Button>
            </Form>
    )
};

const FormRegistrar = (props) => {

    const [alunoRegistrar, setAlunoRegistrar] = useState({
        ra: "",
        nome: "",
        email: "",
        senha: "",
    });

    const registrar = async (e) => {
        e.preventDefault();

        try {
            const retorno = await api.post("/alunos", alunoRegistrar);

            if (retorno.status === 201) {
                window.alert("Registrado com sucesso!");

            }

        } catch (erro) {
            if(erro.response){
                window.alert(erro.response.data.erro);
            }

            window.alert("Ops, algo deu errado, tente novamente.")
        }
        
    }; 

    const handlerInput = (e) => {
        setAlunoRegistrar({...alunoRegistrar, [e.target.id]: e.target.value});

    }

    return (
        <Form onSubmit={registrar}>
                <Titulo>SENAI OVERFLOW</Titulo>
                <Subtitulo>Compartilhe suas duvidas</Subtitulo>
                <InputGroup>
                    <label> RA </label>
                    <input 
                        type="number" 
                        id="ra" 
                        onChange={handlerInput} 
                        value={alunoRegistrar.ra} 
                        placeholder="Insira seu ra" 
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label> Nome </label>
                    <input 
                        type="text" 
                        id="nome" 
                        onChange={handlerInput} 
                        value={alunoRegistrar.nome} 
                        placeholder="Insira seu nome" 
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label> E-mail </label>
                    <input 
                        type="email" 
                        id="email" 
                        onChange={handlerInput} 
                        value={alunoRegistrar.email} 
                        placeholder="Insira seu e-mail" 
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label> Senha </label>
                    <input 
                        type="password" 
                        id="senha" 
                        onChange={handlerInput} 
                        value={alunoRegistrar.senha} 
                        placeholder="Insira sua senha" 
                        required
                    />
                </InputGroup>
                <Button type="submit">
                    Enviar
                </Button>
                <Button type="button" onClick={() => {
                    props.mostrarForm("login");
                }}>
                    ja tenho cadastro
                </Button>
            </Form>
    )
};

const Login = () => {

    const [mostrarForm, setMostrarForm] = useState("login");
    
    return (
        <Container>
            <ImageCropped>
                <img src={foto} alt="Imagem Capa"/>
            </ImageCropped>
            {mostrarForm === "login" ? (<FormLogin mostrarForm={setMostrarForm}/>) : (<FormRegistrar mostrarForm={setMostrarForm}/>)}
        </Container>
    );
};

export default Login;