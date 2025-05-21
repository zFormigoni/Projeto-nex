const Repositorio = require('./db/conexao');
const Transacao = require('./model/transacao');

//? inicia uma nova transacao
const item = new Transacao('1234', 'item 4', '2025-05-20', 10.0, 1000.0, 1);
const item2 = new Transacao(
    '12345000',
    'item atualizdo teste 2',
    '2025-05-20',
    10.0,
    1000.0,
    1
);

//Repositorio.iniciarConexao(); //! Necessario apenas uma vez para criar tabela se nao existir

//Repositorio.CriarItem(item);
//Repositorio.BuscarTodos();
//Repositorio.BuscarCPF('1234111111');
//Repositorio.BuscarStatus(1);
//Repositorio.Atualizar(item.cpf, item2); //! REVISAR
//Repositorio.Deletar(123456);
