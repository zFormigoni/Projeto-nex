const Sequelize = require('sequelize');
const database = require('./db');

const ConexaoUsuario = database.define(
    'Usuario',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cpf: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2]], //! 1 == ADM -- 2 == Normal
                    msg: 'Status deve ser 1, 2',
                },
            },
        },
    },
    {
        tableName: 'usuarios', // Nome da tabela no banco
    }
);

module.exports = ConexaoUsuario;
