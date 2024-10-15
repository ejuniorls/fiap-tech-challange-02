FROM node:alpine

LABEL maintainer "William Tenório da Silva <contato@williamtenorio.com.br>"

WORKDIR /usr/src/app/

COPY package*.json ./

# RUN systemctl start mongod

RUN npm install

COPY . .

CMD ["npm", "start"]