import React from 'react';

const opcoesStatus = [
    { label: 'Todos', value: 0 },
    { label: 'Aprovado', value: 1 },
    { label: 'Reprovado', value: 2 },
    { label: 'Em avaliação', value: 3 },
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
