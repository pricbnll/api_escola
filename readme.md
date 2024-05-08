## 🏦 Sobre o projeto: Exemplo_API_projetos_inicio

**Objetivo: ter um esqueleto inicial para copiar para outra API**

Conseguir ter um esqueleto inicial para formular API. Ter exemplos de routes, controles, auth, middleware... Um formato inicial para aprimorar em qualquer projeto subsequente.

**Separação de responsabilidade: **
- Controllers - intuito de concentrar toda implementação daquela entidade = Aluno. Concentra o código em si daquela rota 
- Routes - tem finalidade de salvar todas as rotas 
- Middleware - definir os middlewares da aplicação 
- Models - acesso a tabela do banco de dados

## 🤖 Rodar o repositório:

### ≈Na primeira vez é necessário instalar as dependencias:

1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`

### Para rodar o repositório em ambiente local

1. `npm run start:dev`

## Trabalhando com migrations:

### Criar uma migration

1. `sequelize migration:generate --name criar_tabela_alunos`
2. `npx sequelize-cli migration:generate --name criar_tabela_alunos`

### Rodar uma migration. Opções:

1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

### Reverter a última migration:

1. `sequelize-cli db:migrate:undo`
2. `npx sequelize-cli db:migrate:undo`

## Documentação do Sequelize:

https://sequelize.org/docs/v6/core-concepts/model-basics/

## Novas Bibliotecas utilizadas:

### instalar o sequelize

`npm install sequelize`

### instalar o driver do PostgreSQL

`npm install pg`

### instalar o CLI do sequelize

`npm install -g sequelize-cli`

### instalar o dotenv

`npm install dotenv`

### instalar o JsonWebToken ( JWT )

`npm install jsonwebtoken`
