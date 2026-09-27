# ServiceFlow

Sistema Full Stack de gestão para oficinas, assistências técnicas e empresas de prestação de serviços.

O **ServiceFlow** centraliza o gerenciamento de clientes, equipamentos, ordens de serviço, orçamentos e financeiro em um único sistema, além de disponibilizar um dashboard com indicadores da operação.

## 🚀 Demonstração

> Projeto desenvolvido para portfólio Full Stack e demonstração de uma aplicação comercial completa.

**Frontend:** React + TypeScript
**Backend:** Node.js + Express
**Banco de dados:** PostgreSQL

---

## 📌 Funcionalidades

### 📊 Dashboard

Visualização dos principais indicadores da empresa:

* Faturamento
* Serviços em andamento
* Serviços concluídos
* Clientes ativos
* Orçamentos
* Receitas e despesas

Também possui gráficos para análise de:

* Faturamento por período
* Serviços por status
* Tipos de serviços
* Evolução financeira

### 👥 Clientes

Cadastro e gerenciamento de clientes.

Informações disponíveis:

* Nome
* CPF/CNPJ
* Telefone
* E-mail
* Endereço
* Histórico de serviços

### 🔧 Equipamentos

Cadastro dos equipamentos pertencentes aos clientes.

Exemplo:

```text
Cliente: João Silva
Equipamento: Máquina Laser X200
Número de série: 123456
```

Cada equipamento pode possuir seu histórico de atendimentos.

### 🛠️ Ordens de Serviço

Criação e acompanhamento de ordens de serviço.

Fluxo:

```text
Recebido
   ↓
Diagnóstico
   ↓
Orçamento
   ↓
Aprovado
   ↓
Em manutenção
   ↓
Pronto
   ↓
Entregue
```

A ordem de serviço pode registrar:

* Problema relatado
* Diagnóstico
* Serviço realizado
* Peças utilizadas
* Mão de obra
* Valor total
* Status
* Cliente
* Equipamento

### 💰 Orçamentos

Criação de orçamentos relacionados às ordens de serviço.

Exemplo:

```text
Peça:        R$ 850,00
Mão de obra: R$ 300,00
-----------------------
Total:     R$ 1.150,00
```

O sistema também permite gerar o orçamento em PDF.

### 💵 Financeiro

Controle financeiro da empresa:

* Receitas
* Despesas
* Contas a receber
* Contas pagas
* Resultado financeiro

### 🔐 Autenticação

Sistema de autenticação utilizando:

* JWT
* bcrypt
* Controle de acesso
* Sessão autenticada

---

## 🧰 Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Recharts

### Backend

* Node.js
* Express
* TypeScript
* JWT
* bcrypt
* REST API

### Banco de Dados

* PostgreSQL
* Prisma ORM

### Infraestrutura

* Docker
* Docker Compose

---

## 📁 Estrutura do Projeto

```text
serviceflow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/serviceflow.git
cd serviceflow
```

### 2. Iniciar o PostgreSQL

Com Docker:

```bash
docker compose up -d postgres
```

### 3. Configurar o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`.

Depois execute:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

Inicie o servidor:

```bash
npm run dev
```

### 4. Executar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

API:

```text
http://localhost:3333
```

---

## 🔑 Usuário de demonstração

```text
E-mail: admin@serviceflow.dev
Senha: 123456
```

---

## 🗄️ Principais entidades

O banco de dados possui entidades para:

```text
User
Cliente
Equipamento
Ordem de Serviço
Orçamento
Item de Orçamento
Transação Financeira
```

Os relacionamentos permitem manter todo o histórico do atendimento de cada cliente e equipamento.

---

## 🔄 Fluxo do sistema

```text
Cliente
   ↓
Equipamento
   ↓
Ordem de Serviço
   ↓
Diagnóstico
   ↓
Orçamento
   ↓
Aprovação
   ↓
Manutenção
   ↓
Entrega
   ↓
Financeiro
   ↓
Dashboard
```

---

## 🎯 Objetivo do projeto

O ServiceFlow foi desenvolvido para demonstrar a construção de uma aplicação **Full Stack real**, utilizando arquitetura separada entre frontend e backend, banco de dados relacional, autenticação, API REST e dashboard administrativo.

O projeto também foi pensado para representar um sistema que poderia ser adaptado para diferentes tipos de negócios, como:

* Assistências técnicas
* Oficinas
* Empresas de manutenção
* Prestadores de serviços
* Empresas de suporte técnico

---

## 🚧 Próximas melhorias

* [ ] Sistema de notificações
* [ ] Envio de orçamento por WhatsApp/e-mail
* [ ] Agendamento de serviços
* [ ] Relatórios avançados
* [ ] Controle de estoque
* [ ] Controle de técnicos
* [ ] Histórico detalhado de alterações
* [ ] Permissões por perfil de usuário
* [ ] Deploy em produção

---

## 👨‍💻 Projeto para Portfólio

Este projeto demonstra conhecimentos em:

```text
Full Stack Development
REST API
React
TypeScript
Node.js
Express
PostgreSQL
Prisma
JWT
Docker
Git
Dashboard
CRUD
Autenticação
Modelagem de Banco de Dados
```

---

## 📄 Licença

Projeto desenvolvido para fins de estudo, portfólio e demonstração de desenvolvimento Full Stack.
