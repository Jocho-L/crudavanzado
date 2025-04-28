CREATE DATABASE libreriajs;
USE libreriajs;

CREATE TABLE categorias
(
	idcategoria INT AUTO_INCREMENT PRIMARY KEY,
	categoria VARCHAR(30) NOT NULL,
    CONSTRAINT uk_categoria_cat UNIQUE (categoria)
) ENGINE = INNODB;

INSERT INTO categorias (categoria)
VALUES
	('Ficción'),
    ('Misterio'),
    ('Biografía'),
    ('Fantasía');

CREATE TABLE libros
(
	idlibro 	    INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria	 	INT 			NOT NULL,
    titulo			VARCHAR(70) 	NOT NULL,
    precio 			DECIMAL(7,2) 	NOT NULL,
    tapa		    ENUM('B', 'D') 	NOT NULL, -- B: Blanda, D: Dura
    descripcion 	VARCHAR(150),
    CONSTRAINT fk_idcategoria_libros FOREIGN KEY (idcategoria) REFERENCES categorias (idcategoria)
) ENGINE = INNODB;

INSERT INTO libros (idcategoria, titulo, precio, tapa, descripcion)
VALUES
    (1, 'El Principito', 25.50, 'B', 'Una historia filosófica para todas las edades.'),
    (2, 'El Código Da Vinci', 45.00, 'D', 'Un thriller lleno de misterios y secretos.');

SELECT
    L.idlibro,
    C.categoria,
    L.titulo,
    L.precio,
    L.tapa,
    L.descripcion
FROM libros L
INNER JOIN categorias C ON L.idcategoria = C.idcategoria;
