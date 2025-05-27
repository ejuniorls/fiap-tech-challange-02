require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Centralizador de rotas
const routes = require("./routes");
app.use("/api", routes); // Todas as rotas começam com /api

const port = process.env.PORT;
console.log(`servidor rodando na porta ${port}`);

module.exports = app;
