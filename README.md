# 2FSDT - Tech Challenge Fase 02
FIAP Pós Tech - Full Stack Development: 

### API de Posts
Esta é uma API REST para gerenciar um sistema de posts. 

A aplicação está conteinerizada usando Docker para facilitar o setup e execução.

#### Tecnologias
- Node.js
- Express
- MongoDB para persistência de dados
- Docker para conteinerização
- Docker Compose para orquestração dos contêineres

### Funcionalidades da API
A API permite as seguintes operações:

#### Autores
Método | Endpoint | Função
------- | ---- | -------------
`GET` | `/authors` | Retorna todos os autores.
`GET` | `/authors/:id` | Retorna um autor específico pelo ID.
`GET` | `/authors/search/:word` | Retorna autores por termo buscado.
`POST` | `/authors` | Cria um novo autor.
`PUT` | `/authors/:id` | Atualiza um autor pelo ID.
`DELETE` | `/authors/:id` | Deleta um autor pelo ID

#### Posts
Método | Endpoint | Função
------- | ---- | -------------
`GET` | `/posts` | Retorna todos os posts.
`GET` | `/posts/:id` | Retorna um post específico pelo ID.
`GET` | `/posts/search/:word` | Retorna posts por termo buscado.
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
2. Crie um arquivo `.env.production` a partir do modelo `.env` na raiz do projeto para configurar variáveis de ambiente:

3. Inicie os contêineres:
```
docker-compose --env-file .env.production build && docker-compose --env-file .env.production up -d
```
Para pausar o container:
```
docker down <meu_container>
```

4. Acessar a API:

API estará rodando no endereço `http://localhost:3000`.

### Como executar o teste da aplicação

```
docker exec -it <meu_container> /bin/sh
# npm test
```