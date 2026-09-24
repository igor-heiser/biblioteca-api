# Passo a passo Git/GitHub (Etapa 7)

1. Crie um repositório vazio no GitHub (ex.: `biblioteca-api`).
2. No terminal, dentro da pasta do projeto:
```bash
git init
git add .
git commit -m "Criação do projeto"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```
3. Durante o desenvolvimento, faça commits separados por etapa, por exemplo:
```bash
git add modelo-logico.png requisitos-funcionais.md
git commit -m "Criação do modelo lógico"

git add backend/banco.sql
git commit -m "Criação do banco de dados"

git add backend/server.js backend/db.js backend/package.json
git commit -m "Criação da API"

git commit -m "Implementação das rotas de livros"
git commit -m "Implementação das rotas de usuários"
git commit -m "Implementação dos empréstimos"

git add backend/README.md
git commit -m "Criação do README"
git push
```
