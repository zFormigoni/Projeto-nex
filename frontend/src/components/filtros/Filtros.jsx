import React, { useEffect, useState } from 'react';
import FiltroInput from '../filtros/FiltroInput';
import CheckboxFiltro from '../filtros/CheckboxFiltroStatus';
import './Filtro.css';
import TabelaTransacoes from '../transacoes/TabelaTransacoes';

function Filtros({ dados, tipo }) {
    const [cpfFiltro, setCpfFiltro] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    /* useEffect(() => {
         if (cpfFiltro !== '') {
            buscardados(`${URL}CPF/${cpfFiltro}`);
        } else if (statusFiltro !== '') {
            buscardados(`${URL}${statusFiltro}`);
        } else {
            buscardados(`${URL}todos`);
        } 
    }, [cpfFiltro, statusFiltro]); */

    const filtrosCorretos = (tipo) => {
        console.log('tipo', tipo);
        if (tipo == 2) {
            return (
                <div>
                    <div>
                        <FiltroInput
                            type="date"
                            label="Data de Inicio" //!Filtro Data de inicio
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Data de Inicio"
                        />
                        <FiltroInput
                            type="date"
                            label="Data Final" //!Filtro Data Final
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            placeholder="Data Final"
                        />
                    </div>
                    <div className="filtroValor">
                        <FiltroInput
                            type="number"
                            label="valor de Inicio" //!Filtro valor de inicio
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            placeholder="valor de Inicio"
                        />
                        <FiltroInput
                            type="number"
                            label="valor Final" //!Filtro valor Final
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="valor Final"
                        />
                    </div>
                    <CheckboxFiltro
                        valorSelecionado={statusFiltro}
                        onChange={setStatusFiltro}
                    />
                </div>
            );
        } else if (tipo == 1) {
            return (
                <div>
                    <FiltroInput
                        label="CPF" //!Filtro CPF
                        value={cpfFiltro}
                        onChange={(e) => setCpfFiltro(e.target.value)}
                        placeholder="Buscar CPF"
                    />
                    <div className="filtroData">
                        <FiltroInput
                            type="date"
                            label="Data de Inicio" //!Filtro Data de inicio
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Data de Inicio"
                        />
                        <FiltroInput
                            type="date"
                            label="Data Final" //!Filtro Data Final
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="Data Final"
                        />
                    </div>
                    <div className="filtroValor">
                        <FiltroInput
                            type="number"
                            label="valor de Inicio" //!Filtro Data de inicio
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="valor de Inicio"
                        />
                        <FiltroInput
                            type="number"
                            label="valor Final" //!Filtro Data Final
                            value={0}
                            onChange={(e) => console.log(e.target.value)}
                            placeholder="valor Final"
                        />
                    </div>
                    <CheckboxFiltro
                        valorSelecionado={statusFiltro}
                        onChange={setStatusFiltro}
                    />
                </div>
            );
        }
    };

    return (
        <div>
            {filtrosCorretos(tipo)}
            <TabelaTransacoes dados={dados} />
        </div>
    );
}

export default Filtros;
