# Projeto Fullstack Node.js + React

Projeto base fullstack pensado para um aluno de 5o semestre, com foco em organizacao, autenticacao, CRUD e integracao com banco de dados.

## Tecnologias

- Backend: Node.js, Express, Prisma, SQLite, JWT, bcryptjs
- Frontend: React, Vite, React Router
- Banco de dados: SQLite

## Estrutura de pastas

```text
new-project/
|-- backend/
|   |-- prisma/
|   |   `-- schema.prisma
|   |-- src/
|   |   |-- config/
|   |   |   `-- env.js
|   |   |-- controllers/
|   |   |   |-- authController.js
|   |   |   `-- taskController.js
|   |   |-- lib/
|   |   |   `-- prisma.js
|   |   |-- middleware/
|   |   |   |-- authMiddleware.js
|   |   |   `-- errorHandler.js
|   |   |-- routes/
|   |   |   |-- authRoutes.js
|   |   |   `-- taskRoutes.js
|   |   |-- utils/
|   |   |   `-- generateToken.js
|   |   |-- app.js
|   |   `-- server.js
|   |-- .env.example
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   `-- ProtectedRoute.jsx
|   |   |-- context/
|   |   |   `-- AuthContext.jsx
|   |   |-- pages/
|   |   |   |-- DashboardPage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   `-- RegisterPage.jsx
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   `-- vite.config.js
`-- README.md
```

## Funcionalidades

- Cadastro de usuario
- Login com JWT
- Protecao de rotas no frontend
- CRUD completo de tarefas
- Relacionamento entre usuario e tarefas
- Persistencia em banco de dados SQLite

## Como executar

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Servidor padrao: `http://localhost:3001`

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Se quiser configurar a URL da API:

```bash
copy .env.example .env
npm run dev
```

Frontend padrao: `http://localhost:5173`

## Scripts na raiz

```bash
npm run dev:backend
npm run dev:frontend
```

## Principais arquivos

- `backend/src/controllers/authController.js`: regras de cadastro e login
- `backend/src/controllers/taskController.js`: regras do CRUD de tarefas
- `backend/src/middleware/authMiddleware.js`: validacao do token JWT
- `backend/prisma/schema.prisma`: modelos do banco
- `frontend/src/context/AuthContext.jsx`: gerenciamento de autenticacao no React
- `frontend/src/pages/DashboardPage.jsx`: tela principal com o CRUD
- `frontend/src/services/api.js`: comunicacao com o backend

## Sugestoes de evolucao

- Adicionar validacao com Zod
- Criar refresh token
- Adicionar testes com Vitest e Supertest
- Substituir SQLite por PostgreSQL
- Melhorar layout com biblioteca de UI
