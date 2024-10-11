const mongoose = require('mongoose');
const chalk = require('chalk');

const {
    DB_DATABASE,
    DB_HOSTNAME,
    DB_PORT,
    ENV
} = process.env;

console.log(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`, {})
            .then(result => {
                console.log(chalk.white.bgGreen(`Conectado ao banco MongoDB: ${DB_HOSTNAME}`));
                console.log(chalk.white.bgGreen(`Ambiente: ${ENV}`));
            })
            .catch(error => {
                console.log(`MongoDB Fail!!! ${error.message}`);
            });

    } catch (err) {
        console.log(chalk.white.bgRed(`Erro: ${err.message}`));

        // Encerra caso de algum erro
        process.exit(1);
    }
};

module.exports = connectDB;
