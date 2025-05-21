const sequelize = require('./db');
const Conexao = require('./conexao');

const mostrarResposta = (resposta) => {
    console.log('-----------------------------------');
    console.log(resposta);
    console.log('-----------------------------------');
};

const Repositorio = {
    //! verifica se as tabelas do banco e as da transacao sao as mesmas
    async iniciarConexao() {
        await Conexao.sync(); //!mudei de database para Conexao
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
            mostrarResposta(erro);
            mostrarResposta('Erro ao Deletar item');
        } finally {
            await sequelize.close();
        }
    },
};

module.exports = Repositorio;
