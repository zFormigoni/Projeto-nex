//TODO: Criar filtro de valor

import React, { useEffect, useState } from 'react';
import TabelaTransacoes from '../transacoes/TabelaTransacoes';
import FiltroInput from '../filtros/FiltroInput';
import CheckboxFiltro from '../filtros/CheckboxFiltroStatus';

function Admin() {
    const URL = 'http://localhost:3001/transacoes/';
    const [dados, setDados] = useState(null);
    const [cpfFiltro, setCpfFiltro] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [valorInicio, setValorInicio] = useState('');
    const [valorFinal, setValorFinal] = useState('');
    //!no momento nao é necessario usar o cpf nessa pagina
    //const cpf = localStorage.getItem('cpfUsuario');

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            setDados(dados);
        } else {
            setDados([dados]);
        }
    };

    const converterParaNumeroExcel = (dataString) => {
        const data = new Date(dataString);
        if (isNaN(data)) return null;

        const base = new Date(1899, 11, 30); // Base do Excel (30 de dezembro de 1899)
        const diff = (data - base) / (1000 * 60 * 60 * 24); // diferença em dias
        return Math.floor(diff) + 1;
    };

    //TODO: Ajustar filtro por data
    const filtrarDados = () => {
        if (!dados || !Array.isArray(dados)) return; //? se nao for array nao filtra

        const dataIncioCONVERTIDA = converterParaNumeroExcel(dataInicio);
        const dataFinalCONVERTIDA = converterParaNumeroExcel(dataFim);
        //* FUNCIONA dataIncioCONVERTIDA <= dados[0].data_transacao &&                 dataFinalCONVERTIDA >= dados[0].data_transacao
        const filtrados = [];

        for (const item of dados) {
            const dataDoItem = item.data_transacao;
            if (
                dataIncioCONVERTIDA <= dataDoItem &&
                dataFinalCONVERTIDA >= dataDoItem
            ) {
                filtrados.push(item);
            }
        }
        setDados(filtrados);
    };

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
        } else if (dataInicio !== '' || dataFim !== '') {
            filtrarDados();
        } else {
            buscardados(`${URL}todos`);
        }
    }, [cpfFiltro, statusFiltro, dataInicio, dataFim, dataInicio, dataFim]);

    return (
        <div>
            <h1>Relatório de Transações</h1>
            <FiltroInput
                label="CPF" //!Filtro CPF
                value={cpfFiltro}
                onChange={(e) => setCpfFiltro(e.target.value)}
                placeholder="Buscar CPF"
            />
            <FiltroInput
                type="date"
                label="Data de Inicio" //!Filtro Data de inicio
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                placeholder="Data de Inicio"
            />
            {dataInicio}
            {'   '}
            {converterParaNumeroExcel(dataInicio)}
            <FiltroInput
                type="date"
                label="Data Final" //!Filtro Data Final
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                placeholder="Data Final"
            />
            <CheckboxFiltro
                valorSelecionado={statusFiltro}
                onChange={setStatusFiltro}
            />
            <TabelaTransacoes dados={dados} />
        </div>
    );
}
export default Admin;
