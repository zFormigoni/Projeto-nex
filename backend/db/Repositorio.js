const Conexao = require('./conexao');

const mostrarResposta = (resposta) => {
    console.log('-----------------------------------');
    console.log(resposta);
    console.log('-----------------------------------');
};

const Repositorio = {
    //! verifica se as tabelas do banco e as da transacao sao as mesmas
    async iniciarConexao() {
        await Conexao.sync();
    },

    //? CREATE
    async CriarItem(item) {
        try {
            await Conexao.create(item);
            mostrarResposta('Item Criado');
        } catch (erro) {
            MostrarResposta('Erro ao criar item');
        }
    },

    //? READ
    async BuscarTodos() {
        try {
            const itens = await Conexao.findAll();

            //mostrarResposta(itens);
            return itens;
        } catch (erro) {
            mostrarResposta('Erro ao buscar todos os itens');
        }
    },

    //? busca por CPF
    async BuscarCPF(cpf) {
        try {
            const item = await Conexao.findByPk(cpf);
            //mostrarResposta(item);
            return item;
        } catch (erro) {
            mostrarResposta('Erro ao busca item por CPF');
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
            return itens;
        } catch (error) {
            mostrarResposta('Erro ao busca itens por status');
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
        }
    },
};

module.exports = Repositorio;
