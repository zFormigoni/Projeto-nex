const Repositorio = require('./db/conexao');
const Transacao = require('./model/transacao');
const reader = require('xlsx');

const file = reader.readFile('./pasta1.xlsx');

const nomeDaAba = file.SheetNames[0];
const planilha = file.Sheets[nomeDaAba];

const dados = reader.utils.sheet_to_json(planilha);

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
    //console.log(transacao);
    //Repositorio.CriarItem(transacao);
    //Repositorio.Deletar(transacao.cpf);
}

//? inicia uma nova transacao
//const item = new Transacao('2000', 'item 4', '2025-05-20', 10.0, 1000.0, 1);

//Repositorio.iniciarConexao(); //! Necessario apenas uma vez para criar tabela se nao existir

//Repositorio.CriarItem(item);
//Repositorio.BuscarTodos();
//Repositorio.BuscarCPF('1234111111');
//Repositorio.BuscarStatus(1);
//Repositorio.Atualizar(item.cpf, item2); //! REVISAR
//Repositorio.Deletar(28);
