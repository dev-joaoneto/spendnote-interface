💸 SpendNote Interface
<p align="center"> Interface moderna de gestão financeira pessoal com foco em performance, segurança e experiência do usuário. </p> <p align="center"> <img src="https://img.shields.io/badge/React-18-blue?logo=react" /> <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" /> <img src="https://img.shields.io/badge/Vite-Fast-purple?logo=vite" /> <img src="https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase" /> <img src="https://img.shields.io/badge/Status-Production--Ready-green" /> </p>
🚀 Sobre o Projeto

O SpendNote Interface é uma aplicação frontend moderna desenvolvida para oferecer uma experiência fluida e eficiente no gerenciamento de finanças pessoais.

A aplicação permite que usuários controlem despesas, registrem receitas e visualizem dados financeiros em tempo real, com autenticação segura baseada no Firebase.

Este projeto foi desenvolvido com forte foco em:

⚡ Performance (Vite + renderização otimizada)  
🔐 Segurança (Firebase Authentication + tokens)  
🧱 Arquitetura escalável  
🎯 Código limpo e de fácil manutenção 

🔐 Autenticação (Firebase)

A autenticação é realizada via Firebase Authentication, garantindo um sistema seguro e escalável.

🔑 Fluxo
- Usuário realiza login via Firebase
- Firebase retorna um ID Token (JWT)
- O frontend envia o token nas requisições
- O backend valida com Firebase Admin SDK

⚙️ Funcionalidades
- 🔐 Autenticação segura com Firebase
- 💰 Cadastro de receitas e despesas
- 📊 Dashboard financeiro
- 📅 Filtro por mês e ano
- 📈 Resumo financeiro em tempo real
- 🔄 Atualização dinâmica de dados
- 📱 Interface totalmente responsiva

🛠️ Tecnologias Utilizadas
Frontend:
- React.js
- TypeScript
- Vite
Roteamento
- React Router
Estado
- Context API + Hooks
Comunicação com API
- Fetch / Axios
Autenticação
- Firebase Authentication
