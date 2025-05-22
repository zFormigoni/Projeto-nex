import React, { useEffect, useState } from 'react';
import TabelaTransacoes from '../transacoes/TabelaTransacoes';
import FiltroInput from '../filtros/FiltroInput';
import CheckboxFiltro from '../filtros/CheckboxFiltroStatus';

function Admin() {
    const URL = 'http://localhost:3001/';
    const [dados, setDados] = useState(null);
    const [cpfFiltro, setCpfFiltro] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            setDados(dados);
        } else {
            setDados([dados]);
        }
    };

    //TODO: Ajustar filtro por data
    /* const filtrarDados = (dados, dataInicio, dataFinal) => {
        if (!dados) return [];

        const filtrados = [];

        for (let i = 0; i < dados.length; i++) {
            const item = dados[i]; //? pega um item da lista
            const dataItem = new Date(item.data_transacao); //? pega a data do item

            if (dataInicio && dataItem < dataInicio) continue;
            if (dataFinal && dataItem > dataFinal) continue;

            filtrados.push(item);
        }

        return filtrados;
    }; */

    const buscardados = (URL) => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                validaDados(data);
            })
            .catch((error) => console.error('Erro ao buscar dados', error));
    };

    useEffect(() => {
        if (cpfFiltro !== '') {
            buscardados(`${URL}CPF/${cpfFiltro}`);
        } else if (statusFiltro !== '') {
            buscardados(`${URL}${statusFiltro}`);
        } else {
            buscardados('http://localhost:3001/todos');
        }
    }, [cpfFiltro, statusFiltro, dataInicio, dataFim]);

    return (
        <div>
            <h1>Relatório de Transações</h1>

            <FiltroInput
                label="CPF" //!Filtro CPF
                value={cpfFiltro}
                onChange={(e) => setCpfFiltro(e.target.value)}
                placeholder="Buscar CPF"
            />

            {/* //TODO: Ajustar filtro por data 
            <FiltroInput
                type="date"
                label="Data de Inicio" //!Filtro Data de inicio
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                placeholder="Data de Inicio"
            />

            <FiltroInput
                type="date"
                label="Data Final" //!Filtro Data Final
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                placeholder="Data Final"
            /> */}

            <CheckboxFiltro
                valorSelecionado={statusFiltro}
                onChange={setStatusFiltro}
            />

            <TabelaTransacoes dados={dados} />
        </div>
    );
}
export default Admin;
