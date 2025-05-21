const Repositorio = require('./db/Repositorio');
const Transacao = require('./model/transacao');
const Excel = require('./model/excel');
const express = require('express');
const cors = require('cors');
const db = require('./db/db'); // Conexão com o banco de dados
const transacoesRoute = require('./routes/transacoes'); // Rota para transações

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

function cadastrarDados(dados, opc) {
    for (let i = 0; i < dados.length; i++) {
        const transacao = new Transacao(
            limparCPF(dados[i]['CPF']),
            dados[i]['Descrição da transação'],
            converterDataExcel(dados[i]['Data da transação']),
            dados[i]['Valor em pontos'],
            dados[i]['Valor'],
            converterStatus(dados[i]['Status'])
        );
        opc == 1
            ? Repositorio.CriarItem(transacao)
            : Repositorio.Deletar(transacao.cpf);
    }
}

//cadastrarDados(dados, 1);

// Criação do servidor Express
const app = express();
app.use(cors()); // Habilita CORS para permitir que o frontend acesse a API
app.use(express.json()); // Habilita o express a entender JSON

// Configuração das rotas
app.use('/', transacoesRoute);

// Conectar ao banco de dados e iniciar o servidor
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
        app.listen(3001, () => {
            console.log('Servidor backend rodando em http://localhost:3001');
        });
    })
    .catch((err) => {
        console.error('Erro na conexão com o banco de dados:', err);
    });
