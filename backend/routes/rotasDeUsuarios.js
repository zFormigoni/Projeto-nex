const express = require('express');
const router = express.Router();
const RepositorioUsuarios = require('../db/RepositorioUsuarios');

function limparCPF(cpf) {
    const numeros = String(cpf).replace(/\D/g, ''); // Remove tudo que não é dígito
    return parseInt(numeros, 10);
}

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
//! cadastrar novo
router.post('/cadastrar', async (req, res) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        const novoUsuario = {
            cpf: limparCPF(cpf),
            nome,
            email,
            senha,
            tipo: 2, //? por padrao so vao ser cadastrados usuarios comuns
        };

        const resposta = await RepositorioUsuarios.CriarItem(novoUsuario);

        if (resposta == 1) {
            res.status(201).json({
                mensagem: `Usuário cadastrado com sucesso`,
            });
        }
        if (resposta == 2) {
            res.status(409).json({
                mensagem: `Usuario ja cadastrado`,
            });
        } else {
            res.status(500).json({
                mensagem: `Erro ao cadastrar usuario`,
            });
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
});

//! Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        //! Verifica se o usuário existe pelo e-mail
        const usuario = await RepositorioUsuarios.BuscarEmail(email);
        const tipo = usuario.dataValues.tipo;

        if (usuario == null) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        //TODO: FAZER VALIDACAO COM JWT
        if (usuario.dataValues.senha == senha) {
            res.status(200).json({
                mensagem: 'Login bem-sucedido',
                tipo: tipo,
            });
        } else {
            res.status(404).json({
                mensagem: 'Senha incorreta',
            });
        }
    } catch (erro) {
        console.error('Erro ao realizar login:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});

module.exports = router;
