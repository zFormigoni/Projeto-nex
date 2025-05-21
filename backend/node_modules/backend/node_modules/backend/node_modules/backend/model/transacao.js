class Transacao {
    constructor(cpf, descricao, dataTransacao, pontos, valorMonetario, status) {
        this.cpf = cpf;
        this.descricao = descricao;
        this.dataTransacao = dataTransacao; //! 2025-05-20 modelo de data
        this.pontos = pontos;
        this.valorMonetario = valorMonetario;
        this.status = status;
    }

    list() {
        return {
            cpf: this.cpf,
            descricao: this.descricao,
            data_transacao: this.dataTransacao,
            pontos: this.pontos,
            valor_monetario: this.valorMonetario,
            status: this.status,
        };
    }
}

module.exports = Transacao;
