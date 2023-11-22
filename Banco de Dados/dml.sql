USE inovapartesAPI;

-- TABELA PRODUTOS --
-- ADICIONAR PRODUTOS
INSERT INTO tb_produto (id_categoria, nm_produto, ds_marca, ds_modelo, bt_disponivel, ds_promocao, vl_valor, ds_detalhes, nr_quantidade)
				VALUES (?, ?, ? ?, ?, ?, ?, ?, ?);

-- LISTAR TODOS OS PRODUTOS 
SELECT 				 id_produto		as id, 
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
			ORDER BY Id;
            
-- LISTAR PRODUTOS POR CATEGORIA, NOME, ID OU MARCA
SELECT  id_produto		as id,
		ds_categoria	as categoria,
        nm_produto		as produto,
        ds_marca		as marca,
        ds_modelo		as modelo,
        vl_valor		as valor,
        ds_detalhes		as detalhes,
        nr_quantidade	as quantidade,
        bt_disponivel	as disponivel,
        ds_promocao		as promocao
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
SELECT id_img_produto 	as imagemId,
	   id_produto 		as produtoId,
       ds_img 			as imagem
		FROM tb_img_produto;
        
-- LISTAR IMAGEM COM INFO DO PRODUTO
SELECT id_produto		as id,
	   nm_produto 		as nome,
	   ds_marca 		as marca,
       ds_modelo 		as modelo,
       bt_disponivel 	as disponivel,
       ds_promocao		as promocao,
       vl_valor 		as valor,
       ds_detalhes 		as detalhes,
       nr_quantidade 	as quantidade,
       ds_img 			as imagem
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
SELECT id_adm 	    as id,
        nm_adm	    as admin,
        ds_email    as email,
        ds_cpf      as cpf
            FROM tb_adm
            	WHERE (ds_cpf = ? OR ds_email = ?) AND ds_senha = ?

-- LISTAR TODOS ADM
SELECT id_adm	as id,
	   nm_adm	as nome,
	   ds_cpf	as cpf,
	   ds_email	as email
	   		FROM tb_adm;

-- DELETAR ADM
DELETE FROM tb_adm
		WHERE id_adm = ?;
                    
-- TABELA CLIENTE -- 
-- ADICIONAR CLIENTE
INSERT INTO tb_cliente (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_senha, img_cliente)
				VALUES (?, ?, ?, ?, ?, ?);

-- ALTERAR IMAGEM CLIENTE
UPDATE tb_cliente
	SET img_cliente = ?
		WHERE id_cliente = ?;
                
-- LISTAR TODOS CLIENTES
SELECT nm_cliente 	as nome,
	   ds_cpf	  	as cpf,
       ds_telefone 	as telefone,
       ds_email		as email
	FROM tb_cliente;
                
-- LISTAR CLIENTES POR NOME OU ID
SELECT nm_cliente	as nome,
	   ds_cpf		as cpf,
       ds_telefone	as telefone,
       ds_email		as email,
       ds_senha		as senha
	FROM tb_cliente
		WHERE nm_cliente LIKE ?;
	 		OR id_cliente = ?;
        
-- LOGIN CLIENTE
SELECT id_cliente 		as id,
        nm_cliente	    as cliente,
        ds_email    	as email,
        ds_cpf      	as cpf
            FROM tb_cliente
            	WHERE (ds_cpf = ? OR ds_email = ?) AND ds_senha = ?
            
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
SELECT tb_cliente.id_cliente 		as clienteId,
			      nm_cliente		as nome,
			      ds_cpf			as cpf,
			      nm_titular		as titular,
			      ds_cartao			as cartao,
			      ds_validade  		as validade,
			      nr_cod_seguranca 	as codSeguranca,
			      nr_parcelas		as parcelas
		  FROM tb_cartao
			 INNER JOIN  tb_cliente ON tb_cliente.id_cliente = tb_cartao.id_cliente
				 ORDER BY IdCliente;

-- LISTAR INFO CARTÃO DE UM DETERMINADO USUÁRIO
SELECT tb_cliente.id_cliente   as clienteId,
            tb_cartao.id_cartao     as CartaoId,
              nm_cliente		    as cliente,
              ds_cpf			    as cpf,
              nm_titular		    as titular,
              ds_cartao			    as cartao,
              ds_validade  		    as validade,
              nr_cod_seguranca 	    as codSeguranca,
              nr_parcelas		    as parcelas
           FROM tb_cartao
               INNER JOIN  tb_cliente ON tb_cliente.id_cliente = tb_cartao.id_cliente
                   WHERE tb_cliente.id_cliente = ?;
        
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
SELECT tb_produto.id_produto 				as produtoId,
	   tb_cliente.id_cliente				as clienteId,
				  nm_produto				as produto,
                  ds_marca 					as marca,
	   tb_cartao.id_cartao 					as cartaoId,
				  nm_titular				as titular,
       tb_endereco.id_endereco 				as endereco,
                  nm_logradouro				as logradouro,
                  ds_cidade					as cidade,
                  ds_estado					as estado,
       tb_pedido.nr_quantidade 				as quantidade,
                  ds_status 				as statusPedido
	FROM tb_pedido
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_pedido.id_cliente
        INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
        INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco;

-- LISTAR STATUS DOS PEDIDOS CONCLUIDOS, ENVIADOS...
SELECT tb_produto.id_produto 				as produtoId,
				  nm_produto				as nomeProduto,
		tb_cartao.id_cartao 				as cartao,
				  nm_titular				as titular,
	  tb_endereco.id_endereco 				as endereco,
                  nm_logradouro				as logradou,
                  ds_cep					as cep,
                  ds_cidade					as cidade,
                  ds_estado					as estado,
		tb_pedido.nr_quantidade 			as quantidade,
                  ds_status 				as statusPedido
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
SELECT tb_cliente.id_cliente 	as clienteId,
	   nm_cliente				as cliente,
       nm_logradouro 			as logradouro,
       ds_num_casa 				as numero,
       ds_complemento 			as complemento,
       ds_cep 					as cep,
       ds_bairro 				as bairro,
       ds_cidade 				as cidade,
       ds_estado 				as estado
	FROM tb_endereco
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_endereco.id_cliente
			ORDER BY clienteId;
            
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


-- TABELA CARRINHO --
-- INSERIR PRODUTOS NO CARRINHO
INSERT INTO tb_carrinho(id_cliente, id_produto, qtd_produto)
					VALUES (?, ?, ?);

-- LISTAR ITENS DE APENAS UM USUARIO
SELECT tb_carrinho.id_carrinho		as carrinhoId,
	   tb_cliente.id_cliente		as clienteId,
       tb_produto.id_produto		as produtoId,
       tb_produto.nm_produto		as produtoNome,
       tb_produto.ds_marca			as produtoMarca,
       tb_produto.vl_valor			as produtoValor,
       qtd_produto					as quantidade
	FROM tb_carrinho
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_carrinho.id_cliente
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
			WHERE tb_cliente.id_cliente = ?
				ORDER BY nm_produto ASC;

-- ALTERAR QUANTIDADE DE UM PRODUTO ESPECIFICO NO CARRINHO
UPDATE tb_carrinho
        INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_carrinho.id_cliente
            INNER JOIN tb_produto ON tb_produto.id_produto = tb_carrinho.id_produto
                SET qtd_produto			= ?
                        WHERE tb_cliente.id_cliente = ?
                            AND tb_produto.id_produto = ?;

-- REMOVER ITEM DO CARRINHO
DELETE FROM tb_carrinho
	WHERE id_produto = ?
     AND id_cliente = ?;

-- DELETAR TODOS OS ITENS DO CARRINHO
DELETE FROM tb_carrinho
	WHERE id_cliente = ?;

-- TABELA COMENTARIOS --
-- INSERIR UM COMENTARIO --
INSERT INTO tb_comentarios (id_produto, id_cliente, ds_comentario)
					VALUES (?, ?, ?);
     
-- LISTAR TODOS OS COMENTARIOS --  
SELECT tb_produto.id_produto		as produtoId,
	   tb_cliente.id_cliente		as clienteId,
				  nm_cliente		as cliente,
				  ds_comentario		as comentario
	FROM tb_comentarios
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
        INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente
			WHERE tb_cliente.id_cliente = ?;
            
-- LISTAR OS COMENTARIOS DE UM DETERMINADO PRODUTO --           
SELECT tb_produto.id_produto		as produtoId,
				  nm_produto		as produto,
	   tb_cliente.id_cliente		as clienteId,
				  nm_cliente		as cliente,
				  ds_comentario		as comentario
	FROM tb_comentarios
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
        INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente
			WHERE tb_produto.id_produto = ?;

-- LISTAR OS COMENTARIOS DE UM DETERMINADO CLIENTE --
SELECT tb_produto.id_produto		as produtoId,
	   tb_cliente.id_cliente		as clienteId,
				  ds_comentario		as comentario
	FROM tb_comentarios
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_comentarios.id_produto
        INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_comentarios.id_cliente;
        
-- ALTERAR COMENTARIOS --
UPDATE tb_comentarios
	SET ds_comentario = ?
		WHERE id_cliente = ?;

-- DELETAR COMENTARIOS --  
DELETE FROM tb_comentarios
	WHERE id_cliente = ?;