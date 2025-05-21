import React from 'react';

function TransacaoItem({ transacao }) {
    return (
        <tr>
            <td>{transacao.cpf}</td>
            <td>{transacao.descricao}</td>
            <td>{new Date(transacao.data_transacao).toLocaleDateString()}</td>
            <td>{transacao.pontos}</td>
            <td>R$ {parseFloat(transacao.valor_monetario).toFixed(2)}</td>
            <td>{transacao.status}</td>
        </tr>
    );
}

export default TransacaoItem;
