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

    const opcoesStatus = [
        { label: 'Todos', value: '' },
        { label: 'Aprovado', value: 'aprovados/' },
        { label: 'Reprovado', value: 'reprovados/' },
        { label: 'Em avaliação', value: 'analise/' },
    ];

    const validaDados = (dados) => {
        if (!dados) {
            setDados([]);
        } else if (Array.isArray(dados)) {
            setDados(dados);
        } else {
            setDados([dados]);
        }
    };

    const buscardados = (URL) => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                validaDados(data);
                console.log(data);
            })
            .catch((error) =>
                console.error('Erro ao buscar dados por CPF:', error)
            );
    };

    useEffect(() => {
        if (cpfFiltro !== '') {
            buscardados(`${URL}CPF/${cpfFiltro}`);
        } else if (statusFiltro !== '') {
            buscardados(`${URL}${statusFiltro}`);
        } else {
            buscardados('http://localhost:3001/todos');
        }
    }, [cpfFiltro, statusFiltro]);

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

            <FiltroInput
                type="date"
                label="Data Final" //!Filtro Data Final
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                placeholder="Data Final"
            />

            <CheckboxFiltro
                opcoes={opcoesStatus}
                valorSelecionado={statusFiltro}
                onChange={setStatusFiltro}
            />

            <TabelaTransacoes dados={dados} />
        </div>
    );
}
export default Admin;
