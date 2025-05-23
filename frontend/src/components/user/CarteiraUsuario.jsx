import React, { useEffect, useState } from 'react';

const CarteiraUsuario = ({ dados }) => {
    const [valor, setValor] = useState(null);
    const [pontos, setPontos] = useState(null);

    const calcularSaldo = (dados) => {
        let somaPontos = 0;
        let somaValor = 0;

        dados.forEach((transacao) => {
            if (transacao.status == 1) {
                somaPontos += transacao.pontos;
                somaValor += parseInt(transacao.valor_monetario);
            }
        });

        setPontos(somaPontos);
        setValor(somaValor);
    };

    useEffect(() => {
        if (Array.isArray(dados)) {
            calcularSaldo(dados);
        }
    }, [dados]);
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '20px',
                marginTop: '20px',
            }}
        >
            <h2>Minha Carteira</h2>
            <p>
                <strong>Saldo total de pontos: {pontos}</strong>
            </p>
            <p>
                <strong>Saldo total de valor Monetario: R$ {valor}</strong>
            </p>
        </div>
    );
};

export default CarteiraUsuario;
