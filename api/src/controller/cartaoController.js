import { alterarInfoCartao, cadastrarCartao, deletarInfoCartao, listarInfoCartao } from '../repository/cartaoRepository.js'

import { Router } from "express";
const server = Router();

server.post('/cartao', async (req, resp) => {
    try {
        const cartao = req.body;

        if(cartao.cliente == undefined || cartao.cliente <= 0)
            throw new Error('Cliente não cadastrado.');

        if(!cartao.titular)
            throw new Error('Titular inválido.');

        if(!cartao.numero)
            throw new Error('Número de cartão inválido.');

        if(!cartao.validade)
            throw new Error('Validade inválido.');

        if(cartao.codSeguranca == undefined || isNaN(cartao.codSeguranca))
            throw new Error('Código de Segurança inválido.');

        if(cartao.parcelas == undefined || isNaN(cartao.parcelas))
            throw new Error('Parcela inválida.');

        const cartaoCadastrado = await cadastrarCartao(cartao);
        resp.send(cartaoCadastrado);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/cartao', async (req, resp) => {
    try {
        const dados = await listarInfoCartao();
        if(dados.length === 0)
            throw new Error('Não há nenhum cartão cadastrado.');

        resp.send(dados);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/cartao/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const cartao = req.body;

        if(!cartao.titular)
            throw new Error('Titular inválido.');

        if(!cartao.numero)
            throw new Error('Número de cartão inválido.');

        if(!cartao.validade)
            throw new Error('Validade inválido.');

        if(cartao.codSeguranca == undefined || isNaN(cartao.codSeguranca))
            throw new Error('Código de Segurança inválido.');

        if(cartao.parcelas == undefined || isNaN(cartao.parcelas))
            throw new Error('Parcela inválida.');

        const resposta = await alterarInfoCartao(id, cartao);
        if(resposta !== 1)
            throw new Error('As informações do cartão não podem ser alteradas.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/cartao/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarInfoCartao(id);
        if(resposta.length === 0)
            throw new Error('Não foi possível deletar as informações do cartaõ.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;