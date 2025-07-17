# 💬 Ouvidoria Digital - Frontend

Este é o front-end do sistema **Ouvidoria Digital**, desenvolvido com **React + TypeScript**. A aplicação permite que usuários se autentiquem, registrem reclamações e consultem seus relatos de forma simples, moderna e responsiva.

## ⚙️ Tecnologias utilizadas

- **React**
- **TypeScript**
- **Vite**
- **MUI (Material UI)**
- **React Router DOM**
- **Axios**
- **React Toastify**
- **JWT (armazenamento e controle de sessão)**
- **Vite Proxy (para ambiente local com backend)**

## 🖼️ Funcionalidades

- [x] Tela de login integrada com userInfo + JWT
- [x] Tela de cadastro de reclamação
- [x] Listagem das reclamações feitas pelo usuário
- [x] Navegação com rotas protegidas


## 🔧 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (v18+)
- Backend rodando localmente (ex: http://localhost:8080)

### Passos

```bash
# Clone o repositório
git clone https://github.com/mclairex/ouvidoria_digital-frontend.git
cd ouvidoria_digital-frontend

# Instale as dependências
npm install

# Rode o projeto
npm run dev
