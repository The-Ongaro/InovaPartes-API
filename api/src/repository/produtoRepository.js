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


export async function imagemProduto(imagem, id) {
    const comando =
    `UPDATE tb_produto
        SET ds_imagem   = ?
            WHERE id_produto = ?`
    
    const [resposta] = await conexao.query(comando, [imagem, id]);
    return resposta.affectedRows;
} 


export async function listarProdutos() {
    const comando =
    `SELECT 		 id_produto		as id, 
        tb_categoria.ds_categoria	as categoria,
                     nm_produto		as produto,
                     ds_marca		as marca,
                     ds_modelo		as modelo,
                     bt_disponivel	as disponivel,
                     ds_promocao	as promocao,
                     vl_valor		as valor,
                     ds_detalhes	as detalhes,
                     nr_quantidade	as quantidade
                 FROM tb_produto
                    INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
                        ORDER BY id`
    
    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function listarPorNome(nome, categoria, marca) {
    const comando =
    `SELECT  id_produto         as id,
             ds_categoria	    as categoria,
             nm_produto		    as produto,
             ds_marca		    as marca,
             ds_modelo		    as modelo,
             vl_valor		    as valor,
             ds_detalhes		as detalhes,
             nr_quantidade	    as quantidade,
             bt_disponivel	    as disponivel,
             ds_promocao		as promocao
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
    `SELECT  id_produto         as id,
             ds_categoria	    as categoria,
             nm_produto		    as produto,
             ds_marca		    as marca,
             ds_modelo		    as modelo,
             vl_valor		    as valor,
             ds_detalhes		as detalhes,
             nr_quantidade	    as quantidade,
             bt_disponivel	    as disponivel,
             ds_promocao		as promocao
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

    console.log('produtoRepositoty tem conexão');
    console.log(produto.categoria, 'Repository');
    console.log(produto.nome, 'Repository');
    console.log(produto.marca, 'Repository');
    console.log(produto.modelo, 'Repository');
    console.log(produto.disponivel, 'Repository');
    console.log(produto.promocao, 'Repository');
    console.log(produto.valor, 'Repository');
    console.log(produto.detalhes, 'Repository');
    console.log(produto.quantidade, 'Repository');
    console.log(id, 'Repository');

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

export async function listarCategoria() {
    const comando =
    `SELECT ds_categoria    as categoria,
            id_categoria    as id
        FROM tb_categoria`

    const [resposta] = await conexao.query(comando);
    return resposta;
}


export async function inserirImg(imagem) {
    const comando = 
    `INSERT INTO tb_img_produto (id_produto, ds_img)
                    VALUES (?, ?)`
    
    const [resposta] = await conexao.query(comando, [imagem.produto, imagem.imagem]);
    imagem.id = resposta.insertId;
    return imagem;
}

export async function alterarImg(imagem, id) {
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

export async function listarImgInfo(id) {
    const comando =
    `SELECT tb_produto.id_produto      as id,
            nm_produto 		           as nome,
            ds_marca 		           as marca,
            ds_modelo 		           as modelo,
            bt_disponivel 	           as disponivel,
            ds_promocao		           as promocao,
            vl_valor 		           as valor,
            ds_detalhes 	           as detalhes,
            nr_quantidade 	           as quantidade,
            ds_img 			           as imagem
            FROM tb_img_produto
                INNER JOIN tb_produto ON tb_produto.id_produto = tb_img_produto.id_produto
                    WHERE tb_produto.id_produto = ?`
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}

