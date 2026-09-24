const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();
server.use(cors());
server.use(express.json());

/* ==========================================================
   ROTAS DE LIVROS
   ========================================================== */

/**
 * ROTA: GET /livros
 * OBJETIVO: Listar todos os livros cadastrados no banco de dados.
 * ATENDE: RF02 (Listagem de Livros).
 */
server.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM LIVRO';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: GET /livros/ordenados
 * OBJETIVO: Listar os livros em ordem alfabética de título (A a Z).
 * ATENDE: RF05 (Ordenação de Livros).
 */
server.get('/livros/ordenados', (req, res) => {
    const sql = 'SELECT * FROM LIVRO ORDER BY titulo ASC';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: GET /livros/busca/:titulo
 * OBJETIVO: Pesquisar livros pelo título (busca parcial).
 * ATENDE: RF04 (Pesquisa de Livros).
 */
server.get('/livros/busca/:titulo', (req, res) => {
    const sql = 'SELECT * FROM LIVRO WHERE titulo LIKE ?';

    const termoBusca = '%' + req.params.titulo + '%';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json(resultados);
    });
});

/**
 * ROTA: GET /livros/:id
 * OBJETIVO: Consultar um único livro pelo ID.
 * ATENDE: RF03 (Consulta de um Livro).
 */
server.get('/livros/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM LIVRO WHERE id_livro = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: POST /livros
 * OBJETIVO: Cadastrar um novo livro.
 * ATENDE: RF01 (Cadastro de Livro).
 */
server.post('/livros', (req, res) => {
    const { titulo, autor, isbn, ano_publicacao, categoria, quantidade } = req.body;

    if (titulo == null || autor == null || isbn == null || ano_publicacao == null ||
        categoria == null || quantidade == null
    ) {
        return res.status(400).json({ erro: 'Todos os campos devem ser obrigatoriamente preenchidos.' });
    }

    const sql = `INSERT INTO LIVRO
    (titulo, autor, isbn, ano_publicacao, categoria, quantidade) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [titulo, autor, isbn, ano_publicacao, categoria, quantidade], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({
            message: 'Livro cadastrado com sucesso.',
            id: resultados.insertId
        });
    });
});

/**
 * ROTA: PUT /livros/:id
 * OBJETIVO: Editar as informações de um livro existente.
 * ATENDE: RF06 (Edição de Livros).
 */
server.put('/livros/:id', (req, res) => {
    const { titulo, autor, isbn, ano_publicacao, categoria, quantidade } = req.body;
    const { id } = req.params;

    const sql = `UPDATE LIVRO SET titulo = ?, autor = ?, isbn = ?, ano_publicacao = ?,
       categoria = ?, quantidade = ? WHERE id_livro = ?`;

    connection.query(sql, [titulo, autor, isbn, ano_publicacao, categoria, quantidade, id], (erro) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ mensagem: 'Livro atualizado com sucesso!' });
    });
});

/**
 * ROTA: DELETE /livros/:id
 * OBJETIVO: Excluir um livro do sistema.
 * ATENDE: RF07 (Exclusão de Livros).
 */
server.delete('/livros/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM LIVRO WHERE id_livro = ?';

    connection.query(sql, [id], (erro) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ mensagem: 'Livro excluído com sucesso!' });
    });
});

/* ==========================================================
   ROTAS DE USUÁRIOS
   ========================================================== */

/**
 * ROTA: GET /usuarios
 * OBJETIVO: Listar todos os usuários cadastrados.
 * ATENDE: RF08 (Cadastro de Usuários - listagem de apoio).
 */
server.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM USUARIO';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: GET /usuarios/:id
 * OBJETIVO: Consultar um único usuário pelo ID.
 */
server.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM USUARIO WHERE id_usuario = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: POST /usuarios
 * OBJETIVO: Cadastrar um novo usuário.
 * ATENDE: RF08 (Cadastro de Usuários).
 */
server.post('/usuarios', (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    if (nome == null || cpf == null || email == null) {
        return res.status(400).json({ erro: 'Nome, CPF e e-mail são obrigatórios.' });
    }

    const sql = `INSERT INTO USUARIO (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)`;

    connection.query(sql, [nome, cpf, email, telefone ?? null], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({
            message: 'Usuário cadastrado com sucesso.',
            id: resultados.insertId
        });
    });
});

/**
 * ROTA: PUT /usuarios/:id
 * OBJETIVO: Editar as informações de um usuário existente.
 */
server.put('/usuarios/:id', (req, res) => {
    const { nome, cpf, email, telefone } = req.body;
    const { id } = req.params;

    const sql = `UPDATE USUARIO SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id_usuario = ?`;

    connection.query(sql, [nome, cpf, email, telefone, id], (erro) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ mensagem: 'Usuário atualizado com sucesso!' });
    });
});

/**
 * ROTA: DELETE /usuarios/:id
 * OBJETIVO: Excluir um usuário do sistema.
 */
server.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM USUARIO WHERE id_usuario = ?';

    connection.query(sql, [id], (erro) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ mensagem: 'Usuário excluído com sucesso!' });
    });
});

/* ==========================================================
   ROTAS DE EMPRÉSTIMOS
   ========================================================== */

/**
 * ROTA: GET /emprestimos
 * OBJETIVO: Listar todos os empréstimos, com dados do livro e do usuário.
 * ATENDE: RF10 (Consulta de Empréstimos).
 */
server.get('/emprestimos', (req, res) => {
    const sql = `
        SELECT e.id_emprestimo, e.data_emprestimo, e.data_prevista_devolucao, e.data_devolucao, e.status,
               l.id_livro, l.titulo,
               u.id_usuario, u.nome AS nome_usuario
        FROM EMPRESTIMO e
        JOIN LIVRO l ON l.id_livro = e.id_livro
        JOIN USUARIO u ON u.id_usuario = e.id_usuario
    `;

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: GET /emprestimos/:id
 * OBJETIVO: Consultar um único empréstimo pelo ID.
 */
server.get('/emprestimos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM EMPRESTIMO WHERE id_emprestimo = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

/**
 * ROTA: POST /emprestimos
 * OBJETIVO: Registrar um novo empréstimo de livro.
 * ATENDE: RF09 (Registro de Empréstimos).
 */
server.post('/emprestimos', (req, res) => {
    const { id_livro, id_usuario, data_emprestimo, data_prevista_devolucao } = req.body;

    if (id_livro == null || id_usuario == null || data_emprestimo == null || data_prevista_devolucao == null) {
        return res.status(400).json({ erro: 'Todos os campos devem ser obrigatoriamente preenchidos.' });
    }

    const sql = `INSERT INTO EMPRESTIMO
    (id_livro, id_usuario, data_emprestimo, data_prevista_devolucao, data_devolucao, status)
    VALUES (?, ?, ?, ?, NULL, 'emprestado')`;

    connection.query(sql, [id_livro, id_usuario, data_emprestimo, data_prevista_devolucao], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({
            message: 'Empréstimo registrado com sucesso.',
            id: resultados.insertId
        });
    });
});

/**
 * ROTA: PUT /emprestimos/:id
 * OBJETIVO: Atualizar um empréstimo, incluindo o registro da devolução.
 */
server.put('/emprestimos/:id', (req, res) => {
    const { data_devolucao, status } = req.body;
    const { id } = req.params;

    const sql = `UPDATE EMPRESTIMO SET data_devolucao = ?, status = ? WHERE id_emprestimo = ?`;

    connection.query(sql, [data_devolucao ?? null, status, id], (erro) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        res.json({ mensagem: 'Empréstimo atualizado com sucesso!' });
    });
});

const PORT = 3030;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
