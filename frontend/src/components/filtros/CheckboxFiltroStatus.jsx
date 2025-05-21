import React, { useState } from 'react';

function CheckboxFiltro({ opcoes, valorSelecionado, onChange }) {
    return (
        <div style={{ display: 'flex', gap: '15px' }}>
            {opcoes.map((opcao) => (
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
