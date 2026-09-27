# ServiceFlow

Sistema Full Stack de gestão para oficinas e empresas de assistência técnica. Projeto construído para portfólio de freelancer, com foco em uma operação real: clientes, equipamentos, ordens de serviço, orçamentos, financeiro e dashboard.

## Stack

**Frontend:** React + TypeScript + Vite + React Router + Recharts + Lucide

**Backend:** Node.js + Express + Prisma + PostgreSQL + JWT + Zod + PDFKit

**Infra:** Docker Compose

## Funcionalidades

- Login com JWT e níveis de acesso
- Dashboard com faturamento, resultado, clientes e serviços ativos
- Gráfico de receita por mês
- Distribuição de serviços por status
- CRUD de clientes
- Cadastro de equipamentos
- Ordens de serviço com ciclo de status
- Orçamentos com cálculo de total
- Geração de orçamento em PDF
- Controle de entradas e despesas
- API REST organizada por domínio
- PostgreSQL via Docker

## Rodando localmente

### 1. Banco

```bash
docker compose up -d postgres
```

### 2. API

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

API: `http://localhost:3333`

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Demo

E-mail: `admin@serviceflow.dev`

Senha: `123456`

## Docker completo

```bash
docker compose up --build
```

Depois execute o seed uma vez:

```bash
docker exec -it serviceflow-api node prisma/seed.js
```

## Próximas evoluções

- Upload de fotos de equipamentos
- Histórico/auditoria de alterações da OS
- Notificações por e-mail/WhatsApp
- Agenda de técnicos
- Permissões por módulo
- Exportação Excel
- Integração com gateway de pagamento
- Testes automatizados e CI/CD
