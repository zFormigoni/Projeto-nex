const express = require('express');
const router = express.Router();
const Repositorio = require('../db/Repositorio'); // BUSCAR ITENS NO BANCO

// Rota para obter todas as transações
router.get('/todos', async (req, res) => {
    try {
        // Buscar todas as transações no banco de dados
        const transacoes = await Repositorio.BuscarTodos();
        res.json(transacoes); // Retorna as transações em formato JSON
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

module.exports = router;
