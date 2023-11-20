import { conexao } from "./connection.js";

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

export async function loginCliente(cpf, email, senha) {
    const comando = 
    `SELECT id_cliente 	as id,
            nm_cliente 	as cliente,
            ds_email 	as email,
            ds_cpf      as cpf
	            FROM tb_cliente
		            WHERE (ds_cpf = ? OR ds_email = ?) AND ds_senha  = ?`

    const [resposta] = await conexao.query(comando, [cpf, email, senha]);
    return resposta[0];
}

export async function listarclientes() {
    const comando = 
    `SELECT id_cliente      as id,
            nm_cliente      as cliente,
            ds_cpf	        as cpf,
            ds_telefone     as telefone,
            ds_email		as email,
            img_cliente     as perfil
        FROM tb_cliente`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function buscarPorNomeCpf(cpf, nome) {
    const comando = 
    `SELECT id_cliente      as id,
            nm_cliente      as cliente,
            ds_cpf          as cpf,
            ds_telefone     as telefone,
            ds_email        as email,
            img_cliente     as perfil
                FROM tb_cliente
                    WHERE ds_cpf = ?
                       OR nm_cliente LIKE ?`

    const [resposta] = await conexao.query(comando, [cpf, `%${nome}%`]);
    return resposta;
}

export async function buscarPorEmail(email) {
    const comando =
    `SELECT ds_email    as email
        FROM tb_cliente
            WHERE ds_email = ?`

    const [resposta] = await conexao.query(comando, [email]);
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