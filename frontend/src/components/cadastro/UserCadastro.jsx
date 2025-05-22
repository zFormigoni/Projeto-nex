import React, { useState } from 'react';
import './User.css'; // Arquivo opcional para estilos
import { useNavigate } from 'react-router-dom';

function UserCadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpfErro, setCpfErro] = useState(false);
    const navigate = useNavigate(); // Hook de navegação para redirecionamento

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cpf.length !== 14) {
            setCpfErro(true); // Marca o erro de CPF
        } else {
            setCpfErro(false); // Remove o erro se o CPF for válido
            const dados = { nome, cpf, email, senha };

            try {
                const resposta = await fetch(
                    'http://localhost:3001/usuarios/cadastrar',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dados),
                    }
                );

                const resultado = await resposta.json();
                console.log('Usuário cadastrado:', resultado);

                // Redireciona para login ou exibe mensagem de sucesso
            } catch (erro) {
                console.error('Erro no cadastro:', erro);
            }

            //navigate('/');
        }
    };

    const formatCPF = (inputValue) => {
        //? Remove tudo que não for número
        let value = inputValue.replace(/\D/g, '');

        //? Corta para no máximo 11 dígitos
        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        //?  log para ver os pontos de corte
        /*if (value.length === 3 || value.length === 6 || value.length === 9) {
            console.log('Ponto de corte:', value);
        } */

        //? Aplica a máscara
        if (value.length > 3) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (value.length > 6) {
            value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (value.length > 9) {
            value = value.replace(
                /(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/,
                '$1.$2.$3-$4'
            );
        }

        setCpf(value);
    };

    const formatNome = (inputValue) => {
        let formattedName = inputValue.replace(
            /[^a-zA-ZáéíóúãõâêîôûàèìòùäëïöüçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÄËÏÖÜÇ ]+/g,
            ''
        );
        setNome(formattedName);
    };

    return (
        <div className="cadastro-container">
            <h2>CADASTRO</h2>
            <form onSubmit={handleSubmit}>
                <div className="nomeEcpf">
                    <div className="inputGroup">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => formatNome(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>CPF:</label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => formatCPF(e.target.value)}
                            style={{ borderColor: cpfErro ? 'red' : 'black' }}
                            maxLength={14}
                            required
                        />
                        {cpfErro && (
                            <span style={{ color: 'red' }}>CPF inválido.</span>
                        )}
                    </div>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default UserCadastro;
