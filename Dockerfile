# Node.js do Docker Hub
FROM node:alpine

# Mantenedor
LABEL org.opencontainers.image.authors="Edmir Lôbo ejuniorls@outlook.com>"

# Define o diretório dentro do container
WORKDIR /usr/src/app/

# Copia os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia a aplicação para o container
COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "start"]