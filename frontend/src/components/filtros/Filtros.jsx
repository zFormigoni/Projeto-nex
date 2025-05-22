import React, { useEffect, useState } from 'react';
import FiltroInput from '../filtros/FiltroInput';
import CheckboxFiltro from '../filtros/CheckboxFiltroStatus';
import './Filtro.css';
import TabelaTransacoes from '../transacoes/TabelaTransacoes';

function Filtros({ dados, tipo }) {
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [cpfFiltro, setCpfFiltro] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [valorInicio, setValorInicio] = useState('');
    const [valorFinal, setValorFinal] = useState('');

    function algumFiltroAtivo() {
        return (
            cpfFiltro !== '' ||
            statusFiltro !== '' ||
            dataInicio !== '' ||
            dataFim !== '' ||
            valorInicio !== '' ||
            valorFinal !== ''
        );
    }

    const FiltroCPF = () => {
        return (
            <FiltroInput
                label="CPF" //!Filtro CPF
                value={cpfFiltro}
                onChange={(e) => {
                    setCpfFiltro(e.target.value);
                    limparFiltros('cpf');
                }}
                placeholder="Buscar CPF"
            />
        );
    };

    const FiltroData = () => {
        return (
            <div className="filtroData">
                <FiltroInput
                    type="date"
                    label="Data de Inicio" //!Filtro Data de inicio
                    value={dataInicio}
                    onChange={(e) => {
                        setDataInicio(e.target.value);
                        limparFiltros('data');
                    }}
                    placeholder="Data de Inicio"
                />
                <FiltroInput
                    type="date"
                    label="Data Final" //!Filtro Data Final
                    value={dataFim}
                    onChange={(e) => {
                        setDataFim(e.target.value);
                        limparFiltros('data');
                    }}
                    placeholder="Data Final"
                />
            </div>
        );
    };

    const FiltroValor = () => {
        return (
            <div className="filtroValor">
                <FiltroInput
                    type="number"
                    label="valor de Inicio" //!Filtro valor de inicio
                    value={valorInicio}
                    onChange={(e) => {
                        setValorInicio(e.target.value);
                        limparFiltros('valor');
                    }}
                    placeholder="valor de Inicio"
                />
                <FiltroInput
                    type="number"
                    label="valor Final" //!Filtro valor Final
                    value={valorFinal}
                    onChange={(e) => {
                        setValorFinal(e.target.value);
                        limparFiltros('valor');
                    }}
                    placeholder="valor Final"
                />
            </div>
        );
    };

    const filtrosCorretos = (tipo) => {
        if (tipo == 2) {
            return (
                <div className="Filtro-usuario">
                    <FiltroData />
                    <FiltroValor />
                </div>
            );
        } else if (tipo == 1) {
            return (
                <div className="Filtro-adm">
                    <FiltroCPF />
                    <FiltroData />
                    <FiltroValor />
                    <CheckboxFiltro
                        valorSelecionado={statusFiltro}
                        onChange={(e) => {
                            setStatusFiltro(e);
                            limparFiltros('status');
                        }}
                    />
                </div>
            );
        }
    };

    const limparFiltros = (filtro) => {
        if (filtro == 'cpf') {
            //? limpa todos menos cpf
            setStatusFiltro('');
            setDataInicio('');
            setDataFim('');
            setValorInicio('');
            setValorFinal('');
        }
        if (filtro == 'status') {
            //? limpa todos menos status
            setCpfFiltro('');
            setDataInicio('');
            setDataFim('');
            setValorInicio('');
            setValorFinal('');
        }
        if (filtro == 'data') {
            //? limpa todos menos datas
            setCpfFiltro('');
            setStatusFiltro('');
            setValorInicio('');
            setValorFinal('');
        }
        if (filtro == 'valor') {
            //? limpa todos menos valores
            setCpfFiltro('');
            setStatusFiltro('');
            setDataInicio('');
            setDataFim('');
        }
    };

    function dataParaExcelSerial(data) {
        const baseDate = new Date(Date.UTC(1899, 11, 30)); // Excel começa em 30/12/1899
        const date = new Date(data);
        const diffMs = date - baseDate;
        const diffDias = diffMs / (1000 * 60 * 60 * 24);
        return Math.floor(diffDias);
    }

    useEffect(() => {
        if (cpfFiltro !== '') {
            setDadosFiltrados([]);
            dados.forEach((item) => {
                if (cpfFiltro == item.cpf) {
                    setDadosFiltrados((prev) => [...prev, item]);
                }
            });
        }

        if (statusFiltro !== '') {
            setDadosFiltrados([]);
            if (statusFiltro == 1) {
                dados.forEach((item) => {
                    if (statusFiltro == item.status) {
                        setDadosFiltrados((prev) => [...prev, item]);
                    }
                });
            } else if (statusFiltro == 2) {
                dados.forEach((item) => {
                    if (statusFiltro == item.status) {
                        setDadosFiltrados((prev) => [...prev, item]);
                    }
                });
            } else if (statusFiltro == 3) {
                dados.forEach((item) => {
                    if (statusFiltro == item.status) {
                        setDadosFiltrados((prev) => [...prev, item]);
                    }
                });
            } else if (statusFiltro == 0) {
                dados.forEach((item) => {
                    setDadosFiltrados((prev) => [...prev, item]);
                });
            }
        }

        if (dataInicio && dataFim !== '') {
            const inicioExcel = dataParaExcelSerial(dataInicio);
            const fimExcel = dataParaExcelSerial(dataFim);

            const filtrados = dados.filter((item) => {
                return (
                    item.data_transacao >= inicioExcel &&
                    item.data_transacao <= fimExcel
                );
            });

            setDadosFiltrados(filtrados);
        }

        if (valorInicio !== '' && valorFinal !== '') {
            const iniciovalor = parseFloat(valorInicio);
            const finalvalor = parseFloat(valorFinal);

            const filtrados = dados.filter((item) => {
                return (
                    parseFloat(item.valor_monetario) >= iniciovalor &&
                    parseFloat(item.valor_monetario) <= finalvalor
                );
            });

            console.log(filtrados);
            setDadosFiltrados(filtrados);
        }
    }, [cpfFiltro, statusFiltro, dataInicio, dataFim, valorInicio, valorFinal]);

    return (
        <div>
            {filtrosCorretos(tipo)}
            <TabelaTransacoes
                dados={
                    dadosFiltrados.length == 0 && algumFiltroAtivo() == false
                        ? dados
                        : dadosFiltrados
                }
            />
        </div>
    );
}

export default Filtros;
