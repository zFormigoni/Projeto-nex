//? Modelo do item para facilicar o cadastro no banco

class Transacao {
    constructor(cpf, descricao, dataTransacao, pontos, valorMonetario, status) {
        this.cpf = cpf;
        this.descricao = descricao;
        this.data_transacao = dataTransacao;
        this.pontos = pontos;
        this.valor_monetario = valorMonetario;
        this.status = status;
    }
}

module.exports = Transacao;
