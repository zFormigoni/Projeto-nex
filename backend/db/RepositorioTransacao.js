//? Chamo o repositorio sempre que quero acessar o banco de dados Transacao

const ConexaoTransacao = require('./conexaoTransacao');

const mostrarResposta = (resposta) => {
    console.log('-----------------------------------');
    console.log(resposta);
    console.log('-----------------------------------');
};

const RepositorioTransacao = {
    //? verifica se existe ou cria a tabela no banco de dados
    async iniciarConexao() {
        await ConexaoTransacao.sync();
    },

    //! CREATE
    async CriarItem(item) {
        try {
            await ConexaoTransacao.create(item);
            mostrarResposta('Item Criado');
        } catch (erro) {
            MostrarResposta('Erro ao criar item');
        }
    },

    //! READ
    async BuscarTodos() {
        try {
            const itens = await ConexaoTransacao.findAll();

            //mostrarResposta(itens);
            return itens;
        } catch (erro) {
            mostrarResposta('Erro ao buscar todos os itens');
        }
    },

    //! busca por CPF
    async BuscarCPF(cpf) {
        try {
            const item = await ConexaoTransacao.findAll({
                where: { cpf: cpf },
            });
            //mostrarResposta(item);
            return item;
        } catch (erro) {
            mostrarResposta('Erro ao busca item por CPF');
        }
    },

    //! busca por STATUS
    async BuscarStatus(status) {
        try {
            const itens = await ConexaoTransacao.findAll({
                where: {
                    status: status,
                },
            });
            return itens;
        } catch (error) {
            mostrarResposta('Erro ao busca itens por status');
        }
    },

    //! UPDATE
    async Atualizar(cpf, item) {
        try {
            const resultado = await ConexaoTransacao.update(item, {
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

    //! DELETE por CPF
    async Deletar(cpf) {
        try {
            const existente = await ConexaoTransacao.findOne({
                where: { cpf: cpf },
            });

            if (!existente) {
                mostrarResposta('Item não existe');
                return;
            }

            await ConexaoTransacao.destroy({
                where: {
                    cpf: cpf,
                },
            });
            mostrarResposta('Item deletado');
        } catch (erro) {
            mostrarResposta(erro);
            mostrarResposta('Erro ao Deletar item');
        }
    },
};

module.exports = RepositorioTransacao;
