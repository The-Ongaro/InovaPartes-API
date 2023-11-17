import { alterarQtdCarrinho, deletarItensCarrinho, inserirItemCarrinho, listarItensCarrinho, removerItemCarrinho } from "../repository/carrinhoRepository.js";

import { Router } from "express";
const server = Router();


server.post('/carrinho',  async (req, resp) => {
    try {
        const inserir = req.body;

        if(inserir.cliente == undefined || inserir.cliente <= 0)
            throw new Error('Usuário inválido.');

        if(inserir.produto == undefined || inserir.produto <= 0)
            throw new Error('Produto inválido.');

        if(inserir.qtd == undefined || inserir.qtd <= 0)
            throw new Error('Quantidade inválida.');

        const itemInserido = await inserirItemCarrinho(inserir);
        resp.send(itemInserido);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/carrinho/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const dados = await listarItensCarrinho(id);

        if(dados.length === 0)
            throw new Error('Não há itens no carrinho.');

        resp.send(dados);

    } catch (err) {
        resp.send({
            erro: err.message
        });
    }
})

server.put('/carrinho/:qtd/:idCliente/:idProduto', async (req, resp) => {
    try {
        const {qtd, idCliente, idProduto} = req.params;

        const alteracao = await alterarQtdCarrinho(qtd, idCliente, idProduto);
        if(alteracao !== 1)
            throw new Error('Não foi possível alterar a quantidade do produto.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/carrinho/produto/:idCliente/:idProduto', async (req, resp) => {
    try {
        const {idCliente, idProduto} = req.params;
        const resposta = await removerItemCarrinho(idCliente, idProduto);

        if(resposta !== 1)
            throw new Error('Não foi possível remover o item do carrinho.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/carrinho/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarItensCarrinho(id);

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;
