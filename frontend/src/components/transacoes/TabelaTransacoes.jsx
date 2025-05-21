import React from 'react';
import TransacaoItem from './TransacaoItem';

function TabelaTransacoes({ dados }) {
    if (!dados || dados.length === 0) {
        return <p>Nenhuma transação encontrada.</p>;
    }
    return (
        <table border="5" cellPadding="8">
            <thead>
                <tr>
                    <th>CPF</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Pontos</th>
                    <th>Valor</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((item, index) => (
                    <TransacaoItem key={index} transacao={item} />
                ))}
            </tbody>
        </table>
    );
}

export default TabelaTransacoes;
