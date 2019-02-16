CREATE DATABASE database_pedidos;

USE database_pedidos;

-- tabla usuario
-- DROP TABLE usuario;
CREATE TABLE usuario (
  id INT(10) PRIMARY KEY NOT NULL,
  email VARCHAR(30) NOT NULL UNIQUE,
  clave VARCHAR(100) NOT NULL UNIQUE CHECK (LENGTH(clave) >= 6),
  nombre_completo VARCHAR(30) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(30) NOT NULL,
  cod_municipio VARCHAR(20) NOT NULL,
  cod_postal VARCHAR(20) NOT NULL
);
 
-- modificaciones de la tabla usuario 
ALTER TABLE usuario
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2; -- cada que se crea un usuaio, el 'id' incrementa autamaticamente en 2 

-- tabla producto
--DROP TABLE producto;
CREATE TABLE producto (
  nom_producto VARCHAR(30) PRIMARY KEY NOT NULL,
  valor INT(10) NOT NULL
);

-- tabla pedido
--DROP TABLE pedido;
CREATE TABLE pedido (
  id_ped INT(15) PRIMARY KEY NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  id_usuario INT(10) NOT NULL, 
  FOREIGN KEY (id_usuario) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

-- tabla con la info del pedido 
--DROP TABLE info_pedido;
CREATE TABLE info_pedido (
  id_pedido INT(15) NOT NULL,
  id_producto VARCHAR(30) NOT NULL,
  cantidad INT(3),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_ped) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES producto(nom_producto) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

-- modificaciones de info_pedido
ALTER TABLE info_pedido
  ADD PRIMARY KEY (id_pedido, id_producto);

-- LINKS TABLE
--DROP TABLE links;
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  FOREIGN KEY (user_id) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE links 
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

/* INSERTS DE PRUEBA
INSERTS para la tabla producto */
INSERT INTO producto VALUES ('prod1', 1000);
INSERT INTO producto VALUES ('prod2', 2000);
INSERT INTO producto VALUES ('prod3', 3000);
INSERT INTO producto VALUES ('prod4', 5600);
INSERT INTO producto VALUES ('prod5', 2300);
INSERT INTO producto VALUES ('prod6', 1100);
INSERT INTO producto VALUES ('prod7', 1600);
INSERT INTO producto VALUES ('prod8', 4200);
INSERT INTO producto VALUES ('prod9', 2100);
INSERT INTO producto VALUES ('prod10', 6700);
INSERT INTO producto VALUES ('prod11', 10000);
INSERT INTO producto VALUES ('prod12', 1200);
INSERT INTO producto VALUES ('prod13', 1200);
INSERT INTO producto VALUES ('prod14', 7000);
INSERT INTO producto VALUES ('prod15', 5000);
INSERT INTO producto VALUES ('prod16', 6300);
INSERT INTO producto VALUES ('prod17', 9000);
INSERT INTO producto VALUES ('prod18', 9200);
INSERT INTO producto VALUES ('prod19', 8300);
INSERT INTO producto VALUES ('prod20', 11000);

-- INSERTS para la tabla 'usuario'
INSERT INTO usuario VALUES (1, 'usuario1@gmail.com', 'usuaio1', 'usuario uno', '345647567', 'calle 33 # 26-8', 'Medellín', '1434'); 
INSERT INTO usuario VALUES (2, 'usuario2@gmail.com', 'usuaio2', 'usuario dos', '2131257567', 'calle 34 # 31-18', 'Medellín', '8495'); 
INSERT INTO usuario VALUES (3, 'usuario3@gmail.com', 'usuaio3', 'usuario tres', '2256472343', 'calle 67 # 49-21', 'Bogotá', '9374'); 
INSERT INTO usuario VALUES (4, 'usuario4@gmail.com', 'usuaio4', 'usuario cuatro', '3234778989', 'calle 21 # 13-9', 'Bogotá', '2943'); 
INSERT INTO usuario VALUES (5, 'usuario5@gmail.com', 'usuaio5', 'usuario cinco', '2425477879', 'calle 16 # 49-29', 'Cali', '7278'); 

/* INSERTS para la tabla 'pedido'
'YYYY-MM-DD' formato DATE, '00:00:00' formato TIME */
INSERT INTO pedido VALUES (1, '2016-04-12','12:03:01', 2);
INSERT INTO pedido VALUES (2, '2016-04-21','14:12:22', 2);
INSERT INTO pedido VALUES (3, '2016-06-13','16:09:21', 2);
INSERT INTO pedido VALUES (4, '2017-06-13','13:10:16', 1);
INSERT INTO pedido VALUES (5, '2018-11-11','16:09:21', 3);
INSERT INTO pedido VALUES (6, '2018-12-24','18:05:06', 3);
INSERT INTO pedido VALUES (7, '2018-11-11','16:11:21', 4);
INSERT INTO pedido VALUES (8, '2018-11-11','16:09:21', 5);
INSERT INTO pedido VALUES (9, '2019-02-10','16:20:05', 6);
INSERT INTO pedido VALUES (10, '2019-01-16','17:12:58', 6);
INSERT INTO pedido VALUES (11, '2019-02-22','19:12:01', 6);

-- INSERTS para la tabla 'info_pedido' 
INSERT INTO info_pedido VALUES (1, 'prod1', 10);
INSERT INTO info_pedido VALUES (1, 'prod5', 12);
INSERT INTO info_pedido VALUES (1, 'prod10', 5);
INSERT INTO info_pedido VALUES (1, 'prod20', 1);
INSERT INTO info_pedido VALUES (2, 'prod6', 6);
INSERT INTO info_pedido VALUES (2, 'prod8', 5);
INSERT INTO info_pedido VALUES (2, 'prod10', 3);
INSERT INTO info_pedido VALUES (3, 'prod16', 1);
INSERT INTO info_pedido VALUES (3, 'prod10', 5);
INSERT INTO info_pedido VALUES (3, 'prod12', 7);
INSERT INTO info_pedido VALUES (3, 'prod19', 1);
INSERT INTO info_pedido VALUES (4, 'prod13', 10);
INSERT INTO info_pedido VALUES (4, 'prod12', 12);
INSERT INTO info_pedido VALUES (4, 'prod11', 16);
INSERT INTO info_pedido VALUES (4, 'prod20', 2);
INSERT INTO info_pedido VALUES (5, 'prod15', 30);
INSERT INTO info_pedido VALUES (6, 'prod15', 31);
INSERT INTO info_pedido VALUES (7, 'prod15', 32);
INSERT INTO info_pedido VALUES (8, 'prod15', 33);
INSERT INTO info_pedido VALUES (9, 'prod10', 16);
INSERT INTO info_pedido VALUES (10, 'prod8', 28);
INSERT INTO info_pedido VALUES (10, 'prod5', 10);
INSERT INTO info_pedido VALUES (10, 'prod12', 7);
INSERT INTO info_pedido VALUES (11, 'prod9', 2);
INSERT INTO info_pedido VALUES (11, 'prod13', 3);