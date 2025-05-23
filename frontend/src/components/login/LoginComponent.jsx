import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            const tipoUsuario = resultado.usuario.tipo;

            localStorage.setItem(`token`, resultado.token);

            localStorage.setItem(`nomeUsuario`, resultado.usuario.nome);
            localStorage.setItem('cpfUsuario', resultado.usuario.cpf); //? salva no localstorage para usar na pagina de usuario

            if (resposta.status === 200) {
                if (tipoUsuario === 1) {
                    navigate('/admin'); //? Redireciona para pagina de adm
                } else if (tipoUsuario == 2) {
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
