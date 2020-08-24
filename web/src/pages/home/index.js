import React from 'react';

import { FiGithub, FiLogOut } from "react-icons/fi";
import './styles.css';

import fotoPerfil from "../../assets/foto_perfil.png"
import imgPost from "../../assets/post-exemplo.jpg"
import { signOut } from "../../services/security"
import { useHistory } from "react-router-dom";

function Home() {

    const history = useHistory();

    return (
    <div className="container">
        <header className="header">
            <div><h1>SENAI OVERFLOW</h1></div>
            <div><input type="search" placeholder="Pesquisar uma Duvida"/></div>
            <div>
                <button 
                    className="btnSair" 
                    onClick={() => {
                        signOut();
                        history.replace("/");
                    }}
                >
                    Sair <FiLogOut/> 
                </button>
            </div>
        </header>
        <div className="content">
            <section className="profile">
                <img src={fotoPerfil} alt="Foto de Perfil"/>
                <a href="#">Editar Foto</a>
                <strong>Nome</strong>
                <p>Aluno 1</p>
                <strong>e-mail</strong>
                <p>test.email@gmail.com</p>
                <strong>Ra</strong>
                <p>11235813</p>
            </section>
            <section className="feed">
                <div className="card-post">
                    <header>
                        <img src={fotoPerfil} alt="Foto de Perfil"/>
                        <strong>Aluno 2</strong>
                        <p> em 25/05/2020 ás 12:48</p>
                        <FiGithub className="icon" size={20}/>
                    </header>
                    <body>
                        <strong>Como funciona o RGB?</strong>
                        <p>
                            Estou tentando colorir uma div, e me indicaram usar o rgb, mas eu não sei como funciona.
                        </p>
                        <img src={imgPost} alt="imagem Post"/>
                    </body>
                    <footer>
                        <h1>Comentarios</h1>
                        <section className="containerComentario">
                            <header>
                                <img src={fotoPerfil} alt="Foto do Perfil"/>
                                <strong>Aluno 3</strong>
                                <p> em 25/05/2020 ás 15:24</p>
                            </header>
                            <p>
                                Um valor de cor RGB é especificado com: rgb (vermelho, verde, azul).<br/>
                                Cada parâmetro (vermelho, verde e azul) define a intensidade da cor
                                como um número inteiro entre 0 e 255.<br/>
                                Por exemplo, rgb (0, 0, 255) é renderizado como azul, porque o parâmetro
                                azul é definido com seu valor mais alto (255) e os outros são definidos como 0.
                            </p>
                        </section>
                        <section className="containerComentario">
                            <header>
                                <img src={fotoPerfil} alt="Foto do Perfil"/>
                                <strong>Aluno 1</strong>
                                <p> em 25/05/2020 ás 16:14</p>
                            </header>
                            <p>
                                Em HTML, uma cor pode ser especificada como um valor RGB, usando esta fórmula:<br/>
                                rgb ( vermelho, verde , azul )<br/>
                                Cada parâmetro (vermelho, verde e azul) define a intensidade da cor com um valor entre 0 e 255.
                            </p>
                        </section>
                    </footer>
                </div>
            </section>
        </div>
    </div>
    );
    }

export default Home;