import { conexao } from "./connection.js";

export async function inserirItemCarrinho(carrinho) {
    const comando =
    `INSERT INTO tb_carrinho(id_cliente, id_produto, qtd_produto)
                        VALUES (?, ?, ?)`

    const [resposta] = await conexao.query(comando, [carrinho.cliente, carrinho.produto, carrinho.qtd]);
    carrinho.id = resposta.insertId;
    return carrinho;
}

export async function listarItensCarrinho(id) {
    const comando =
    `SELECT tb_carrinho.id_carrinho		as carrinhoId,
            tb_cliente.id_cliente		as clienteId,
            tb_produto.id_produto		as produtoId,
            tb_produto.nm_produto		as produtoNome,
            tb_produto.ds_marca			as produtoMarca,
            tb_produto.vl_valor			as produtoValor,
            qtd_produto					as quantidade
        FROM tb_carrinho
            INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_carrinho.id_cliente
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
                WHERE tb_cliente.id_cliente = ?
                    ORDER BY nm_produto ASC`
            
    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}

export async function alterarQtdCarrinho(qtd, idCliente, idProduto) {
    const comando =
    `UPDATE tb_carrinho
        INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_carrinho.id_cliente
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
                SET qtd_produto			= ?
                        WHERE tb_cliente.id_cliente = ?
                            AND tb_produto.id_produto = ?`

    const [resposta] = await conexao.query(comando, [qtd, idCliente, idProduto]);
    return resposta.affectedRows;
}

export async function removerItemCarrinho(idCliente, idProduto) {
    const comando =
    `DELETE FROM tb_carrinho
        WHERE id_cliente = ?
            AND id_produto = ?`

    const [resposta] = await conexao.query(comando, [idCliente, idProduto]);
    return resposta.affectedRows;
}

export async function deletarItensCarrinho(id) {
    const comando =
    `DELETE FROM tb_carrinho
	    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}