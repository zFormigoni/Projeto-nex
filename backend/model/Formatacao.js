const Repositorio = require('../db/Repositorio');
const Transacao = require('./transacao');

const Formatacao = {
    converterStatus(status) {
        status == 'Aprovado'
            ? (status = 1)
            : status == 'Reprovado'
            ? (status = 2)
            : (status = 3);

        return status || 0;
    },

    limparCPF(cpf) {
        const numeros = String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
        return parseInt(numeros, 10);
    },

    cadastrarDados(dados, opc) {
        for (let i = 0; i < dados.length; i++) {
            const transacao = new Transacao(
                this.limparCPF(dados[i]['CPF']),
                dados[i]['Descrição da transação'],
                dados[i]['Data da transação'],
                dados[i]['Valor em pontos'],
                dados[i]['Valor'],
                this.converterStatus(dados[i]['Status'])
            );
            opc == 1
                ? Repositorio.CriarItem(transacao)
                : Repositorio.Deletar(transacao.cpf);
        }
    },
};

module.exports = Formatacao;
