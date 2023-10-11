import { alterarEndereco, alterarImgCliente, alterarInfoCliente, buscarPorCpf, buscarPorNomeCpf, cadastrarPedidos, cadastroCliente, deletarCliente, cadastrarEndereco, listarEndCliente, listarclientes, loginCliente, cadastrarCartao, listarInfoCartao, alterarInfoCartao, listarPedidos, deletarInfoCartao, listarStatusPedidos } from "../repository/usuarioRepository.js";

import { Router } from "express";
import multer from 'multer';

const server = Router();
const upload = multer({dest: 'storage/usuarioPerfil'});

// ENDPOINTS CLIENTE.
server.post('/usuario', async (req, resp) => {
    try {
        const cadastrar = req.body;
        
        if(!cadastrar.nome)
            throw new Error('Nome inválido.');

        const buscarCpf = await buscarPorCpf(cadastrar.cpf)
        if(buscarCpf.length > 0 || cadastrar.cpf == undefined)
            throw new Error('CPF já cadastrado.');

        if(!cadastrar.telefone)
            throw new Error('Telefone Inválido.');

        if(!cadastrar.email)
            throw new Error('E-mail inválido.');

        if(!cadastrar.senha)
            throw new Error('Senha inválida.');

        const usuarioCadastrado = await cadastroCliente(cadastrar);
        resp.send(usuarioCadastrado);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/usuario/:id/perfil', upload.single('perfil'), async (req, resp) => {
    try {
        const {id} = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImgCliente(imagem, id);
        if(resposta != 1)
            throw new Error('A imagem não pode ser alterada.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

// ARRUMAR VALIDAÇÃO.
server.post('/usuario/login', async (req, resp) => {
    try {
        const {email, senha} = req.body;
        const resposta = await loginCliente(email, senha);

        if(!resposta)
            throw new Error('Credenciais inválidas.')

        resp.send(resposta);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
})

server.get('/usuario', async (req, resp) => {
    try {
        const dados = await listarclientes();
        if(dados.length == 0)
            throw new Error('Nenhum usuário cadastrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
})

// ARRUMAR VALIDAÇÃO.
server.get('/usuario/busca', async (req, resp) => {
    try {
        const {nome, cpf} = req.query;
        const resposta = await buscarPorNomeCpf(nome, cpf);

        if(resposta.length === 0)
            throw new Error('Usuário não cadastrado.');

        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const cliente = req.body;

        if(!cliente.nome)
            throw new Error('Nome inválido.');

        const buscarCpf = await buscarPorCpf(cliente.cpf)
        if(buscarCpf.length > 0 || cliente.cpf == undefined)
            throw new Error('CPF já cadastrado.');

        if(!cliente.telefone)
            throw new Error('Telefone Inválido.');

        if(!cliente.email)
            throw new Error('Email inválido.');

        if(!cliente.senha)
            throw new Error('Senha inválida.');

        const resposta = await alterarInfoCliente(id, cliente);
        if(resposta != 1)
            throw new Error('Usuario não pode ser alterardo.');

        resp.status(200).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.delete('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarCliente(id);

        if(resposta != 1)
            throw new Error('O cliente não pode ser deletado.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

// ENDPOINTS CARTÃO CLIENTE.
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
        if(resposta != 1)
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


// ENDPOINTS ENDEREÇO CLIENTE.
server.post('/endereco', async (req, resp) => {
    try {
        const endereco = req.body;

        if(endereco.cliente == undefined || endereco.cliente < 0)
            throw new Error('Usuário inválido.');

        if(!endereco.logradouro)
            throw new Error('Endereço inválido.');

        if(endereco.numCasa == undefined || endereco.numCasa < 0)
            throw new Error('Número inválido.');

        if(!endereco.complemento)
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

        if(!endereco.complemento)
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
        if(resposta != 1)
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
        const resposta = await deletarCliente(id);
        if(resposta != 1)
            throw new Error('Não foi possível deletar esse endereço.');

        resp.status(204).send();
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

// ENDPOINTS PEDIDO CLIENTE
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

        const pedidosCadastrados = await cadastrarPedidos(pedidos);
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
            throw new Error('Status inválido.');

        resp.send(resposta);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;