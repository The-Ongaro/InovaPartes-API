USE inovapartesAPI;

-- TABELA PRODUTOS --
-- ADICIONAR PRODUTOS
INSERT INTO tb_produto (id_categoria, nm_produto, ds_marca, ds_modelo, bt_disponivel, ds_promocao, vl_valor, ds_detalhes, nr_quantidade)
				VALUES (1, 'Turbina Exemplo', 'Exemplo', 'Exemplo', true, 'Exemplo', '7000.00', 'Exemplo', 2);

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
		 WHERE tb_categoria.ds_categoria LIKE '%Alta Performance%';
		-- WHERE nm_produto LIKE '%Turbina%';
		-- WHERE tb_produto.id_produto = 5;
		-- WHERE tb_produto.ds_marca LIKE '%Bagio%';
        
-- ALTERAR PRODUTO
UPDATE tb_produto
	INNER JOIN tb_categoria ON tb_categoria.id_categoria = tb_produto.id_categoria
		SET tb_produto.id_categoria = 2,
						 nm_produto = 'Turbina EXEMPLOII',
						 ds_marca = 'ExemploII',
						 ds_modelo = 'ExemploII',
						 vl_valor = '7000.00',
						 ds_detalhes = 'ExemploII',
						 nr_quantidade = '2',
						 bt_disponivel = true,
						 ds_promocao = 'ExemploII'
			WHERE tb_produto.id_produto = 7;

-- DELETAR PRODUTO
DELETE FROM tb_produto
	WHERE id_produto = 3;

-- TABELA CATEGORIA --
-- INSERIR CATEGORIA
INSERT INTO tb_categoria (ds_categoria)
				VALUES ('Originais - Manutenção Preventiva'),
					   ('Alta Performance');
                       
-- TABELA IMAGEM --
-- INSERIR IMAGEM PRODUTO
INSERT INTO tb_img_produto (id_produto, ds_img)
				VALUES (1, 'storage/capaProduto/1234568kjhfd7dr84f');
                
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
				WHERE tb_produto.id_produto = 1;

-- ALTERAR IMAGEM 
UPDATE tb_img_produto
	SET ds_img = 'capaProduto/stoage/qwertyuiop12547852mnbvcxz'
		WHERE id_img_produto = 2;
	
-- DELETAR IMAGEM
DELETE FROM tb_img_produto
	WHERE id_img_produto = 1;
                       
-- TABELA ADM --
-- ADICIONAR ADM
INSERT INTO tb_adm (nm_adm, ds_cpf, ds_email, ds_senha, img_adm)
				VALUES ('Maria Alice', '123.123.123-00', 'mariaalice@gmail.com', 'admin@123', '');
                
-- ALTERAR IMAGEM ADM
UPDATE tb_adm
	SET img_adm 	 = 'storage/imgADM/shfhrbbjkdvbks755'
		WHERE id_adm = 1;
        
-- ALTERAR INFORMACOES ADM
UPDATE tb_adm
	SET nm_adm 		= 'Maria Alicee',
		ds_cpf 		= '123.123.123-55',
        ds_email 	= 'alicemaria@gmail.com',
        ds_senha 	= 'admin@123'
	WHERE id_adm 	= 1;
    
-- LOGIN ADM (e-mail ou cpf)
SELECT id_adm 	as id,
	   nm_adm	as nome,
       ds_email as email
	FROM tb_adm
		   WHERE ds_email = '' 
				OR ds_cpf = '123.123.123-55'
					AND ds_senha = 'admin@123';
                    
-- TABELA CLIENTE -- 
-- ADICIONAR CLIENTE
INSERT INTO tb_cliente (nm_cliente, ds_cpf, ds_telefone, ds_email, ds_senha, img_cliente)
				VALUES ('Luiz Henrique Dias Ananias', '123.123.123-67', '(11) 94000-0000', 'ananias@gmailcom', 'abc@123', '');

-- ALTERAR IMAGEM CLIENTE
UPDATE tb_cliente
	SET img_cliente = ""
		WHERE id_cliente = 1;
                
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
		WHERE nm_cliente LIKE '%Catarina%';
	 -- WHERE id_cliente = 1;
        
-- LOGIN CLIENTE
SELECT id_cliente 	as Id,
	   nm_cliente 	as Nome,
	   ds_email 	as Email
	FROM tb_cliente
		WHERE ds_email 		= 'ongarocatarina@gmail.com'
			AND ds_senha 	= '123@abc';
            
-- ALTERAR INFO CLIENTE
UPDATE tb_cliente
	SET nm_cliente 		= 'Catarina',
		ds_cpf 			= '147.147.147-99',
        ds_telefone 	= '(11) 95555-5555',
        ds_email 		= 'catarina@gmail.com',
        ds_senha 		= '123@abc',
        img_cliente 	= 'storage/imgUsuario/slkfljkjhg45'
	WHERE id_cliente 	= 1;

-- DELETAR CONTA CLIENTE
DELETE FROM tb_cliente
	WHERE id_cliente = 1;
    
-- TABELA CARTAO --
-- INSERIR INFO CARTAO
INSERT INTO tb_cartao (id_cliente, nm_titular, ds_cartao, ds_validade, nr_cod_seguranca, nr_parcelas)
				VALUES (2, 'Catarina', '0000 0000 0000 0000', '2024/05', '000', 5);

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
   SET nm_titular 		= 'Carla Souza',
	   ds_cartao 		= '2222 1111 2222 1111',
	   ds_validade 		= '2025/08',
	   nr_cod_seguranca = '321',
	   nr_parcelas 		= '8'
	WHERE id_cliente 	= 2;
    
-- TABELA PEDIDO --
-- INSERIR PEDIDO
INSERT INTO tb_pedido (id_produto, id_cartao, id_endereco, nr_pedido, nr_quantidade, ds_status)
				VALUES (1, 1, 1, 1, 1, 'Enviando');
                
-- LISTAR PEDIDOS
SELECT tb_produto.id_produto 				as ProdutoID,
				  nm_produto				as Produto,
                  ds_marca 					as Marca,
	   tb_cartao.id_cartao 					as Cartao,
				  nm_titular				as Titular,
       tb_endereco.id_endereco 				as Endereco,
                  nm_logradouro				as Logradouro,
                  ds_cidade					as Cidade,
                  ds_estado					as Estado,
                  nr_pedido 				as NumPedido,
       tb_pedido.nr_quantidade 				as Quantidade,
                  ds_status 				as StatusPedido
	FROM tb_pedido
		INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
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
                  nr_pedido 				as NumPedido,
		tb_pedido.nr_quantidade 			as Quantidade,
                  ds_status 				as StatusPedido
		FROM tb_pedido
			INNER JOIN tb_produto ON tb_produto.id_produto = tb_pedido.id_produto
			INNER JOIN tb_cartao ON tb_cartao.id_cartao = tb_pedido.id_cartao
			INNER JOIN tb_endereco ON tb_endereco.id_endereco = tb_pedido.id_endereco
				WHERE ds_status LIKE '%Enviado%';

-- ALTERAR STATUS DO PEDIDO
UPDATE tb_pedido
	SET ds_status = 'Enviado'
		WHERE id_pedido = 1;
    
-- TABELA ENDERECO --
-- INSERIR ENDERECO USUARIO
INSERT INTO tb_endereco (id_cliente, nm_logradouro, ds_num_casa, ds_complemento, ds_cep, ds_bairro, ds_cidade, ds_estado)
				VALUES (2, 'Exemplo', 'Exemplo', 'Exemplo', 'Exemplo-550', 'JD.Exemplo', 'Exemplo', 'Exemplo');
                
-- LISTAR ENDERECO + USUARIO
SELECT tb_cliente.id_cliente as IdCliente,
	   nm_cliente	as Nome,
       nm_logradouro as Logradouro,
       ds_num_casa as Numero,
       ds_complemento as Complemento,
       ds_cep as CEP,
       ds_bairro as Bairro,
       ds_cidade as Cidade,
       ds_estado as Estado
	FROM tb_endereco
		INNER JOIN tb_cliente ON tb_cliente.id_cliente = tb_endereco.id_cliente
			ORDER BY IdCliente;
            
-- ALTERAR ENDERECO
UPDATE tb_endereco
	SET nm_logradouro = 'Rua Pernet',
		ds_num_casa = '395C',
        ds_complemento = 'Apartameto',
        ds_cep = '19090-020',
        ds_bairro = 'JD.Elvira',
        ds_cidade = 'São Paulo',
        ds_estado = 'SP'
	WHERE id_cliente = 1;