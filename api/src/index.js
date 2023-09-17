import "dotenv/config"

import express from "express";
import cors from "cors";

import produtoController from './controller/produtoController.js';
import usuarioController from './controller/usuarioController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(produtoController);
server.use(usuarioController);

server.use('/storage/imgProdutos', express.static('storage/imgProdutos'));

server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`));