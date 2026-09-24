-- ==========================================================
-- Script SQL - Sistema de Biblioteca
-- ==========================================================

CREATE DATABASE IF NOT EXISTS biblioteca_db;
USE biblioteca_db;

-- ----------------------------------------------------------
-- Tabela LIVRO
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS LIVRO (
    id_livro        INT AUTO_INCREMENT PRIMARY KEY,
    titulo          VARCHAR(150) NOT NULL,
    autor           VARCHAR(150) NOT NULL,
    isbn            VARCHAR(20)  NOT NULL UNIQUE,
    ano_publicacao  INT          NOT NULL,
    categoria       VARCHAR(80)  NOT NULL,
    quantidade      INT          NOT NULL DEFAULT 1
);

-- ----------------------------------------------------------
-- Tabela USUARIO
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario  INT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(150) NOT NULL,
    cpf         VARCHAR(14)  NOT NULL UNIQUE,
    email       VARCHAR(150) NOT NULL UNIQUE,
    telefone    VARCHAR(20)
);

-- ----------------------------------------------------------
-- Tabela EMPRESTIMO
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS EMPRESTIMO (
    id_emprestimo           INT AUTO_INCREMENT PRIMARY KEY,
    id_livro                INT NOT NULL,
    id_usuario              INT NOT NULL,
    data_emprestimo         DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao          DATE NULL,
    status                  ENUM('emprestado', 'devolvido', 'atrasado') NOT NULL DEFAULT 'emprestado',

    CONSTRAINT fk_emprestimo_livro
        FOREIGN KEY (id_livro) REFERENCES LIVRO(id_livro)
        ON UPDATE CASCADE ON DELETE RESTRICT,

    CONSTRAINT fk_emprestimo_usuario
        FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- ----------------------------------------------------------
-- Dados de teste
-- ----------------------------------------------------------
INSERT INTO LIVRO (titulo, autor, isbn, ano_publicacao, categoria, quantidade) VALUES
('Dom Casmurro', 'Machado de Assis', '9788525406958', 1899, 'Romance', 3),
('O Hobbit', 'J.R.R. Tolkien', '9788595084742', 1937, 'Fantasia', 5),
('Clean Code', 'Robert C. Martin', '9780132350884', 2008, 'Tecnologia', 2);

INSERT INTO USUARIO (nome, cpf, email, telefone) VALUES
('Ana Silva', '123.456.789-00', 'ana.silva@email.com', '(47) 99999-0001'),
('Bruno Souza', '987.654.321-00', 'bruno.souza@email.com', '(47) 99999-0002');

INSERT INTO EMPRESTIMO (id_livro, id_usuario, data_emprestimo, data_prevista_devolucao, data_devolucao, status) VALUES
(1, 1, '2026-09-01', '2026-09-15', NULL, 'emprestado'),
(2, 2, '2026-08-20', '2026-09-03', '2026-09-02', 'devolvido');
