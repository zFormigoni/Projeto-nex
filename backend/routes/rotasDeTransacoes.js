//? Rotas para serem acessadas pelo frontend

const express = require('express');
const router = express.Router();
const RepositorioTransacao = require('../db/RepositorioTransacao'); // BUSCAR ITENS NO BANCO

//! busca todos
router.get('/todos', async (req, res) => {
    try {
        // Buscar todas as transações no banco de dados
        const transacoes = await RepositorioTransacao.BuscarTodos();
        res.json(transacoes); // Retorna as transações em formato JSON
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!busca por cpf
router.get('/cpf/:cpf', async (req, res) => {
    const { cpf } = req.params; // Pega o CPF da URL

    try {
        const transacao = await RepositorioTransacao.BuscarCPF(cpf);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar aprovados
router.get('/aprovados/', async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(1);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Reprovados
router.get('/reprovados/', async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(2);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Em analise
router.get('/analise/', async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(3);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

module.exports = router;
