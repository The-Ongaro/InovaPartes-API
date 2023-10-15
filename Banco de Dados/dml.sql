USE inovapartesAPI;

-- TABELA PRODUTOS --
-- ADICIONAR PRODUTOS
INSERT INTO tb_produto (id_categoria, nm_produto, ds_marca, ds_modelo, bt_disponivel, ds_promocao, vl_valor, ds_detalhes, nr_quantidade)
				VALUES (?, ?, ? ?, ?, ?, ?, ?, ?);

-- LISTAR TODOS OS PRODUTOS 
SELECT 				 id_produto		as Id, 
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
			ORDER BY Id;
            
-- LISTAR PRODUTOS POR CATEGORIA, NOME, ID OU MARCA
SELECT  id_produto,
		ds_categoria	as Categoria,
        nm_produto		as Produto,
        ds_marca		as Marca,
        ds_modelo		as Modelo,
        vl_valor		as Valor,
        ds_detalhes		as Detalhes,
        nr_quantidade	as Quantidade,
        bt_disponivel	as Disponivel,
        ds_promocao		as Promocao
        FROM tb_produto
	INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
		 WHERE tb_categoria.ds_categoria LIKE ?
			 OR nm_produto LIKE ?
				OR tb_produto.id_produto = ?
					OR tb_produto.ds_marca LIKE ?;
        
-- ALTERAR PRODUTO
UPDATE tb_produto
	INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
		SET tb_produto.id_categoria = ?,
						 nm_produto = ?,
						 ds_marca = ?,
						 ds_modelo = ?,
						 vl_valor = ?,
						 ds_detalhes = ?,
						 nr_quantidade = ?,
						 bt_disponivel = ?,
						 ds_promocao = ?
			WHERE tb_produto.id_produto = ?;

-- DELETAR PRODUTO
DELETE FROM tb_produto
	WHERE id_produto = ?;

-- TABELA CATEGORIA --
-- INSERIR CATEGORIA
INSERT INTO tb_categoria (ds_categoria)
				VALUES ('Originais - Manutenção Preventiva'),
					   ('Alta Performance');
                       
-- TABELA IMAGEM --
-- INSERIR IMAGEM PRODUTO
INSERT INTO tb_img_produto (id_produto, ds_img)
				VALUES (?, ?);
                
-- LISTAR IMAGENS
SELECT id_img_produto 	as imgID,
	   id_produto 		as produtoID,
       ds_img 			as Imagem
		FROM tb_img_produto;
        
-- LISTAR IMAGEM COM INFO DO PRODUTO
SELECT nm_produto 		as Nome,
	   ds_marca 		as Marca,
       ds_modelo 		as Modelo,
       bt_disponivel 	as Disponivel,
       ds_promocao		as Promocao,
       bt_disponivel 	as Disponivel,
       vl_valor 		as Valor,
       ds_detalhes 		as Detalhes,
       nr_quantidade 	as Quantidade,
       ds_img 			as Imagem
		FROM tb_img_produto
			INNER JOIN tb_produto ON tb_produto.id_produto = tb_img_produto.id_produto
				WHERE tb_produto.id_produto = ?;

-- ALTERAR IMAGEM 
UPDATE tb_img_produto
	SET ds_img = ?
		WHERE id_img_produto = ?;
	
-- DELETAR IMAGEM
DELETE FROM tb_img_produto
	WHERE id_img_produto = ?;
                       
-- TABELA ADM --
-- ADICIONAR ADM
INSERT INTO tb_adm (nm_adm, ds_cpf, ds_email, ds_senha, img_adm)
				VALUES (?, ?,?, ?, ?);
                
-- ALTERAR IMAGEM ADM
UPDATE tb_adm
	SET img_adm 	 = ?
		WHERE id_adm = ?;
        
-- ALTERAR INFORMACOES ADM
UPDATE tb_adm
	SET nm_adm 		= ?,
		ds_cpf 		= ?,
        ds_email 	= ?,
        ds_senha 	= ?
	WHERE id_adm 	= ?;
    
-- LOGIN ADM (e-mail ou cpf)
SELECT id_adm 	as id,
	   nm_adm	as nome,
       ds_email as email
	FROM tb_adm
		   WHERE ds_email = ? 
				OR ds_cpf = ?
					AND ds_senha = ?;

-- LISTAR TODOS ADM
SELECT id_adm	as id,
	   nm_adm	as nome,
	   ds_cpf	as cpf,
	   ds_email	as email
	   		FROM tb_adm;

-- DELETAR ADM
DELETE FROM tb_adm
		WHERE id_adm = 1;
                    
-- TABELA CLIENTE -- 
-- ADICIONAR CLIENTE
INSERT INTO tb_cliente (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_senha, img_cliente)
				VALUES (?, ?, ?, ?, ?, ?);

-- ALTERAR IMAGEM CLIENTE
UPDATE tb_cliente
	SET img_cliente = ?
		WHERE id_cliente = ?;
                
-- LISTAR TODOS CLIENTES
SELECT nm_cliente as Cliente,
	   ds_cpf	  as CPF,
       ds_telefone as Telefone,
       ds_email		as Email
	FROM tb_cliente;
                
-- LISTAR CLIENTES POR NOME OU ID
SELECT nm_cliente,
	   ds_cpf,
       ds_telefone,
       ds_email,
       ds_senha
	FROM tb_cliente
		WHERE nm_cliente LIKE ?;
	 		OR id_cliente = ?;
        
-- LOGIN CLIENTE
SELECT id_cliente 	as Id,
	   nm_cliente 	as Nome,
	   ds_email 	as Email
	FROM tb_cliente
		WHERE ds_email 		= ?
			AND ds_senha 	= ?;
            
-- ALTERAR INFO CLIENTE
UPDATE tb_cliente
	SET nm_cliente 		= ?
		ds_cpf 			= ?,
        ds_telefone 	= ?
        ds_email 		= ?,
        ds_senha 		= ?,
        img_cliente 	= ?
	WHERE id_cliente 	= ?;

-- DELETAR CONTA CLIENTE
DELETE FROM tb_cliente
	WHERE id_cliente = ?;
    
-- TABELA CARTAO --
-- INSERIR INFO CARTAO
INSERT INTO tb_cartao (id_cliente, nm_titular, ds_cartao, ds_validade, nr_cod_seguranca, nr_parcelas)
				VALUES (?, ?, ?, ?, ?, ?);

-- LISTAR INFO CARTAO + USUARIO
SELECT tb_cliente.id_cliente 		as IdCliente,
			      nm_cliente		as Cliente,
			      ds_cpf			as CPF,
			      nm_titular		as Titular,
			      ds_cartao			as Cartao,
			      ds_validade  		as Validade,
			      nr_cod_seguranca 	as CodSeguranca,
			      nr_parcelas		as Parcelas
		  FROM tb_cartao
			 INNER JOIN  tb_cliente ON tb_cliente.id_cliente = tb_cartao.id_cliente
				 ORDER BY IdCliente;
        
-- ALTERAR INFO CARTAO
UPDATE tb_cartao
   SET nm_titular 		= ?,
	   ds_cartao 		= ?,
	   ds_validade 		= ?,
	   nr_cod_seguranca = ?,
	   nr_parcelas 		= ?
	WHERE id_cliente 	= ?;

-- DELETAR INFO CARTÃO
DELETE FROM tb_cartao
	WHERE id_cartao = ?;
    
-- TABELA PEDIDO --
-- INSERIR PEDIDO
INSERT INTO tb_pedido (id_produto, id_cliente, id_cartao, id_endereco, nr_pedido, nr_quantidade, ds_status)
				VALUES (?, ?, ?, ?, ?, ?, ?);
                
-- LISTAR PEDIDOS
SELECT tb_produto.id_produto 				as ProdutoID,
	   tb_cliente.id_cliente				as Cliente,
				  nm_produto				as Produto,
                  ds_marca 					as Marca,
	   tb_cartao.id_cartao 					as Cartao,
				  nm_titular				as Titular,
       tb_endereco.id_endereco 				as Endereco,
                  nm_logradouro				as Logradouro,
                  ds_cidade					as Cidade,
                  ds_estado					as Estado,
       tb_pedido.nr_quantidade 				as Quantidade,
                  ds_status 				as StatusPedido
	FROM tb_pedido
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
        INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
        INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco;

-- LISTAR STATUS DOS PEDIDOS CONCLUIDOS, ENVIADOS...
SELECT tb_produto.id_produto 				as Produto,
				  nm_produto				as produto,
		tb_cartao.id_cartao 				as Cartao,
				  nm_titular				as Titular,
	  tb_endereco.id_endereco 				as Endereco,
                  nm_logradouro				as Logradouro,
                  ds_cep					as CEP,
                  ds_cidade					as Cidade,
                  ds_estado					as Estado,
		tb_pedido.nr_quantidade 			as Quantidade,
                  ds_status 				as StatusPedido
		FROM tb_pedido
			INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
			INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
			INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
				WHERE ds_status LIKE ?;

-- ALTERAR STATUS DO PEDIDO
UPDATE tb_pedido
	SET ds_status = ?
		WHERE id_pedido = ?;

-- DELETAR PEDIDO
DELETE FROM tb_pedido
	WHERE id_pedido = ?;
    
-- TABELA ENDERECO --
-- INSERIR ENDERECO USUARIO
INSERT INTO tb_endereco (id_cliente, nm_logradouro, ds_num_casa, ds_complemento, ds_cep, ds_bairro, ds_cidade, ds_estado)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                
-- LISTAR ENDERECO + USUARIO
SELECT tb_cliente.id_cliente 	as IdCliente,
	   nm_cliente				as Nome,
       nm_logradouro 			as Logradouro,
       ds_num_casa 				as Numero,
       ds_complemento 			as Complemento,
       ds_cep 					as CEP,
       ds_bairro 				as Bairro,
       ds_cidade 				as Cidade,
       ds_estado 				as Estado
	FROM tb_endereco
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_endereco.id_cliente
			ORDER BY IdCliente;
            
-- ALTERAR ENDERECO
UPDATE tb_endereco
	SET nm_logradouro 	= ?,
		ds_num_casa 	= ?,
        ds_complemento 	= ?,
        ds_cep 			= ?,
        ds_bairro 		= ?,
        ds_cidade 		= ?,
        ds_estado 		= ?
	WHERE id_cliente	= ?;

-- DELETAR ENDEREÇO
DELETE FROM tb_endereco
	WHERE id_endereco = ?;