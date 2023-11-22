import { alterarComentarioCliente, deletarComentario, inserirComentario, listarComentarioCliente, listarComentarioProd, listarComentarios } from '../repository/comentariosRepository.js';

import { Router } from 'express';
const server = Router();

server.post('/comentario', async (req, resp) => {
    try {
        const inserir = req.body;

        if(inserir.produto == undefined || inserir.produto <= 0)
            throw new Error('Usuário inválido.');

        if(inserir.cliente == undefined || inserir.cliente <= 0)
            throw new Error('Produto inválido.');

        if(!inserir.comentario)
            throw new Error('Comentário inválido.');

        const comentarioInserido = await inserirComentario(inserir);
        resp.send(comentarioInserido);

    } catch (err) {
        resp.status(400).send({
            erro:  err.message
        });
    }
})

server.get('/comentario', async (req, resp) => {
    try {
        const dados = await listarComentarios();
        if(dados.length === 0)
            throw new Error('Não há nenhum comentário.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/comentario/:id/cliente', async (req, resp) => {
    try {
        const {id} = req.params;
        const dados = await listarComentarioCliente(id);

        if(dados.length === 0)
            throw new Error('Não há nenhum comentário desse cliente.');

        resp.send(dados); 
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/comentario/:id/produto', async (req, resp) => {
    try {
        const {id} = req.params;
        const dados = await listarComentarioProd(id);

        if(dados.length === 0)
            throw new Error('Não há nenhum comentário para esse produto.');

        resp.send(dados); 
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/comentario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const comentario = req.body;

        if(!comentario)
            throw new Error('Comentário inválido.');

        const resposta = await alterarComentarioCliente(comentario, id);
        if(resposta !== 1)
            throw new Error('Não foi possível alterar o comentário.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/comentario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarComentario(id);
        if(resposta !== 1)
            throw new Error('Não foi possível deletar o comentário.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;