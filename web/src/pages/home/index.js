import React, { useEffect, useState } from 'react';

import { FiGithub, FiLogOut } from "react-icons/fi";
import './styles.css';

import fotoPerfil from "../../assets/foto_perfil.png"
import imgPost from "../../assets/post-exemplo.jpg"
import { signOut, getAluno } from "../../services/security"
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import Alerts from "../../components/Alerts";
import Popup from "../../components/PopUp";

const CardPost = ({ post }) => {

    const [mostrarComentarios, setMostrarComentarios] = useState(false);

    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    
    const carregarComentarios = async () => {
        try {
            if(!mostrarComentarios){
                const retorno = await api.get(`postagens/${post.id}/comentarios`);
                setComentarios(retorno.data);
            }
            setMostrarComentarios(!mostrarComentarios);
        } catch (error) {
            
        }
    };

    const criarComentario = async (e) => {
        e.preventDefault();

        try {
            const retorno = await api.post(`/postagens/${post.id}/comentarios`, {
                descricao: novoComentario,
            });

            let comentario = retorno.data;

            comentario.Aluno = getAluno();

            setComentarios([...comentarios, comentario]);

            setNovoComentario("");

        } catch (erro) {
            console.log(erro);
        }
    };

    return (
        <div className="card-post">
            <header>
                <img src={fotoPerfil} alt="Foto de Perfil"/>
                <strong>{post.Aluno.nome}</strong>
                <p> {post.createdAt}</p>
                {post.gists && (<FiGithub className="icon" size={20}/>)}
            </header>
            <section>
                <strong>{post.titulo}</strong>
                <p>
                   {post.descricao}
                </p>
                <img src={imgPost} alt="imagem Post"/>
            </section>
            <footer>
                <h1 onClick={carregarComentarios}>Comentarios</h1>
                {mostrarComentarios && (
                    <>
                        {comentarios.length === 0 && (<p>Seja o primeiro a comentar!</p>)}
                        {comentarios.map((c) => (
                            <section key={c.id}>
                                <header>
                                    <img src={fotoPerfil} alt="Foto do Perfil"/>
                                    <strong>{c.Aluno.nome}</strong>
                                    <p> {c.created_at}</p>
                                </header>
                                <p>
                                    {c.descricao}
                                </p>
                            </section>
                        ))}
                        <form className="novo-comentario" onSubmit={criarComentario}>
                            <textarea 
                                value={novoComentario} 
                                onChange={(e) => {
                                    setNovoComentario(e.target.value);
                                }} 
                                placeholder="Comente essa dúvida!" 
                                required
                            >

                            </textarea>
                            <button>Enviar</button>
                        </form>
                    </>
                    )
                }
                
            </footer>
        </div>
    );
};

const NovaPostagem = ({ setMostrarNovaPostagem}) => {

    const [novaPostagem, setNovaPostagem] = useState({
        titulo: "",
        descricao: "",
        gists: "",
    });

    const fechar = () => {
        const {titulo, descricao, gists} = novaPostagem;

        if ((titulo || descricao || gists) && !window.confirm("Tem certeza que quer abandonar a duvida?")) {
            return;
        }

        setMostrarNovaPostagem(false);
    }

    const handlerInput = (e) => {
        setNovaPostagem({...novaPostagem, [e.target.id]: e.target.value});
    };

    return (<Popup>
        <form className="nova-postagem">
            <span onClick={fechar}>&times;</span>
            <h1>Publique sua duvida</h1>
            <label>Titulo</label>
            <input type="text" id="titulo" placeholder="Sobre oque é sua duvida" onChange={handlerInput}/>
            <label>Descrição</label>
            <textarea id="descricao" placeholder="Descreva em detalhes, o que te aflinge?" onChange={handlerInput}></textarea>
            <label>Gists<em>(Opcional)</em></label>
            <input type="text" id="gists" placeholder="https://gist.github.com/..." onChange={handlerInput}/>
            <label>imagem<em>(Opcional)</em></label>
            <input type="file"/>
            <img alt="preview"/>
            <button>Enviar</button>
        </form>
    </Popup>)
};

function Home() {

    const history = useHistory();

    const [mensagem, setMensagem] = useState("");
    const [postagens, setPostagens] = useState([]);
    const [mostrarNovaPostagem, setMostrarNovaPostagem] = useState(false);

    useEffect(() => {
       const carregarPostagem = async () => {
           try {
               const retorno = await api.get("/postagens");

               setPostagens(retorno.data);
           } catch (erro) {
            if(erro.response){
                return setMensagem(erro.response.data.erro);
            }

            setMensagem("Ops, algo deu errado, tente novamente.")
            }
       }

       carregarPostagem();
    },[]);

    const alunoSessao = getAluno();

    return (
    <div className="container">
        <Alerts mensagem={mensagem} setMensagem={setMensagem} tipo="erro"/>
        {mostrarNovaPostagem && <NovaPostagem setMostrarNovaPostagem={setMostrarNovaPostagem}/>}
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
                <label >Editar Foto</label>
                <strong>Nome</strong>
                <p>{alunoSessao.nome}</p>
                <strong>Ra</strong>
                <p>{alunoSessao.ra}</p>
            </section>
            <section className="feed">
                {postagens.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))};
            </section>
            <section className="actions">
                <button onClick={() => {
                    setMostrarNovaPostagem(true);
                }}>Nova Postagem</button>
            </section>
        </div>
    </div>
    );
};

export default Home;