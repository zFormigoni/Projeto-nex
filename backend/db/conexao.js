const Sequelize = require('sequelize');
const database = require('./db');
const sequelize = require('./db');

const Conexao = database.define(
    'transacao',
    {
        cpf: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
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

const mostrarResposta = (resposta) => {
    console.log('-----------------------------------');
    console.log(resposta);
    console.log('-----------------------------------');
};

const Repositorio = {
    //! verifica se as tabelas do banco e as da transacao sao as mesmas
    async iniciarConexao() {
        await database.sync();
    },

    //? CREATE
    async CriarItem(item) {
        try {
            const existente = await Conexao.findOne({
                where: { cpf: item.cpf },
            });

            if (existente) {
                mostrarResposta('Item já existe');
                return;
            }

            await Conexao.create(item.list());

            mostrarResposta('Item Criado');
        } catch (erro) {
            mostrarResposta('Erro ao criar item');
        } finally {
            await sequelize.close();
        }
    },

    //? READ
    async BuscarTodos() {
        try {
            const itens = await Conexao.findAll();

            mostrarResposta(itens);
            return itens;
        } catch (erro) {
            mostrarResposta('Erro ao buscar todos os itens');
        } finally {
            await sequelize.close();
        }
    },

    //? busca por CPF
    async BuscarCPF(cpf) {
        try {
            const item = await Conexao.findByPk(cpf);
            mostrarResposta(item);
            return item;
        } catch (erro) {
            mostrarResposta('Erro ao busca item por CPF');
        } finally {
            await sequelize.close();
        }
    },

    //? busca por STATUS
    async BuscarStatus(status) {
        try {
            const itens = await Conexao.findAll({
                where: {
                    status: status,
                },
            });
            mostrarResposta(itens);
            return itens;
        } catch (error) {
            mostrarResposta('Erro ao busca itens por status');
        } finally {
            await sequelize.close();
        }
    },

    //? UPDATE
    async Atualizar(cpf, item) {
        try {
            const resultado = await Conexao.update(item, {
                where: { cpf: cpf },
            });

            if (resultado[0] === 0) {
                mostrarResposta('Nenhum item foi atualizado');
            } else {
                mostrarResposta('Item atualizado');
            }
        } catch (erro) {
            mostrarResposta('Erro ao atualizar item');
        } finally {
            await sequelize.close();
        }
    },

    //? DELETE por CPF
    async Deletar(cpf) {
        try {
            const existente = await Conexao.findOne({ where: { cpf: cpf } });

            if (!existente) {
                mostrarResposta('Item não existe');
                return;
            }

            await Conexao.destroy({
                where: {
                    cpf: cpf,
                },
            });
            mostrarResposta('Item deletado');
        } catch (erro) {
            mostrarResposta('Erro ao Deletar item');
        } finally {
            await sequelize.close();
        }
    },
};

module.exports = Conexao;
module.exports = Repositorio;
