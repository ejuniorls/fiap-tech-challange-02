# 2FSDT - Tech Challenge Fase 02
FIAP Pós Tech - Full Stack Development: 

# Documentação da REST API de Sistema de Posts
Esta REST API é um sistema de gerenciamento de postagens para uma escola. Ela permite os usuários a criação, listagem, busca, atualização e remoção de posts e autores.

## Tecnologias Utilizadas
Na criação da API, foram utilizadas as tecnologias para backend Node.js e MongoDB. A aplicação foi conteinerizada com Docker e criado utomatização de pipeline com GitHub Actions.
1. Node.js
Node.js é uma plataforma de desenvolvimento que permite a criação de aplicações com  JavaScript no lado do servidor. Ele é amplamente utilizado para criar APIs REST, microsserviços e aplicações em tempo real. Possui alta performance, arquitetura assíncrona, ecossistema robusto e permite alta escalabilidade.
2. MongoDB
MongoDB é um banco de dados NoSQL que armazena dados em formato de documento (JSON-like), permitindo flexibilidade no armazenamento e consulta de informações. Possui escalabilidade horizontal, permite flexibilidade de dados, alta performance e integração nativa com JSON.
3. Docker
Docker é uma plataforma que permite o desenvolvimento, entrega e execução de aplicativos dentro de containers, que são pacotes isolados contendo todos os componentes necessários para executar uma aplicação. Permite criação e orquestração de containers específicos para os mais variados projetos e requisitos técnicos. 
4. GitHub Actions
GitHub Actions é uma ferramenta de CI/CD (Continuous Integration/Continuous Delivery) que automatiza fluxos de trabalho diretamente no repositório do GitHub. Permite automatização de testes, builds e deploy.
 
## Dependências
- body-parser: Middleware que permite extrair o corpo de uma requisição HTTP. Suporta JSON e dados codificados em URL
- chalk: Biblioteca que facilita a criação de saídas no terminal. Útil para destacar informações em logs através de formatação e cores.
- cookie-parser: Middleware que faz o parsing dos cookies enviados nas requisições HTTP.
- debug: Ferramenta para fazer logs de depuração. Permite controlar quais logs são exibidos com base em namespaces.
- dotenv: Carrega variáveis de ambiente de um arquivo .env para o ambiente Node.js. Ideal para gerenciar configurações de maneira segura e eficiente.
- express: Framework web para Node.js. Usado para construir aplicações web e APIs.
- mongoose: Biblioteca para modelagem de dados com MongoDB e Node.js. Facilita a interação com o banco de dados, permitindo a definição de esquemas, validações, entre outras funcionalidades.
- morgan: Middleware que registra logs de requisições HTTP. Comumente usado para monitoramento e depuração de aplicações Express.
- nodemon: Ferramenta de desenvolvimento que reinicia automaticamente o servidor Node.js quando há mudanças no código, tornando o processo de desenvolvimento mais eficiente.
- swagger-jsdoc: Gera automaticamente documentação Swagger para APIs a partir de comentários no código-fonte (usando JSDoc). Facilita a criação de documentações interativas para APIs.
- swagger-ui-express: Middleware que integra a interface gráfica do Swagger com o Express, permitindo acessar e testar a documentação da API diretamente no navegador.
- jest: Framework de testes em JavaScript desenvolvido pelo Facebook, amplamente usado para testar código escrito em Node.js e React. Oferece recursos como mocks, asserts e cobertura de código.
- supertest: Biblioteca para testar APIs HTTP em Node.js. Ela permite fazer requisições e validar respostas de endpoints de maneira simples, integrando-se facilmente com frameworks de teste como Jest.

## Endpoints da API

### Autores
#### Listar Autores
- Método: `GET`
- URL: `/api/autores`
- Descrição: Retorna uma lista com todos os autores cadastrados.
- Resposta de sucesso:
```
[
    {
        "_id": "670eebfe1a94aded57a24015",
        "name": "Autor 01",
        "email": "autor_01@mail.com",
        "__v": 0
    }    
]
```
- Código de status: 200 OK

#### Buscar Autor por ID
- Método: `GET`
- URL: `/api/autores/:id`
- Descrição: Retorna os dados de um autor específico pelo seu ID.
- Resposta de sucesso:
```
{
    "_id": "670eebfe1a94aded57a24015",
    "name": "Autor 01",
    "email": "autor_01@mail.com",
    "__v": 0
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso o autor não exista)
```
{
    "message": "Autor não encontrado"
}
 ```

#### Buscar Autor por Palavra
- Método: `GET`
- URL: `/api/autores/busca/:palavra`
- Descrição: Retorna os dados de um autor específico pelo seu ID.
- Resposta de sucesso:
```
[
    {
        "_id": "670eebfe1a94aded57a24015",
        "name": "Autor 01",
        "email": "autor_01@mail.com",
        "__v": 0
    }
]
```
- Código de status: 200 OK

#### Criar Autor
- Método: `POST`
- URL: `/api/autores`
- Descrição: Cria um novo autor.
- Body de exemplo:
```
{
  "name": "Autor 02",
  "email": "autor_02@mail.com"
}
```
- Resposta de sucesso:
```
{
    "name": "Autor 02",
    "email": "autor_02@mail.com",
    "_id": "670eec041a94aded57a24017",
    "__v": 0
}
```
- Código de status: 201 Created

#### Atualizar Autor
- Método: `PUT`
- URL: `/api/autores/:id`
- Descrição: Atualiza os dados de um autor existente.
- Body de exemplo:
```
{
  "name": "Autor Atualizado",
  "email": "autor_atualizado@mail.com"
}
```
- Resposta de sucesso:
```
{
    "_id": "670eec041a94aded57a24017",
    "name": "Autor Atualizado",
    "email": "autor_atualizado@mail.com"
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso o autor não exista)
```
{
    "message": "Autor não encontrado"
}
```

#### Remover Autor
- Método: `DELETE`
- URL: `/api/autores/:id`
- Descrição: Remove um autor pelo ID.
- Resposta de sucesso:
```
{
    "message": "Autor deletado com sucesso"
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso o autor não exista)
```
{
    "message": "Autor não encontrado"
}
```

### Posts


#### Listar Postagens
- Método: `GET`
- URL: `/api/posts`
- Descrição: Retorna uma lista com todas as postagens.
- Resposta de sucesso:
```
[
    {
        "_id": "670efd301a94aded57a24026",
        "title": "Artigo 01",
        "content": "Loren ipsum",
        "author": {
            "_id": "670eebfe1a94aded57a24015",
            "name": "Autor 01",
            "email": "autor_01@mail.com",
            "__v": 0
        },
        "__v": 0
    },
    {
        "_id": "670efd621a94aded57a24028",
        "title": "Artigo 02",
        "content": "Loren ipsum",
        "author": {
            "_id": "670eebfe1a94aded57a24015",
            "name": "Autor 01",
            "email": "autor_01@mail.com",
            "__v": 0
        },
        "__v": 0
    }
]
```
- Código de status: 200 OK
 
#### Buscar Post por ID
- Método: `GET`
- URL: `/api/posts/:id`
- Descrição: Retorna uma postagem específica pelo seu ID.
- Resposta de sucesso:
```
{
    "_id": "670efd621a94aded57a24028",
    "title": "Artigo 02",
    "content": "Loren ipsum",
    "author": {
        "_id": "670eebfe1a94aded57a24015",
        "name": "Autor 01",
        "email": "autor_01@mail.com"
    }
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso a postagem não exista)
```
{
    "message": "Post não encontrado"
}
```

#### Buscar Posts por Palavra
- Método: `GET`
- URL:` /api/posts/busca/:palavra`
- Descrição: Busca postagens que contenham a palavra especificada no título ou conteúdo.
- Resposta de sucesso:
```
[
    {
        "_id": "670efd301a94aded57a24026",
        "title": "Artigo 01",
        "content": "Loren ipsum",
        "author": "670eebfe1a94aded57a24015"
    }
]
```
- Código de status: 200 OK

#### Criar Post
- Método: `POST`
- URL: `/api/posts`
- Descrição: Cria uma nova postagem.
- Body de exemplo:
```
{
  "title": "Artigo 01",
  "content": "Loren ipsum",
  "author": "670eebfe1a94aded57a24015"
}
```
- Resposta de sucesso:
```
{
    "title": "Artigo 01",
    "content": "Loren ipsum",
    "author": "670eebfe1a94aded57a24015",
    "_id": "670efd301a94aded57a24026"
}
```
- Código de status: 201 Created
 
#### Atualizar Post
- Método: `PUT`
- URL: `/api/posts/:id`
- Descrição: Atualiza os dados de uma postagem existente.
- Body de exemplo:
```
{
  "title": "Titulo Atualizado",
  "content": "Conteúdo atualizado"
}
```
- Resposta de sucesso:
```
{
    "_id": "670efd621a94aded57a24028",
    "title": "Titulo Atualizado",
    "content": "Conteúdo atualizado",
    "author": "670eebfe1a94aded57a24015",
    "__v": 0
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso a postagem não exista)
```
{
    "message": "Post não encontrado"
}
```
 
#### Remover Post
- Método: `DELETE`
- URL: `/api/posts/:id`
- Descrição: Remove uma postagem pelo ID.
- Resposta de sucesso:
```
{
    "message": "Post deletado com sucesso"
}
```
- Código de status: 200 OK
- Erros: 404 Not Found (caso a postagem não exista)
```
{
    "message": "Post não encontrado"
}
```
 
## Configuração e Utilização da API

1. Clonar repositório
```
https://github.com/ejuniorls/fiap-tech-challange-02
```

2. Navegue até o diretório do projeto.

```
cd fiap-tech-challange
```

3. Crie os arquivos abaixo baseados pelo arquivo `.env` e preencha os campos:
    -  .env.production
    -  .env.development
    -  .env.test

4. Executar o comando 
```
docker-compose --env-file .env.production build && docker-compose --env-file .env.production up -d
```