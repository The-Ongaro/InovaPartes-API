import { alterarStatusPedido, cadastrarPedido, deletarPedido, listarPedidos, listarStatusPedidos } from '../repository/pedidoRepository.js';

import { Router } from 'express';
const server = Router();

server.post('/pedido', async (req, resp) => {
    try {
        const pedidos = req.body;

        if(!pedidos.cliente == undefined || pedidos.cliente <= 0)
            throw new Error('Cliente inválido.');

        if(pedidos.produto == undefined || pedidos.produto <= 0)
            throw new Error('Produto inválido.');

        if(pedidos.cartao == undefined || pedidos.cartao <= 0)
            throw new Error('Cartão não cadastrado.');

        if(pedidos.endereco == undefined || pedidos.endereco <= 0)
            throw new Error('Endereço inválido.');

        if(pedidos.quantidade == undefined || pedidos.quantidade < 0)
            throw new Error('Quantidade inválida.');

        if(!pedidos.status)
            throw new Error('Status inválido.');

        const pedidosCadastrados = await cadastrarPedido(pedidos);
        resp.send(pedidosCadastrados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/pedido', async (req, resp) =>{
    try {
        const dados = await listarPedidos();
        if(dados.length === 0)
            throw new Error('Nenhum pedido cadastrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/pedido/busca', async (req, resp) => {
    try {
        const {status} = req.query;
        const resposta = await listarStatusPedidos(status);
        
        if(resposta.length === 0)
            throw new Error('Não há nenhum status correspondente.');

        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/pedido/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        if(!status)
        throw new Error('Status inválido.');

        const resposta = await alterarStatusPedido(status, id);
        if(resposta !== 1)
            throw new Error('Não foi possível alterar o status do pedido.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/pedido/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarPedido(id);

        if(resposta !== 1)
            throw new Error('Não foi possível deletar o pedido.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;