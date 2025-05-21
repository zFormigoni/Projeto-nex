const Sequelize = require('sequelize');
const database = require('./db');

const Conexao = database.define(
    'transacao',
    {
        cpf: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        data_transacao: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        pontos: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        valor_monetario: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2, 3]], //! 1 == aprovado -- 2 == em avaliacao -- 3 == em analise
                    msg: 'Status deve ser 1, 2 ou 3',
                },
            },
        },
    },
    {
        tableName: 'transacoes', // Nome da tabela no banco
    }
);

module.exports = Conexao;
