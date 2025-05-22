import React from 'react';

function converterDataExcel(numeroExcel) {
    const base = new Date(1900, 0, 1); // 1º de janeiro de 1900
    const dias = Number(numeroExcel) - 2; // Ajuste de correção: Excel conta 1900 como ano bissexto
    base.setDate(base.getDate() + dias);
    return base.toISOString().split('T')[0];
}

function converterStatus(status) {
    status === 1
        ? (status = 'Aprovado')
        : status === 2
        ? (status = 'Reprovado')
        : (status = 'Em analise');
    return status;
}

function TransacaoItem({ transacao }) {
    return (
        <tr>
            <td>{transacao.id}</td>
            <td>{transacao.cpf}</td>
            <td>{transacao.descricao}</td>
            <td>{converterDataExcel(transacao.data_transacao)}</td>
            <td>{transacao.pontos}</td>
            <td>R$ {parseFloat(transacao.valor_monetario).toFixed(2)}</td>
            <td>{converterStatus(transacao.status)}</td>
        </tr>
    );
}

export default TransacaoItem;
