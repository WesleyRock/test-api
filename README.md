# API Test - Backend

 API desenvolvida em Node com NestJs para o projeto de uma ToDo list.

# Tecnologias utilizadas
  NodeJs

  NestJs

  Postgres

  JWT Token (Autenticação API)

  PrismaORM

# Estrutura de Pasta(Em modulos por quê acho mais organizado)
  src/
  ├─ modules/
  │  ├─ auth/
  │  ├─ users/
  │  ├─ tasks/
  │  └─ categories/
  ├─ prisma/
  │  └─ prisma.service.ts
  ├─ main.ts
  └─ app.module.ts

# Pré-requisitos
  NodeJs (>=20)

  PostgreSQL

# Instale as dependências:
  npm install

# Configure o ambiente:
  Copie o arquivo .env.example para .env:
    cp .env.example .env
  Abra o arquivo .env e configure o banco de dados:

  env
  DATABASE_URL="postgresql://nomdedouser:senhadobanco@localhost:5432/nomedobanco"

# Prisma: gerar client e criar tabelas
  *Gerar cliente Prisma*
  npx prisma generate

  *Criar/migrar tabelas no banco*
  npx prisma migrate dev --name init

# Executar aplicação
  *Rodar aplicação*
  npm run start

  *Ou em modo desenvolvimento com reload*
  npm run start:dev
