const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_nex', 'root', '9411', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    logging: false,
    //logging: console.log, //? mostra o comando sql no console
});

module.exports = sequelize;
