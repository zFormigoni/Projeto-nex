import React, { useState } from 'react';
import './Login.css'; // Arquivo opcional para estilos
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState(false);
    const navigate = useNavigate(); // Hook de navegação para redirecionamento

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login:', { email, senha });
        try {
            const resposta = await fetch(
                'http://localhost:3001/usuarios/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha }),
                }
            );
            const resultado = await resposta.json();
            if (resposta.status === 200) {
                if (resultado.tipo == 1) {
                    navigate('/admin'); //? Redireciona para pagina de adm
                } else if (resultado.tipo == 2) {
                    navigate('/user'); //? Redireciona para pagina de usuario
                }
            } else {
                setMensagem(
                    <span style={{ color: 'red' }}>{resultado.mensagem}</span>
                );
            }
        } catch (erro) {
            console.log('Erro no Login:', erro);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    {mensagem && <div>{mensagem}</div>}
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

            <div>
                <Link to="/cadastro">Fazer cadastro</Link>
            </div>
        </div>
    );
}

export default Login;
