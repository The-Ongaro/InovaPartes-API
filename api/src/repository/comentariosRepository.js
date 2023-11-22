import { conexao } from "./connection.js";

export async function inserirComentario(comentar) {
    const comando =
    `INSERT INTO tb_comentarios (id_produto, id_cliente, ds_comentario)
                    VALUES (?, ?, ?)`

    const [resposta] = await conexao.query(comando, [comentar.produto, comentar.cliente, comentar.comentario]);
    comentar.id = resposta.insertId;
    return comentar;
}

export async function listarComentarios() {
    const comando =
    `SELECT tb_produto.id_produto		as produtoId,
            tb_cliente.id_cliente		as clienteId,
                       ds_comentario		as comentario
        FROM tb_comentarios
                INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
                    INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente;`

    const [resposta] = await conexao.query(comando)
    return resposta;
}

export async function listarComentarioCliente(id) {
    const comando =
    `SELECT tb_produto.id_produto		as produtoId,
            tb_cliente.id_cliente		as clienteId,
                       nm_cliente       as cliente,
                       ds_comentario	as comentario
        FROM tb_comentarios
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
                INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente
                    WHERE tb_cliente.id_cliente = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}

export async function listarComentarioProd(id) {
    const comando =
    `SELECT tb_produto.id_produto		as produtoId,
            tb_cliente.id_cliente		as clienteId,
                       nm_cliente       as cliente,
                       ds_comentario	as comentario
        FROM tb_comentarios
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
                INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente
                    WHERE tb_produto.id_produto = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}

export async function alterarComentarioCliente(comentario, id) {
    const comando = 
    `UPDATE tb_comentarios
	    SET ds_comentario = ?
		    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [comentario.comentario, id]);
    return resposta.affectedRows; 
}

export async function deletarComentario(id) {
    const comando =
    `DELETE FROM tb_comentarios
	    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}