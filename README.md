# ☑️ Projeto TaskBoard
É uma aplicação web em estilo Kanban com o objetivo de organizar e gerenciar tarefas, desenvolvida principalmente por meio do Java Spring e Reactjs.

Seu principal objetivo é ser uma ferramenta de produtividade ao usuário, permitindo o gerenciamento de atividades com acompanhamento de prazos. 

## 📸 Demonstração
<img width="1345" height="648" alt="image" src="https://github.com/user-attachments/assets/4feca5fd-c0bb-4974-a241-9628ed69b5ff" />

## 💡 Funcionalidades

* **Organização Visual:** Interface baseada no método Kanban para acompanhamento de status.
* **Gestão de Tarefas:** Criação, leitura, edição e exclusão de tarefas.
* **Gestão de Grupos:** Criação, leitura, edição e exclusão de grupos.
* **Notificação:** Aviso em caso de atraso em tarefas
* **Pesquisa de Tarefas:** Barra de pesquisa que lista atividades correspondentes
* **Interatividade:** Suporte a *Drag and Drop* (arrastar e soltar) para mover tarefas entre colunas de forma fluida.
* **Ambiente Isolado:** API e banco de dados utilizando containers Docker.

## 🛠️ Tecnologias Utilizadas

### Back-end:
* Java 21
* Maven Wrapper 3.3.4

**Principais Dependências:**
* Spring Boot (Web, Data JPA)
* Lombok
* PostgreSQL

### Front-end:
* ReactJS
* Node.js
  
**Principais Dependências:** 
* Axios
* react-icons
* @dnd-kit
* zustand

## Infraestrutura:
* Docker e Docker Compose
  
## 📂 Estrutura de pastas
```
desafio-taskboard/      
├── README.md 🠖 Documentação  
│          
├── backend/ 🠖 Api + Docker
│   ├── Dockerfile
│   ├── docker-compose.yml           
│   ├── pom.xml
│   ├── .env                 
│   ├── .env.example
│   └── src/ 
│                
└── frontend/ 🠖 Aplicação em React
    ├── package.json
    └── src/                
```

## ⚙️ Instalação e Configuração 
### Requerimentos
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org)  20.19+
* [Docker](https://www.docker.com) com Docker Compose
### 1. Clonar repositório
```
git clone https://github.com/PattLD/desafio-taskboard.git
cd desafio-taskboard
```
### 2. Configurar Variáveis de Ambiente
Na raiz da pasta *backend*, crie uma cópia do arquivo de exemplo para as suas configurações locais:

```
cd backend
cp .env.example .env
```

### 3. Iniciar API
Na pasta backend, inicie Docker Compose com esse comando
```
cd backend
docker compose up -d --build
```
### 4. Iniciar Aplicação
Abra um novo terminal para rodar a interface
```
cd frontend
npm run dev
```

## ✒️ Autoria
Desenvolvido por Patricia Lindoso Duarte (@PattLD).
