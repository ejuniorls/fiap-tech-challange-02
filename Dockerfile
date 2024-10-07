# Usar uma imagem oficial do Node.js
FROM node:22-alpine

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o código para o diretório de trabalho
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
