import React, { useEffect, useState } from 'react';

const CarteiraUsuario = ({ pontos, valor }) => {
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
                <strong>Saldo total de pontos: {valor}</strong>
            </p>
        </div>
    );
};

export default CarteiraUsuario;
