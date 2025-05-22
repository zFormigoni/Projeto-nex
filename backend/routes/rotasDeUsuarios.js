const express = require('express');
const router = express.Router();
const RepositorioUsuarios = require('../db/RepositorioUsuarios');
const Usuario = require('../model/usuario');

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

        if (!nome || !cpf || !email || !senha) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const novoUsuario = {
            cpf: limparCPF(cpf),
            nome,
            email,
            senha,
            tipo: 2, //? por padrao so vao ser cadastrados usuarios comuns
        };

        /* console.log(novoUsuario);
        const teste = new Usuario(
            12312312312,
            'vitor',
            'vitor@gmail.com',
            'senha',
            1
        );
        console.log(`teste`, teste); */
        RepositorioUsuarios.CriarItem(novoUsuario);

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario,
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }
});

module.exports = router;
