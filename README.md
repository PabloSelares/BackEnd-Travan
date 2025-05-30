# 🔒 API Node.js + MongoDB: Autenticação Segura com JWT e Bcrypt

Uma API RESTful com autenticação e documentação em Swagger, de um aplicativo de caronas e viagens focado em vans, carros grandes e utilitários. **Projeto de cunho acadêmico avaliativo para apronfundar fundamentos de back-end, segurança e integração com banco de dados!**<br>
Todo o passo a passo de criação e desenvolvimento desse projeto se encontra nessa documentação**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## ✍🏻 Autores

<a><img src="https://github.com/user-attachments/assets/fa60aba8-3200-402d-8b9e-a004ed3de6cf" width="200px"></a><br>
Olá, Sou **Gabryell Leal** <br>

<a><img src="https://avatars.githubusercontent.com/u/134446830?v=4" width="200px"></a><br>
Olá, Sou **Pablo Selares** <br>

<a><img src="https://avatars.githubusercontent.com/u/186224768?v=4" width="200px"></a><br>
Olá, Sou **Luis Eduardo Sena**<br>

<a><img src="https://avatars.githubusercontent.com/u/132765451?v=4" width="200px"></a><br>
Olá, Sou **Talles Oliveira**<br>

<a><img src="https://avatars.githubusercontent.com/u/140225853?v=4" width="200px"></a><br>
Olá, Sou **Francinaldo Batista** <br>

## ✨ Funcionalidades
- **Cadastro e autenticação de alunos, professores, perfis, turmas, disciplinas e tarefas** 
- **Apenas professores autenticados pode operar turmas, disciplinas e tarefas** (JWT)
- **Criptografia de senhas** com Bcrypt
- **Documentação e testes de rotas com SwaggerUI**
- CRUD de recursos protegidos por token
- Configuração segura usando variáveis de ambiente (Dotenv)
- Integração profissional com MongoDB (Mongoose)

## 🛠️ Tecnologias
| Biblioteca      | Finalidade                          |
|-----------------|-------------------------------------|
| Express         | Servidor web e rotas                |
| Mongoose        | Conexão e modelos do MongoDB        |
| Nodemon         | Reinicialização automática (dev)    |
| Dotenv          | Gerenciamento de variáveis de ambiente |
| Bcrypt          | Criptografia de senhas              |
| JSON Web Token  | Autenticação stateless              |
| SwaggerUi          | Docmentação e teste de rotas |

## 🚀 Começando

### Pré-requisitos
- Node.js (v18+)
- MongoDB (local ou Atlas)
- Postman/Insomnia (para testar endpoints)
- Conexão estável com a internet

### Instalação
```bash
# Clone o repositório
git clone https://github.com/PabloSelares/BackEnd-Travan.git

# Instale as dependências
npm install

# Crie o arquivo .env (veja o exemplo abaixo)
cp .env.example .env
```

### Configuração do Ambiente (.env)
```env
PORT=3000
ROUNDS=(numero entre 10 e 13)
SECRET=suasecret
```

### Executando a API
```bash
# Modo desenvolvimento (com Nodemon)
npm run dev
Acesse: localhost:3000/api-docs
```

## 🔐 Boas Práticas de Segurança
- **Senhas nunca armazenadas em texto puro** (hash com Bcrypt)
- Tokens JWT com expiração e assinatura criptografada
- Variáveis sensíveis isoladas em `.env`

## 🤝 Como Contribuir
Deixa uma estrela no repositório! Depois disso:
1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

**Feito por _[Gabryell Leal Rocha], [Pablo Selares], [Talles Oliveira], [Luis Eduardo Sena], [Francinaldo Batista]_** 
