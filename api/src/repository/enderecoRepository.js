import { conexao } from "./connection.js";

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
                       nm_cliente	    as Cliente,
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
