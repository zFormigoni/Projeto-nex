const Repositorio = require('./db/Repositorio');
const Transacao = require('./model/transacao');
const Excel = require('./model/excel');

const dados = Excel.retornarDados('./pasta1.xlsx', 0);

function converterStatus(status) {
    status == 'Aprovado'
        ? (status = 1)
        : status == 'Reprovado'
        ? (status = 2)
        : (status = 3);

    return status || 0;
}

function limparCPF(cpf) {
    return String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
}

function converterDataExcel(numeroExcel) {
    const base = new Date(1900, 0, 1); // 1º de janeiro de 1900
    const dias = Number(numeroExcel) - 2; // Ajuste de correção: Excel conta 1900 como ano bissexto
    base.setDate(base.getDate() + dias);
    return base.toISOString().split('T')[0];
}

for (let i = 0; i < dados.length; i++) {
    const transacao = new Transacao(
        limparCPF(dados[i]['CPF']),
        dados[i]['Descrição da transação'],
        converterDataExcel(dados[i]['Data da transação']),
        dados[i]['Valor em pontos'],
        dados[i]['Valor'],
        converterStatus(dados[i]['Status'])
    );
    Repositorio.CriarItem(transacao);
    //Repositorio.Deletar(transacao.cpf);
    //console.log(transacao.cpf);
}
