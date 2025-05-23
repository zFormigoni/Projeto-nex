import React, { useEffect, useState } from 'react';
import CarteiraUsuario from './CarteiraUsuario';
import './User.css';
import Filtros from '../filtros/Filtros';

function User() {
    const cpf = localStorage.getItem('cpfUsuario');
    const URL = `http://localhost:3001/transacoes/cpf/${cpf}`;
    const nome = localStorage.getItem('nomeUsuario');

    const [dados, setDados] = useState(null);

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            //calcularSaldo(dados);
            setDados(dados);
        } else {
            //calcularSaldo(dados);
            setDados([dados]);
        }
    };

    const buscardados = (URL) => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                validaDados(data);
            })
            .catch((error) => console.error('Erro ao buscar dados', error));
    };

    useEffect(() => {
        buscardados(URL);
    }, []);
    return (
        <div>
            <h1>Extrato de {nome}</h1>

            <div className="user-page">
                <div className="painel-conteudo">
                    <Filtros dados={dados} tipo={2} />
                    <CarteiraUsuario dados={dados} />
                </div>
            </div>
        </div>
    );
}

export default User;
