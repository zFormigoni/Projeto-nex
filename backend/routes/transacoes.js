// backend/app.js
const express = require('express');
const cors = require('cors');
const db = require('../db/conexao');
const usuariosRoute = require('./routes/transacoes'); // Rota para pegar transacoes do banco

// Criação do servidor Express
const app = express();
app.use(cors()); // Habilita CORS para permitir que o frontend acesse a API
app.use(express.json());

// Configuração das rotas
app.use('/api/usuarios', usuariosRoute); // Define que a rota /api/usuarios será tratada por usuariosRoute

// Conectar ao banco de dados e iniciar o servidor
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Servidor backend rodando em http://localhost:3001');
    });
});
