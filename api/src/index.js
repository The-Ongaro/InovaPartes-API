import "dotenv/config";

import express from "express";
import cors from "cors";

import admController from './controller/admController.js';
import produtoController from './controller/produtoController.js';
import usuarioController from './controller/usuarioController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/storage/imgProdutos', express.static('storage/imgProdutos'));
server.use('/storage/usuarioPerfil', express.static('storage/usuarioPerfil'));
server.use('/storage/admPerfil', express.static('storage/admPerfil'));

server.use(admController);
server.use(produtoController);
server.use(usuarioController);

server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`));