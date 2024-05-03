# Semana 10/11 SENAI e FloripaMaisTech turma TRIP /2024

## 🏦 Sobre o projeto de Banco de dados

**Objetivo: Aprender a mexer com banco de dados e suas atualizações**

  Esta é uma API simples para gerenciamento de cursos, onde você pode realizar operações como criar, listar, atualizar e deletar alunos, cursos e matriculas.
  A API permite a pesquisa de cursos por nome e duração em horas.

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


## A API estará disponível em http://localhost:3000.


## 🛠️ Construído com

- Trello - aprendendo a criar e mover cards.
- VsCode - aprendendo a usar a ferramenta e suas extensões.
- GitHub - aprendendo a utilizar sempre enviando ou trazendo para meu local o repositório, fazendo alterações...
- Node.js - Instalação
- Express - CRUD
- Sequelize - aprendendo a usar migration, models, routes...
- Postgres
- Postman 
  

## 🧑🏻‍🏫 Professores

* **Rawan.H** - [GitHub](https://github.com/Hawangledt)
* **Douglas Cavalcante** - [GitHub](https://github.com/douglas-cavalcante)

 

## 📄 Acompanhe as resoluções e dicas de aulas

**FuturoDev - Trip** - [GitHub do curso](https://github.com/FuturoDEV-Trip/modulo-01)

## Melhorias

Na criação do login e senha fiz um acréscimo de colunas no <aluno> mas o correto seria fazer uma nova tabela <usuario> e mais uma tabela auxiliar <permissao> e nesta verificar se o usuário é um aluno ou professor. 

    - Data.types.ENUM([aluno, professor])
    - 1 CRUD para usuário
    - Quais alunos do sistema?
    - Quais professores do sistema?


## Video de apresentação do MiniProjeto 1

[Video] - (https://drive.google.com/file/d/1agfYpY5Jyd_7RpiKP6R189ZY-Tchu0Zp/view?usp=drive_link)

## 🎁 Expressões de gratidão

* Conte a outras pessoas sobre este estudo 📢;
* Lab365 e todos os monitores;
* Qualquer dúvida ou sugestão de melhorar o código eu aceito;
* Um agradecimento publicamente 🫂;
* etc.
