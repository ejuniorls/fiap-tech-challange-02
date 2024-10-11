const dotenv = require('dotenv');
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db');
const routes = require('./routes'); // Importando as rotas centralizadas

var app = express();

// Conectar ao banco de dados
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas centralizadas
app.use(routes);

module.exports = app;
