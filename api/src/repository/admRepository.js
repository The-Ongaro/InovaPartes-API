import { conexao } from './connection.js';

export async function cadastrarAdm(admin) {
    const comando =
    `INSERT INTO tb_adm (nm_adm, ds_cpf, ds_email, ds_senha, img_adm)
                    VALUES (?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [admin.nome, admin.cpf, admin.email, admin.senha, admin.imagem]);
    admin.id = resposta.insertId;
    return admin;
}

export async function alterarImgAdm(imagem, id) {
    const comando =
    `UPDATE tb_adm
        SET img_adm 	 = ?
            WHERE id_adm = ?`

    const [resposta] = await conexao.query(comando, [imagem, id]);
    return resposta.affectedRows;
}

export async function alterarAdm(id, admin) {
    const comando = 
    `UPDATE tb_adm
        SET nm_adm 		= ?,
            ds_cpf 		= ?,
            ds_email 	= ?,
            ds_senha 	= ?
        WHERE id_adm 	= ?`

    const [resposta] = await conexao.query(comando, [admin.nome, admin.cpf, admin.email, admin.senha, id]);
    return resposta.affectedRows;
}

export async function loginAdm(email, cpf, senha) {
    const comando =
    `SELECT id_adm 	    as ID,
            nm_adm	    as Nome,
            ds_email    as Email,
            ds_cpf      as CPF
                FROM tb_adm
                    WHERE ds_email = ? 
                        OR ds_cpf = ?
                            AND ds_senha = ?`

    const [resposta] = await conexao.query(comando, [email, cpf, senha]);
    return resposta[0];
}

export async function buscarPorCpfNome(cpf, nome) {
    const comando =
    `SELECT id_adm      as ID,
            nm_adm      as Nome,
            ds_email    as Email,
            ds_cpf      as CPF,
            img_adm     as Imagem
        FROM tb_adm
            WHERE ds_cpf = ?
                OR nm_adm LIKE ?`

    const [resposta] = await conexao.query(comando, [cpf, `%${nome}%`]);
    return resposta;
}

export async function buscarPorEmail(email) {
    const comando =
    `SELECT ds_email    as Email
        FROM tb_adm
            WHERE ds_email = ?`

    const [resposta] = await conexao.query(comando, [email]);
    return resposta;
}

export async function listarAdm() {
    const comando =
    `SELECT id_adm      as ID,
            nm_adm      as Nome,
            ds_cpf      as CPF,
            ds_email    as Email
                FROM tb_adm`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function deletarAdm(id) {
    const comando = 
    `DELETE FROM tb_adm
                WHERE id_adm = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}

