const Formatacao = require('./model/Formatacao');
const Excel = require('./model/excel');
const express = require('express');
const cors = require('cors');
const db = require('./db/db'); //? Conexão com o banco de dados
const transacoesRoute = require('./routes/rotasDeTransacoes'); //? Rota para transações

//? pega os dados da planilha
//const dados = Excel.retornarDados('./pasta1.xlsx', 0);
//? cadastra os dados no banco de dados
//Formatacao.cadastrarDados(dados, 1);

//! Criação do servidor Express

const app = express();
const porta = 3001;
app.use(cors()); // Habilita CORS para permitir que o frontend acesse a API
app.use(express.json());

// Configuração das rotas
app.use('/', transacoesRoute);

// Conectar ao banco de dados e iniciar o servidor
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
        app.listen(porta, () => {
            console.log(
                `Servidor backend rodando em http://localhost:${porta}/todos`
            );
        });
    })
    .catch((err) => {
        console.error('Erro na conexão com o banco de dados:', err);
    });
