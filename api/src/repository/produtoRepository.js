import { conexao } from "./connection.js";

export async function cadastrarProdutos(produto) {
    const comando = 
    `INSERT INTO tb_produto (id_categoria, nm_produto, ds_marca, ds_modelo, bt_disponivel, ds_promocao, vl_valor, ds_detalhes, nr_quantidade)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [produto.categoria, produto.nome, produto.marca, produto.modelo, produto.disponivel,
    produto.promocao, produto.valor,  produto.detalhes, produto.quantidade]);
    produto.id = resposta.insertId;
    return produto;
}

export async function listarProdutos() {
    const comando =
    `SELECT 		 id_produto		as Id, 
        tb_categoria.ds_categoria	as Categoria,
                     nm_produto		as Produto,
                     ds_marca		as Marca,
                     ds_modelo		as Modelo,
                     bt_disponivel	as Disponivel,
                     ds_promocao	as Promocao,
                     vl_valor		as Valor,
                     ds_detalhes	as Detalhes,
                     nr_quantidade	as Quantidade
                 FROM tb_produto
                    INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
                        ORDER BY Id`
    
    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function listarPorNome(nome, categoria, marca) {
    const comando =
    `SELECT  id_produto,
             ds_categoria	    as Categoria,
             nm_produto		    as Produto,
             ds_marca		    as Marca,
             ds_modelo		    as Modelo,
             vl_valor		    as Valor,
             ds_detalhes		as Detalhes,
             nr_quantidade	    as Quantidade,
             bt_disponivel	    as Disponivel,
             ds_promocao		as Promocao
                FROM tb_produto
                    INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
                        WHERE nm_produto LIKE ?
                        OR tb_categoria.ds_categoria LIKE ?
                        OR tb_produto.ds_marca LIKE ?`

    const [resposta] = await conexao.query(comando, [`%${nome}%`, `%${categoria}%`, `%${marca}%`]);
    return resposta;
}

export async function listarPorId(id) {
    const comando = 
    `SELECT  id_produto,
             ds_categoria	    as Categoria,
             nm_produto		    as Produto,
             ds_marca		    as Marca,
             ds_modelo		    as Modelo,
             vl_valor		    as Valor,
             ds_detalhes		as Detalhes,
             nr_quantidade	    as Quantidade,
             bt_disponivel	    as Disponivel,
             ds_promocao		as Promocao
                FROM tb_produto
                    INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
                        WHERE tb_produto.id_produto = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}

export async function alterarProduto(id, produto) {
    const comando =
    `UPDATE tb_produto
	    INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
		    SET tb_produto.id_categoria     = ?,
                           nm_produto       = ?,
                           ds_marca         = ?,
                           ds_modelo        = ?,
                           bt_disponivel    = ?,
                           ds_promocao      = ?,
                           vl_valor         = ?,
                           ds_detalhes      = ?,
                           nr_quantidade    = ?
			                    WHERE tb_produto.id_produto = ?`

    const [resposta] = await conexao.query(comando, [produto.categoria, produto.nome, produto.marca, produto.modelo, produto.disponivel,
    produto.promocao, produto.valor, produto.detalhes, produto.quantidade, id]);
    return resposta.affectedRows;
}

export async function deletarProduto(id) {
    const comando =
    `DELETE FROM tb_produto
	    WHERE id_produto = ?`
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

export async function inserirCategoria(categoria) {
    const comando =
    `INSERT INTO tb_categoria (ds_categoria)
                    VALUES (?)`

    const [resposta] = await conexao.query(comando, [categoria.categoria]);
    categoria.id = resposta.insertId;
    return categoria;
}

// ARRUMAR
export async function inserirImg(imagem) {
    const comando = 
    `INSERT INTO tb_img_produto (id_produto, ds_img)
                    VALUES (?, ?)`
    
    const [resposta] = await conexao.query(comando, [imagem.id, imagem.img]);
    imagem.id = resposta.insertId;
    return imagem;
}

export async function alterarImg(id, imagem) {
    const comando = 
    `UPDATE tb_img_produto
        SET ds_img = ?
            WHERE id_img_produto = ?`

    const [resposta] = await conexao.query(comando, [imagem, id]);
    return resposta.affectedRows;
} 

export async function listarImg() {
    const comando = 
    `SELECT id_img_produto 	as imgID,
            id_produto 		as produtoID,
            ds_img 			as Imagem
            FROM tb_img_produto`

    const [resposta] = await conexao.query(comando);
    return resposta;
}