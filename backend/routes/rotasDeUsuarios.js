const express = require('express');
const router = express.Router();
const RepositorioUsuarios = require('../db/RepositorioUsuarios');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

//? chave/codigo de autenticacao
const SEGREDO = 'projeto_nex';

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

        //? validar se ja existe por email
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

        if (usuario == null) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        //TODO: FAZER VALIDACAO COM JWT
        if (usuario.dataValues.senha == senha) {
            const token = jwt.sign({ cpf: usuario.dataValues.cpf }, SEGREDO, {
                expiresIn: 300,
            });

            //! se quebrar volta o codigo pra isso
            // res.status(200).json({
            return res.json({
                /* mensagem: 'Login bem-sucedido',*/
                usuario: usuario,
                auth: true,
                token,
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

//! Rota que recebe o upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            `C:/Users/user/Projetos_de_cursos/Projeto nex/backend/uploads/`
        ); // pasta onde vai salvar o arquivo
    },
    filename: function (req, file, cb) {
        // para evitar conflitos, você pode renomear o arquivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // mantém a extensão
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // 'file' é o nome do campo do formData
        if (!req.file) {
            return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
        }

        // req.file contém informações do arquivo salvo
        res.status(200).json({
            mensagem: 'Arquivo recebido com sucesso',
            nomeSalvo: req.file.filename,
            caminho: req.file.path,
        });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});

module.exports = router;
