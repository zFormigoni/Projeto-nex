const Formatacao = require('./model/Formatacao');
const Excel = require('./model/excel');
const express = require('express');
const cors = require('cors');
const db = require('./db/db'); //? Conexão com o banco de dados
const transacoesRoute = require('./routes/rotasDeTransacoes'); //? Rota para transações
const Repositorio = require('./db/Repositorio');

//? pega os dados da planilha
//const dados = Excel.retornarDados('./pasta1.xlsx', 0);
//Repositorio.iniciarConexao(); //? CRIA A TABELA SE NAO HOUVER
//Formatacao.cadastrarDados(dados, 1); //? cadastra os dados no banco de dados
//Formatacao.cadastrarDados(dados, 2); //? deleta os dados no banco de dados

//! Criação do servidor Express
const app = express();
const porta = 3001;
app.use(cors()); //? Habilita CORS para permitir que o frontend acesse a API
app.use(express.json());
app.use('/', transacoesRoute); //? Configuração das rotas

// Conecta ao banco de dados e iniciar o servidor
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
