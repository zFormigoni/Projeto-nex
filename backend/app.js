const Formatacao = require('./model/Formatacao');
const Excel = require('./model/excel');
const express = require('express');
const cors = require('cors');
const db = require('./db/db'); //? Conexão com o banco de dados
const transacoesRoute = require('./routes/rotasDeTransacoes'); //? Rota para transações
const usuariosRoute = require('./routes/rotasDeUsuarios'); //? Rota para transações
const RepositorioTransacao = require('./db/RepositorioTransacao');
const RepositorioUsuarios = require('./db/RepositorioUsuarios');
const Usuario = require('./model/usuario');

//? pega os dados da planilha
//const dados = Excel.retornarDados('./pasta1.xlsx', 0);

//! Transacao
//RepositorioTransacao.iniciarConexao(); //? CRIA A TABELA DE USUARIO SE NAO HOUVER
//Formatacao.cadastrarDados(dados, 1); //? cadastra os dados no banco de dados
//Formatacao.cadastrarDados(dados, 2); //? deleta os dados no banco de dados

//! Usuarios
//RepositorioUsuarios.iniciarConexao(); //? CRIA A TABELA DE USUARIO SE NAO HOUVER
//const adm = new Usuario(12312312312, 'vitor', 'vitor@gmail.com', 'senha', 1);
//RepositorioUsuarios.CriarItem(adm);

//? Criação do servidor Express
const app = express();
const porta = 3001;
app.use(cors()); //? Habilita CORS para permitir que o frontend acesse a API
app.use(express.json());

//? Configuração das rotas
app.use('/transacoes', transacoesRoute);
app.use('/usuarios', usuariosRoute);

// Conecta ao banco de dados e iniciar o servidor
db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida!');
        app.listen(porta, () => {
            console.log(
                `Servidor backend rodando em http://localhost:${porta}/transacoes/`
            );
            console.log(
                `Servidor backend rodando em http://localhost:${porta}/usuarios/`
            );
        });
    })
    .catch((err) => {
        console.error('Erro na conexão com o banco de dados:', err);
    });
