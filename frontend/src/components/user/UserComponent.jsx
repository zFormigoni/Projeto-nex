import React, { useEffect, useState } from 'react';
import TabelaTransacoes from '../transacoes/TabelaTransacoes';
import CarteiraUsuario from './CarteiraUsuario';
import './User.css';
import Filtros from '../filtros/Filtros';

function User() {
    const cpf = localStorage.getItem('cpfUsuario');
    const URL = `http://localhost:3001/transacoes/cpf/${cpf}`;
    const nome = localStorage.getItem('nomeUsuario');

    const [dados, setDados] = useState(null);
    const [valor, setValor] = useState(null);
    const [pontos, setPontos] = useState(null);

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            calcularSaldo(dados);
            setDados(dados);
        } else {
            calcularSaldo(dados);
            setDados([dados]);
        }
    };

    const buscardados = (URL) => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => validaDados(data))
            .catch((error) => console.error('Erro ao buscar dados', error));
    };

    const calcularSaldo = (dados) => {
        let somaPontos = 0;
        let somaValor = 0;

        dados.forEach((transacao) => {
            if ((transacao.status = 1)) {
                somaPontos += transacao.pontos;
                somaValor += parseInt(transacao.valor_monetario);
            }
        });

        setPontos(somaPontos);
        setValor(somaValor);
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
                    <CarteiraUsuario pontos={pontos} valor={valor} />
                </div>
            </div>
        </div>
    );
}

export default User;
