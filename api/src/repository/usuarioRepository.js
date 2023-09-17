import { conexao } from "./connection.js";

export async function cadastroCliente(cliente) {
    const comando =
    `INSERT INTO tb_cliente (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_senha, img_cliente)
                    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.senha, cliente.img]);
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
    return resposta;
}

export async function listarclientes() {
    const comando = 
    `SELECT id_cliente      as Id,
            nm_cliente      as Cliente,
            ds_cpf	        as CPF,
            ds_telefone     as Telefone,
            ds_email		as Email
        FROM tb_cliente`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function buscarPorNomeCpf(nome, cpf) {
    const comando = 
    `SELECT nm_cliente,
            ds_cpf,
            ds_telefone,
            ds_email,
            ds_senha
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