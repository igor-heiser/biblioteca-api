# API REST - Sistema de Biblioteca

## Objetivo do sistema
Gerenciar o acervo de livros de uma biblioteca, os usuários cadastrados e o controle de empréstimos e devoluções, por meio de uma API REST.

## Tecnologias utilizadas
- Node.js
- Express
- MySQL (mysql2)
- CORS
- Git / GitHub

## Requisitos Funcionais
| Código | Requisito                | Descrição                                                        |
|--------|----------------------------|-------------------------------------------------------------------|
| RF01   | Cadastro de Livros        | Permite cadastrar um novo livro.                                 |
| RF02   | Listagem de Livros        | Permite consultar todos os livros.                               |
| RF03   | Consulta de um Livro      | Permite consultar um livro pelo ID.                               |
| RF04   | Pesquisa de Livros        | Permite pesquisar livros pelo título.                            |
| RF05   | Ordenação de Livros       | Permite listar os livros em ordem alfabética.                    |
| RF06   | Edição de Livros          | Permite editar um livro cadastrado.                               |
| RF07   | Exclusão de Livros        | Permite excluir um livro.                                        |
| RF08   | Cadastro de Usuários      | Permite cadastrar, consultar, editar e excluir usuários.         |
| RF09   | Registro de Empréstimos   | Permite registrar o empréstimo de um livro.                      |
| RF10   | Consulta de Empréstimos   | Permite consultar os empréstimos e suas devoluções.              |

## Como configurar o banco de dados
1. Certifique-se de ter o MySQL instalado e em execução.
2. Execute o script `banco.sql` para criar o banco `biblioteca_db`, as tabelas e os dados de teste:
   ```bash
   mysql -u root -p < banco.sql
   ```
3. Ajuste as credenciais de acesso (host, user, password) no arquivo `db.js`, se necessário.

## Como instalar as dependências
Dentro da pasta `backend`, execute:
```bash
npm install
```

## Como executar o servidor
```bash
node server.js
```
Ou, se preferir usar o script definido no `package.json`:
```bash
npm start
```
O servidor iniciará na porta **3030**: `http://localhost:3030`

## Rotas disponíveis

### Livros
| Método | Rota                     | Descrição                              |
|--------|---------------------------|------------------------------------------|
| GET    | /livros                  | Lista todos os livros                   |
| GET    | /livros/:id              | Consulta um livro pelo ID                |
| GET    | /livros/busca/:titulo    | Pesquisa livros pelo título              |
| GET    | /livros/ordenados        | Lista livros em ordem alfabética         |
| POST   | /livros                  | Cadastra um novo livro                   |
| PUT    | /livros/:id              | Atualiza um livro                        |
| DELETE | /livros/:id              | Exclui um livro                          |

### Usuários
| Método | Rota              | Descrição                        |
|--------|---------------------|------------------------------------|
| GET    | /usuarios          | Lista todos os usuários            |
| GET    | /usuarios/:id      | Consulta um usuário pelo ID        |
| POST   | /usuarios          | Cadastra um novo usuário           |
| PUT    | /usuarios/:id      | Atualiza um usuário                |
| DELETE | /usuarios/:id      | Exclui um usuário                  |

### Empréstimos
| Método | Rota                 | Descrição                                  |
|--------|------------------------|-----------------------------------------------|
| GET    | /emprestimos         | Lista todos os empréstimos                    |
| GET    | /emprestimos/:id     | Consulta um empréstimo pelo ID                |
| POST   | /emprestimos         | Registra um novo empréstimo                    |
| PUT    | /emprestimos/:id     | Atualiza um empréstimo (ex.: registra devolução) |

## Exemplos de requisições

### Cadastrar livro (POST /livros)
```json
{
  "titulo": "1984",
  "autor": "George Orwell",
  "isbn": "9788535914849",
  "ano_publicacao": 1949,
  "categoria": "Ficção",
  "quantidade": 4
}
```

### Cadastrar usuário (POST /usuarios)
```json
{
  "nome": "Carla Mendes",
  "cpf": "111.222.333-44",
  "email": "carla.mendes@email.com",
  "telefone": "(47) 98888-1234"
}
```

### Registrar empréstimo (POST /emprestimos)
```json
{
  "id_livro": 1,
  "id_usuario": 1,
  "data_emprestimo": "2026-09-24",
  "data_prevista_devolucao": "2026-10-08"
}
```

### Registrar devolução (PUT /emprestimos/:id)
```json
{
  "data_devolucao": "2026-10-05",
  "status": "devolvido"
}
```
