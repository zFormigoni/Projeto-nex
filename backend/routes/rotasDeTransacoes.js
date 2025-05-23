//? Rotas para serem acessadas pelo frontend

const express = require('express');
const router = express.Router();
const RepositorioTransacao = require('../db/RepositorioTransacao'); // BUSCAR ITENS NO BANCO
const Formatacao = require('../model/Formatacao');
const Excel = require('../model/excel');
const jwt = require('jsonwebtoken');
//? chave/codigo de autenticacao
const SEGREDO = 'projeto_nex';

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SEGREDO, (err, decoded) => {
        if (err) return res.status(401).end();

        req.cpf = decoded.cpf;

        console.log(`Usuario logado, cpf: ${decoded.cpf}`);
        next();
    });
}

//! busca todos
router.get('/todos', autenticarToken, async (req, res) => {
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
router.get('/cpf/:cpf', autenticarToken, async (req, res) => {
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
router.get('/aprovados', autenticarToken, async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(1);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Reprovados
router.get('/reprovados', autenticarToken, async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(2);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//!buscar Em analise
router.get('/analise', autenticarToken, async (req, res) => {
    try {
        const transacao = await RepositorioTransacao.BuscarStatus(3);
        res.json(transacao);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).send('Erro ao buscar transações');
    }
});

//! ADICIONAR ITENS DA PLANILHA
router.post('/adicionar', async (req, res) => {
    try {
        const name = req.body.name;
        const path = req.body.path;

        const dados = Excel.retornarDados(path, 0);
        //await RepositorioTransacao.iniciarConexao(); //! USAR PARA CRIAR A TABELA APENAS
        await Formatacao.cadastrarDados(dados, 1);

        res.status(200).json({ mensagem: 'Dados recebidos com sucesso' });
    } catch (erro) {
        console.error('Erro na rota /adicionar:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});
module.exports = router;
