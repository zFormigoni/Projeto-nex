import React, { useState } from 'react';
import './User.css'; // Arquivo opcional para estilos

function UserCadastro() {
    const [CPF, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', { email, senha });
        // Aqui você pode fazer a requisição para sua API de autenticação
    };

    return (
        <div className="login-container">
            <h2>CADASTRO</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cpf:</label>
                    <br />
                    <input
                        type="CPF"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <br />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default UserCadastro;
