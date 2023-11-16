import { conexao } from "./connection.js";

export async function inserirItemCarriho(carrinho) {
    const comando =
    `INSERT INTO tb_carrinho(id_cliente, id_produto, qtd_produto)
                        VALUES (?, ?, ?)`

    const [resposta] = await conexao.query(comando, [carrinho.cliente, carrinho.produto, carrinho,qtd]);
    carrinho.id = resposta.insertId;
    return carrinho;
}

export async function listarItensCarrinho(id) {
    const comando =
    `SELECT tb_carrinho.id_carrinho		as CarrinhoID,
            tb_cliente.id_cliente		as ClienteID,
            tb_produto.id_produto		as ProdutoID,
            tb_produto.nm_produto		as ProdutoNome,
            tb_produto.ds_marca			as ProdutoMarca,
            tb_produto.vl_valor			as ProdutoValor,
            qtd_produto					as Quantidade
        FROM tb_carrinho
            INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_carrinho.id_cliente
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
                WHERE tb_cliente.id_cliente = ?
                    ORDER BY nm_produto ASC`
            
    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

export async function alterarQtdCarrinho(idProduto, qtd, idCliente) {
    const comando =
    `UPDATE tb_carrinho
        INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
            SET tb_produto.id_produto		= ?,
                qtd_produto					= ?
                    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [idProduto, qtd, idCliente]);
    return resposta.affectedRows;
}

export async function removerItemCarrinho(idProduto, idCliente) {
    const comando =
    `DELETE FROM tb_carrinho
        WHERE id_produto = ?
            AND id_cliente = ?`

    const [resposta] = await conexao.query(comando, [idProduto, idCliente]);
    return resposta.affectedRows;
}

export async function deletarItensCarrinho(id) {
    const comando =
    `DELETE FROM tb_carrinho
	    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}