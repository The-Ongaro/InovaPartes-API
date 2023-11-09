import { alterarAdm, alterarImgAdm, buscarPorCpfNome, buscarPorEmail, cadastrarAdm, deletarAdm, listarAdm, loginAdm } from "../repository/admRepository.js";

import Router from "express";
import multer from "multer";
import passwordValidator from 'password-validator';

const server = Router();
const upload = multer({dest: 'storage/admPerfil'});


const schema = new passwordValidator();
schema
    .is().min(8, 'A quantidade miníma são 8 caractéres.') // Minimum length 8
    .is().max(100, 'A quantidade máxima é de 100 caractéres.') // Maximum length 100
    .has().uppercase(1, 'Adicione no minímo 1 caractére maiúsculo.') // Must have uppercase letters
    .has().lowercase(1, 'Adicione no minímo 1 caractére minúsculo.') // Must have lowercase letters
    .has().digits(1, 'Adicione no minímo 1 digito numérico.') // Must have at least 2 digits
    .has().not().spaces(true, 'Não adicione espaços na senha.') // Should not have spaces
    // .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    .has().symbols(1, 'Adicione no minímo 1 caractére especial (ex.: @, #, !)') // special character


server.post('/adm', async (req, resp) => {
    try {
        const cadastrar = req.body;

        if(!cadastrar.nome)
            throw new Error('Nome inválido.');

        const buscarCpf = await buscarPorCpfNome(cadastrar.cpf);
        if(buscarCpf.length > 0 || buscarCpf == undefined)
            throw new Error('CPF já cadastrado.');

        const buscarEmail = await buscarPorEmail(cadastrar.email);
        if(buscarEmail.length > 0 || buscarEmail == undefined)
            throw new Error('E-mail já cadastrado.');

        if(!cadastrar.senha)
            throw new Error('Senha inválida.');
        const errorSenha = schema.validate(cadastrar.senha, {details: true});
        if(errorSenha !== 0) {
            for(let item of errorSenha) {
                throw new Error(`${item.message}`);
            }
        }

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
        if(resposta !== 1)
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
            throw new Error('CPF inválido.');

        if(!alteracao.email)
            throw new Error('E-mail inválido.');

        if(!alteracao.senha)
            throw new Error('Senha inválida.');
        const errorSenha = schema.validate(alteracao.senha, {details: true});
        if(errorSenha !== 0) {
            for(let item of errorSenha) {
                throw new Error(`${item.message}`);
            }
        }

        const resposta = await alterarAdm(id, alteracao);
        if(resposta !== 1)
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

        if(!resposta)
            throw new Error('Administrador inválido.');

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

        if(dados.length === 0)
            throw new Error('Nenhum administrador cadastrado.');

        resp.send(dados);
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

server.get('/adm/busca', async (req, resp) => {
    try {
        const {cpf, nome} = req.query;
        const resposta = await buscarPorCpfNome(cpf, nome);

        if(resposta.length === 0)
            throw new Error('Busca por administrador');

        resp.send(resposta);

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

        if(resposta !== 1)
            throw new Error('O administrador não pode ser deletado.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})

export default server;