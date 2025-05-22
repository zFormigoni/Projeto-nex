import React from 'react';

const opcoesStatus = [
    { label: 'Todos', value: '' },
    { label: 'Aprovado', value: 'aprovados/' },
    { label: 'Reprovado', value: 'reprovados/' },
    { label: 'Em avaliação', value: 'analise/' },
];

function CheckboxFiltro({ valorSelecionado, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '15px' }}>
            {opcoesStatus.map((opcao) => (
                <label key={opcao.value}>
                    <input
                        type="checkbox"
                        checked={valorSelecionado === opcao.value}
                        onChange={() =>
                            onChange(
                                valorSelecionado === opcao.value
                                    ? ''
                                    : opcao.value
                            )
                        }
                    />
                    {opcao.label}
                </label>
            ))}
        </div>
    );
}

export default CheckboxFiltro;
