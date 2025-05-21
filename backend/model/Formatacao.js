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
        return String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
    },

    converterDataExcel(numeroExcel) {
        const base = new Date(1900, 0, 1); // 1º de janeiro de 1900
        const dias = Number(numeroExcel) - 2; // Ajuste de correção: Excel conta 1900 como ano bissexto
        base.setDate(base.getDate() + dias);
        return base.toISOString().split('T')[0];
    },
};

module.exports = Formatacao;
