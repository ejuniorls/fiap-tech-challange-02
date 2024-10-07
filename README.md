# 2FSDT - Tech Challenge Fase 02
FIAP Pós Tech - Full Stack Development: 

### API de Posts
Esta é uma API REST simples para gerenciar posts. A aplicação está conteinerizada usando Docker para facilitar o setup e execução.

#### Tecnologias
- Node.js (ou outra linguagem/plataforma que você preferir)
- Express (para rotas da API)
- MongoDB (ou outro banco de dados)
- Docker (para conteinerização)
- Docker Compose (para orquestração dos contêineres)

### Funcionalidades da API
A API permite as seguintes operações:

#### Autores
Método | Endpoint | Função
------- | ---- | -------------
`GET` | `/authors` | Retorna todos os autpres.
`GET` | `/authors/:id` | Retorna um autor específico pelo ID.
`GET` | `/authors/search` | Retorna authores por termo buscado.
`POST` | `/authors` | Cria um novo autor.
`PUT` | `/authors/:id` | Atualiza um autor pelo ID.
`DELETE` | `/authors/:id` | Deleta um autor pelo ID

#### Posts
Método | Endpoint | Função
------- | ---- | -------------
`GET` | `/posts` | Retorna todos os posts.
`GET` | `/posts/:id` | Retorna um post específico pelo ID.
`GET` | `/posts/search` | Retorna posts por termo buscado.
`POST` | `/posts` | Cria um novo post.
`PUT` | `/posts/:id` | Atualiza um post pelo ID.
`DELETE` | `/posts/:id` | Deleta um post pelo ID

### Requisitos
- Docker e Docker Compose instalados na máquina.

### Como executar a aplicação
Siga os passos abaixo para rodar a aplicação usando Docker.
1. Clone este repositório: 
```
git clone https://github.com/ejuniorls/fiap-tech-challange-02
cd fiap-tech-challange-02
```
2. Crie um arquivo `.env` na raiz do projeto para configurar variáveis de ambiente:
```
MONGODB_URI=mongodb+srv://<mongodb_user>:<db_password>@cluster0.p78lc.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```
3. Inicie os contêineres:
```
docker build -t app .
docker run -dp 3000:3000 app
docker run -it app sh # para acessar o diretório dentro do contêiner
```
4. Acessar a API:

API estará rodando no endereço http://localhost:3000.

***

### Requisitos técnicos

- [x] Back-end em Node.js:
    - Implementação do servidor usando Node.js.
    - Utilização de frameworks como Express para roteamento e middleware.
- [x] Persistência de dados:
    - Utilização de um sistema de banco de dados (por exemplo, MongoDB, PostgreSQL).
    - Implementação de modelos de dados adequados para as postagens.
- [x] Containerização com Docker:
    - Desenvolvimento e implantação usando contêineres Docker para garantir consistência entre ambientes de desenvolvimento e produção.
- [ ] Automação com GitHub Actions:
    - Configuração de workflows de CI/CD para automação de testes e deploy.
- [x] Documentação:
    - Documentação técnica detalhada do projeto, incluindo setup inicial, arquitetura da aplicação e guia de uso das APIs.
- [ ] Cobertura de testes:
    - O projeto deve garantir que pelo menos 20% do código seja coberto por testes unitários. Essa medida é essencial para assegurar a qualidade e a estabilidade do código, especialmente em funções críticas como criação, edição e exclusão de postagens.