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



CHATGPT
 
 Aqui está um exemplo básico de como criar uma API simples usando Node.js com o framework Express:

1. Instale as dependências:
Certifique-se de ter o Node.js instalado em seu sistema. Você pode criar um novo diretório para o projeto e, em seguida, dentro desse diretório, inicialize um novo projeto Node.js e instale o Express:
bash

`mkdir exemplo-api`
`cd exemplo-api`
`npm init -y`
`npm install express``

## Melhorias

Na criação do login e senha fiz um acréscimo de colunas no <aluno> mas o correto seria fazer uma nova tabela <usuario> e mais uma tabela auxiliar <permissao> e nesta verificar se o usuário é um aluno ou professor. 

    - Data.types.ENUM([aluno, professor])
    - 1 CRUD para usuário
    - Quais alunos do sistema?
    - Quais professores do sistema?


## Video de apresentação do MiniProjeto 1

[Video] - (https://drive.google.com/file/d/1agfYpY5Jyd_7RpiKP6R189ZY-Tchu0Zp/view?usp=drive_link)

3. Crie a estrutura básica da API:
No arquivo index.js, você pode começar importando o Express e criando uma instância dele:
javascript

const express = require('express');
const app = express();
const port = 3000; // Porta em que o servidor vai rodar

// Rota básica
app.get('/', (req, res) => {
    res.send('Bem-vindo à minha API!');
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

4. Rode a aplicação:
Para rodar a aplicação, execute o comando node index.js no terminal a partir do diretório do seu projeto. Isso iniciará o servidor e ele estará ouvindo as requisições na porta especificada (nesse caso, a porta 3000).

5. Teste a API:
Agora você pode abrir um navegador ou usar uma ferramenta como o Postman para fazer requisições para http://localhost:3000 e ver a resposta da sua API.