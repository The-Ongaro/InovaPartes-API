import { alterarEndereco, cadastrarEndereco, deletarEnd, listarEndCliente } from '../repository/enderecoRepository.js';

import { Router } from 'express';
const server = Router();

server.post('/endereco', async (req, resp) => {
    try {
        const endereco = req.body;

        if(endereco.cliente == undefined || endereco.cliente < 0)
            throw new Error('Usuário inválido.');

        if(!endereco.logradouro)
            throw new Error('Endereço inválido.');

        if(endereco.numCasa == undefined || endereco.numCasa < 0)
            throw new Error('Número inválido.');

        if(endereco.complemento == undefined)
            throw new Error('Complemento inválido.');

        if(!endereco.cep)
            throw new Error('CEP inválido.');

        if(!endereco.bairro)
            throw new Error('Bairro inválido.');

        if(!endereco.cidade)
            throw new Error('Cidade inválida.');

        if(!endereco.estado)
            throw new Error('Estado inválido');

        const enderecoCadastrado = await cadastrarEndereco(endereco);
        resp.send(enderecoCadastrado);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/endereco', async (req, resp) => {
    try {
        const dados = await listarEndCliente();

        if(dados.length === 0)
            throw new Error('Nenhum endereço cadastrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/endereco/:id', async (req, resp) =>{
    try {
        const {id} = req.params;
        const endereco = req.body;

        if(!endereco.logradouro)
            throw new Error('Endereço inválido.');

        if(endereco.numCasa == undefined || endereco.numCasa < 0)
            throw new Error('Número inválido.');

        if(endereco.complemento == undefined)
            throw new Error('Complemento inválido.');

        if(!endereco.cep)
            throw new Error('CEP inválido.');

        if(!endereco.bairro)
            throw new Error('Bairro inválido.');

        if(!endereco.cidade)
            throw new Error('Cidade inválida.');

        if(!endereco.estado)
            throw new Error('Estado inválido');

        const resposta = await alterarEndereco(id, endereco);
        if(resposta !== 1)
            throw new Error('O endereço não pode ser alterado.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/endereco/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarEnd(id);
        if(resposta !== 1)
            throw new Error('Não foi possível deletar esse endereço.');

        resp.status(204).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;