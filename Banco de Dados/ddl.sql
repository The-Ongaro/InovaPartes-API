CREATE DATABASE inovapartesAPI;
USE inovapartesAPI;

CREATE TABLE tb_produto (
id_produto 			INT PRIMARY KEY AUTO_INCREMENT,
id_categoria		INT NOT NULL,
nm_produto 			VARCHAR(200) NOT NULL,
ds_marca 			VARCHAR(200) NOT NULL,
ds_modelo 			VARCHAR(200) NOT NULL,
bt_disponivel 		BOOLEAN NOT NULL,
ds_promocao 		VARCHAR(200) NOT NULL,
vl_valor 			DECIMAL(6,2) NOT NULL,
ds_detalhes 		VARCHAR(200) NOT NULL,
nr_quantidade 		INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id_categoria) ON DELETE CASCADE
);

        
CREATE TABLE tb_categoria (
id_categoria 		INT PRIMARY KEY AUTO_INCREMENT,
ds_categoria 		VARCHAR(100) NOT NULL
);


CREATE TABLE tb_img_produto (
id_img_produto 		INT PRIMARY KEY AUTO_INCREMENT,
id_produto			INT NOT NULL,
ds_img 				VARCHAR(200) NOT NULL,
FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) ON DELETE CASCADE
);


CREATE TABLE tb_adm (
id_adm 				INT PRIMARY KEY AUTO_INCREMENT,
nm_adm 				VARCHAR(100) NOT NULL,
ds_cpf 				VARCHAR(100) NOT NULL,
ds_email 			VARCHAR(100) NOT NULL,
ds_senha 			VARCHAR(100) NOT NULL,
img_adm 			VARCHAR(200)
);
        

CREATE TABLE tb_cliente (
id_cliente 			INT PRIMARY KEY AUTO_INCREMENT,
nm_cliente 			VARCHAR(100) NOT NULL,
ds_cpf 				VARCHAR(100) NOT NULL,
ds_telefone 		VARCHAR(100) NOT NULL,
ds_email 			VARCHAR(100) NOT NULL,
ds_senha 			VARCHAR(100) NOT NULL,
img_cliente 		VARCHAR(100) NOT NULL
);
    

CREATE TABLE tb_cartao (
id_cartao 			INT PRIMARY KEY AUTO_INCREMENT,
id_cliente 			INT NOT NULL,
nm_titular 			VARCHAR(100) NOT NULL,
ds_cartao 			VARCHAR(100) NOT NULL,
ds_validade 		VARCHAR(10) NOT NULL,
nr_cod_seguranca 	INT NOT NULL,
nr_parcelas 		INT NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente) ON DELETE CASCADE
);
    

CREATE TABLE tb_pedido (
id_pedido 			INT PRIMARY KEY AUTO_INCREMENT,
id_cliente          INT NOT NULL,
id_produto 			INT NOT NULL,
id_cartao 			INT NOT NULL,
id_endereco 		INT NOT NULL,
nr_pedido 			INT NOT NULL,
nr_quantidade 		INT NOT NULL,
ds_status 			VARCHAR(200) NOT NULL,
FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) ON DELETE CASCADE ,
FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente) ON DELETE CASCADE,
FOREIGN KEY (id_cartao) REFERENCES tb_cartao (id_cartao) ON DELETE CASCADE,
FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id_endereco) ON DELETE CASCADE
);


CREATE TABLE tb_endereco (
id_endereco 		INT PRIMARY KEY AUTO_INCREMENT,
id_cliente 			INT NOT NULL,
nm_logradouro 		VARCHAR(100) NOT NULL,
ds_num_casa 		VARCHAR(100) NOT NULL,
ds_complemento 		VARCHAR(100) NOT NULL,
ds_cep 				VARCHAR(100) NOT NULL,
ds_bairro 			VARCHAR(100) NOT NULL,
ds_cidade 			VARCHAR(100) NOT NULL,
ds_estado 			VARCHAR(100) NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id_cliente) ON DELETE CASCADE
);