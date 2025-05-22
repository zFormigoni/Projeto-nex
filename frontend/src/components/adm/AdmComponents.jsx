import React, { useEffect, useState } from 'react';
import './Adm.css';
import Filtros from '../filtros/Filtros';
import UploadExcel from '../excel/InputPlanilha';

function Admin() {
    const URL = 'http://localhost:3001/transacoes/todos';
    const nome = localStorage.getItem('nomeUsuario');

    const [dados, setDados] = useState(null);

    const buscardados = (URL) => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                validaDados(data);
            })
            .catch((error) => console.error('Erro ao buscar dados', error));
    };

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            setDados(dados);
        } else {
            setDados([dados]);
        }
    };
    useEffect(() => {
        buscardados(URL);
    }, []);

    return (
        <div className="admin-page ">
            <h1>Relatório de Transações </h1>
            <h2>administrador : {nome}</h2>
            <UploadExcel />

            <Filtros dados={dados} tipo={1} />
        </div>
    );
}
export default Admin;
