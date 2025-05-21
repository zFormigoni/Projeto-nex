const Repositorio = require('./db/Repositorio');
const Formatacao = require('./model/Formatacao');
const Transacao = require('./model/transacao');
const Excel = require('./model/excel');
const express = require('express');
const cors = require('cors');
const db = require('./db/db'); // Conexão com o banco de dados
const transacoesRoute = require('./routes/rotasDeTransacoes'); // Rota para transações

const dados = Excel.retornarDados('./pasta1.xlsx', 0);

function cadastrarDados(dados, opc) {
    for (let i = 0; i < dados.length; i++) {
        const transacao = new Transacao(
            Formatacao.limparCPF(dados[i]['CPF']),
            dados[i]['Descrição da transação'],
            Formatacao.converterDataExcel(dados[i]['Data da transação']),
            dados[i]['Valor em pontos'],
            dados[i]['Valor'],
            Formatacao.converterStatus(dados[i]['Status'])
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
app.use(express.json());

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
