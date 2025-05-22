const express = require('express');
const router = express.Router();
const RepositorioUsuarios = require('../db/RepositorioUsuarios');

//! busca todos
router.get('/todos', async (req, res) => {
    try {
        // Buscar todas as transações no banco de dados
        const usuarios = await RepositorioUsuarios.BuscarTodos();
        res.json(usuarios); // Retorna as transações em formato JSON
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

module.exports = router;
