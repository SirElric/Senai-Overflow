import React, { useState } from 'react';

import {
    Container, 
    ImageCropped, 
    Form, 
    Titulo, 
    Subtitulo, 
    InputGroup,
    Button
} from "./style";

import foto from "../../assets/foto.jpg"

const Login = () => {
    return (
        <Container>
            <ImageCropped>
                <img src={foto} alt="Imagem Capa"/>
            </ImageCropped>
            <Form>
                <Titulo>SENAI OVERFLOW</Titulo>
                <Subtitulo>Compartilhe suas duvidas</Subtitulo>
                <InputGroup>
                    <label> E-mail </label>
                    <input type="text" placeholder="Insira seu e-mail" />
                </InputGroup>
                <InputGroup>
                    <label> Senha </label>
                    <input type="password" placeholder="Insira sua senha" />
                </InputGroup>
                <Button>
                    Entrar
                </Button>
                <Button>
                    Registrar-se
                </Button>
            </Form>
        </Container>
    );
};

export default Login;