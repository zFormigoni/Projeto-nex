const express = require('express');
const router = express.Router();
const Repositorio = require('../db/Repositorio'); // BUSCAR ITENS NO BANCO

//! busca todos
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

//!busca por cpf
router.get('/cpf/:cpf', async (req, res) => {
    const { cpf } = req.params; // Pega o CPF da URL

    try {
        const transacao = await Repositorio.BuscarCPF(cpf);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar aprovados
router.get('/aprovados/', async (req, res) => {
    try {
        const transacao = await Repositorio.BuscarStatus(1);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Reprovados
router.get('/reprovados/', async (req, res) => {
    try {
        const transacao = await Repositorio.BuscarStatus(2);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Em analise
router.get('/analise/', async (req, res) => {
    try {
        const transacao = await Repositorio.BuscarStatus(3);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

module.exports = router;
