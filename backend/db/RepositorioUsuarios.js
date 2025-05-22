//? Chamo o repositorio sempre que quero acessar o banco de dados Usuario

const ConexaoUsuario = require('./conexaoUsuario');

const mostrarResposta = (resposta) => {
    console.log('-----------------------------------');
    console.log(resposta);
    console.log('-----------------------------------');
};

const RepositorioUsuarios = {
    //! verifica se existe ou cria a tabela no banco de dados
    async iniciarConexao() {
        await ConexaoUsuario.sync();
    },

    //! CREATE
    async CriarItem(item) {
        try {
            await ConexaoUsuario.create(item);
            mostrarResposta('Item Criado');
        } catch (erro) {
            MostrarResposta('Erro ao criar item');
        }
    },

    async BuscarTodos() {
        try {
            const itens = await ConexaoUsuario.findAll();

            //mostrarResposta(itens);
            return itens;
        } catch (erro) {
            mostrarResposta('Erro ao buscar todos os itens');
        }
    },

    async BuscarCPF(cpf) {
        try {
            const item = await ConexaoUsuario.findOne({
                where: { cpf: cpf },
            });
            //mostrarResposta(item);
            return item;
        } catch (erro) {
            mostrarResposta('Erro ao busca item por CPF');
        }
    },
};

module.exports = RepositorioUsuarios;
