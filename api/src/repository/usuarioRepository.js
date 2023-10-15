import { conexao } from "./connection.js";

// RELACIONADO AOS ENDPOINTS DA TABELA CLIENTES.
export async function cadastroCliente(cliente) {
    const comando =
    `INSERT INTO tb_cliente (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_senha, img_cliente)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.senha, cliente.imagem]);
    cliente.id = resposta.insertId;
    return cliente;
}

export async function alterarImgCliente(imagem, id) {
    const comando = 
    `UPDATE tb_cliente
        SET img_cliente = ?
            WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [imagem, id]);
    return resposta.affectedRows;
}

export async function loginCliente(email, senha) {
    const comando = 
    `SELECT id_cliente 	as Id,
            nm_cliente 	as Nome,
            ds_email 	as Email
	            FROM tb_cliente
		            WHERE ds_email 		= ?
			            AND ds_senha 	= ?`

    const [resposta] = await conexao.query(comando, [email, senha]);
    return resposta[0];
}

export async function listarclientes() {
    const comando = 
    `SELECT id_cliente      as Id,
            nm_cliente      as Cliente,
            ds_cpf	        as CPF,
            ds_telefone     as Telefone,
            ds_email		as Email,
            img_cliente     as Perfil
        FROM tb_cliente`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function buscarPorNomeCpf(nome, cpf) {
    const comando = 
    `SELECT nm_cliente      as Nome,
            ds_cpf          as CPF,
            ds_telefone     as Telefone,
            ds_email        as Email
                FROM tb_cliente
                    WHERE nm_cliente LIKE ?
                       OR ds_cpf LIKE ?`

    const [resposta] = await conexao.query(comando, [`%${nome}%`, `%${cpf}%`]);
    return resposta;
}

export async function alterarInfoCliente(id, cliente) {
    const comando = 
    `UPDATE tb_cliente
        SET nm_cliente 		= ?,
            ds_cpf 			= ?,
            ds_telefone 	= ?,
            ds_email 		= ?,
            ds_senha 		= ?
        WHERE id_cliente 	= ?`

    const [resposta] = await conexao.query(comando, [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.senha, id]);
    return resposta.affectedRows;
}

export async function deletarCliente(id) {
    const comando = 
    `DELETE FROM tb_cliente
	    WHERE id_cliente = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorCpf(cpf) {
    const comando =
    `SELECT ds_cpf
        FROM tb_cliente
            WHERE ds_cpf = ?`

    const [resposta] = await conexao.query(comando, [cpf]);
    return resposta;
}

// RELACIONADO AOS ENDPOINTS DA TABELA CARTÃO.
export async function cadastrarCartao(cartao) {
    const comando = 
    `INSERT INTO tb_cartao (id_cliente, nm_titular, ds_cartao, ds_validade, nr_cod_seguranca, nr_parcelas)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [cartao.cliente, cartao.titular, cartao.numero, 
    cartao.validade, cartao.codSeguranca, cartao.parcelas]);
    cartao.id = resposta.insertId;
    return cartao;
}

export async function listarInfoCartao() {
    const comando =
    `SELECT tb_cliente.id_cliente 		    as IdCliente,
             tb_cartao.id_cartao            as IdCartao,
                       nm_cliente		    as Cliente,
                       ds_cpf			    as CPF,
                       nm_titular		    as Titular,
                       ds_cartao			as Cartao,
                       ds_validade  		as Validade,
                       nr_cod_seguranca 	as CodSeguranca,
                       nr_parcelas		    as Parcelas
                    FROM tb_cartao
                        INNER JOIN  tb_cliente ON tb_cliente.id_cliente = tb_cartao.id_cliente
                            ORDER BY IdCliente`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function alterarInfoCartao(id, cartao) {
    const comando = 
    `UPDATE tb_cartao
        SET nm_titular 		    = ?,
            ds_cartao 		    = ?,
            ds_validade 		= ?,
            nr_cod_seguranca    = ?,
            nr_parcelas 		= ?
        WHERE id_cliente 	    = ?`

    conts [resposta] = await conexao.query(comando, [cartao.titular, cartao.numero, 
    cartao.validade, cartao.codSeguranca, cartao.parcelas, id]);
    return resposta.affectedRows;
}

export async function deletarInfoCartao(id) {
    const comando =
    `DELETE FROM tb_cartao
	    WHERE id_cartao = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}
 

// RELACIONADO AOS ENDPOINTS DA TABELA ENDEREÇO.
export async function cadastrarEndereco(endereco) {
    const comando =
    `INSERT INTO tb_endereco (id_cliente, nm_logradouro, ds_num_casa, ds_complemento, ds_cep, ds_bairro, ds_cidade, ds_estado)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [endereco.cliente, endereco.logradouro, endereco.numCasa, endereco.complemento,
    endereco.cep, endereco.bairro, endereco.cidade, endereco.estado]);
    endereco.id = resposta.insertId;
    return endereco;
}

export async function listarEndCliente() {
    const comando =
    `SELECT tb_endereco.id_endereco     as IdEndereco,
            tb_cliente.id_cliente       as IdCliente,
                       nm_cliente	    as Nome,
                       nm_logradouro    as Logradouro,
                       ds_num_casa      as Numero,
                       ds_complemento   as Complemento,
                       ds_cep           as CEP,
                       ds_bairro        as Bairro,
                       ds_cidade        as Cidade,
                       ds_estado        as Estado
                FROM tb_endereco
                    INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_endereco.id_cliente
                        ORDER BY IdCliente`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function alterarEndereco(id, endereco) {
    const comando =
    `UPDATE tb_endereco
        SET nm_logradouro   = ?,
            ds_num_casa     = ?,
            ds_complemento  = ?,
            ds_cep          = ?,
            ds_bairro       = ?,
            ds_cidade       = ?,
            ds_estado       = ?
        WHERE id_cliente    = ?`

    const [resposta] = await conexao.query(comando, [endereco.logradouro, endereco.numCasa,
    endereco.complemento, endereco.cep, endereco.bairro, endereco.cidade, endereco.estado, id]);
    return resposta.affectedRows;
}

export async function deletarEnd(id) {
    const  comando = 
    `DELETE FROM tb_endereco
	    WHERE id_endereco = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

// RELACIONADO A TABELA PEDIDOS.
export async function cadastrarPedidos(pedidos) {
    const comando =
    `INSERT INTO tb_pedido (id_cliente, id_produto, id_cartao, id_endereco, nr_quantidade, ds_status)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [pedidos.cliente, pedidos.produto, pedidos.cliente,
    pedidos.cartao, pedidos.endereco,pedidos.quantidade, pedidos.status]);
    pedidos.id = resposta.insertId;
    return pedidos;
}

export async function listarPedidos() {
    const comando =
    `SELECT tb_pedido.id_pedido                 as PedidoID,
            tb_produto.id_produto 				as ProdutoID,
            tb_cliente.nm_cliente               as Cliente,
                       nm_produto				as Produto,
                       ds_marca 				as Marca,
             tb_cartao.id_cartao 				as Cartao,
                       nm_titular				as Titular,
           tb_endereco.id_endereco 				as Endereco,
                       nm_logradouro			as Logradouro,
                       ds_cidade				as Cidade,
                       ds_estado				as Estado,
             tb_pedido.nr_quantidade 			as Quantidade,
                       ds_status 				as StatusPedido
                FROM tb_pedido
                    INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
                        INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
                            INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
                                INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
                                    ORDER BY tb_produto.id_produto`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function listarStatusPedidos(status) {
    const comando = 
    `SELECT tb_pedido.id_pedido                 as IDPedido,
            tb_produto.id_produto 				as Produto,
            tb_cliente.id_cliente               as Cliente,
                       nm_produto				as ProdutoNome,
             tb_cartao.id_cartao 				as Cartao,
                       nm_titular				as Titular,
           tb_endereco.id_endereco 				as Endereco,
                       nm_logradouro			as Logradouro,
                       ds_cep					as CEP,
                       ds_cidade				as Cidade,
                       ds_estado				as Estado,
             tb_pedido.nr_quantidade 			as Quantidade,
                       ds_status 				as StatusPedido
                            FROM tb_pedido
                                INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
                                    INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
                                        INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
                                            INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
                                                WHERE ds_status LIKE ?`

    const [resposta] = await conexao.query(comando, [`%${status}%`]);
    return resposta;
}

export async function alterarStatusPedido(status, id) {
    const comando =
    `UPDATE tb_pedido
	    SET ds_status = ?
		    WHERE id_pedido = ?`

    const [resposta] = await conexao.query(comando, [status, id]);
    return resposta.affectedRows;
}

export async function deletarPedido(id) {
    const comando = 
    `DELETE FROM tb_pedido
        WHERE id_pedido = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}