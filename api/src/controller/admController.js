import { alterarAdm, alterarImgAdm, buscarPorCpf, cadastrarAdm, deletarAdm, listarAdm, loginAdm } from "../repository/admRepository.js";

import Router from "express";
import multer from "multer";

const server = Router();
const upload = multer({dest: 'storage/admPerfil'});

server.post('/adm', async (req, resp) => {
    try {
        const cadastrar = req.body;

        if(!cadastrar.nome)
            throw new Error('Nome inválido.');

        const buscarCpf = await buscarPorCpf(cadastrar.cpf);
        if(buscarCpf.length > 0)
            throw new Error('CPF já cadastrado.');

        if(!cadastrar.email)
            throw new Error('E-mail inválido.');

        if(!cadastrar.senha)
            throw new Error('Senha inválida.');

        const adminCadastrado = await cadastrarAdm(cadastrar);
        resp.send(adminCadastrado);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/adm/:id/perfil', upload.single('perfil'),async (req, resp) => {
    try {
        const {id} = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImgAdm(imagem, id);
        if(resposta != 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.put('/adm/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const alteracao = req.body;

        if(!alteracao.nome)
            throw new Error('Nome inválido.');

        if(!alteracao.cpf)
            throw new Error('CPF já cadastrado.');

        if(!alteracao.email)
            throw new Error('E-mail inválido.');

        if(!alteracao.senha)
            throw new Error('Senha inválida.');

        const resposta = await alterarAdm(id, alteracao);
        if(resposta != 1)
            throw new Error('Adm não pode ser alterado.');

        resp.status(200).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


server.post('/adm/login', async (req, resp) => {
    try {
        const {email, cpf, senha} = req.body;
        const resposta = await loginAdm(email, cpf, senha);

        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/adm', async (req, resp) =>{
    try {
        const dados = await listarAdm();
        resp.send(dados);
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


server.delete('/adm/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarAdm(id);

        if(resposta != 1)
            throw new Error('Adm não pode ser deletado.')

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})



export default server;