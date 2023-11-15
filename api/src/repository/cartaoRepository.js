import { conexao } from "./connection.js";

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

    const [resposta] = await conexao.query(comando, [cartao.titular, cartao.numero, 
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
 
