//? Modelo do usuario para facilicar o cadastro no banco

class Usuario {
    constructor(cpf, nome, email, senha, tipo) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo; //! 1 == ADM -- 2 == Normal
    }
}

module.exports = Usuario;
