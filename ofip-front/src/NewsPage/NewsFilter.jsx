import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from "date-fns/locale/pt";
import { useEffect } from 'react';
import { vehicleActions } from './../actions/vehicleActions';
import { keywordActions } from './../actions/keywordActions';
import { projectActions } from './../actions/projectActions';
import { fileConstants } from './../constants/fileConstants';

registerLocale("pt-BR", pt);


function NewsFilter({ takeBody, takeExport }) {
    let dispatch = useDispatch();
    // valores a serem definidos
    let [start, setStartDate] = useState(null);
    let [end, setEndDate] = useState(null);
    let [vehicleId, setVehicleId] = useState("");
    let [keyWordId, setKeyWordId] = useState("");
    let [projectId, setProjectId] = useState("");
    let [registerQuantity, setRegisterQuantity] = useState("");
    let [internalBody, setInternalBody] = useState({});

    const changeBody = (value, name) => {
        internalBody[name] = isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
        setInternalBody(internalBody);
    }

    // valores provenientes de dropdown
    // 1 - para veículos de imprensa
    let vehicles = useSelector(state => state.vehicle.vehicles);
    let vehicleSuccess = useSelector(state => state.vehicle.success);
    
    const onVehicleChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setVehicleId(value);
        changeBody(value, 'vehicleId');
        dispatch(keywordActions.getKeywords(internalBody));
    }

    // 2 - para palavras chave
    let keywords = useSelector(state => state.keyword.keywords);
    let keywordsSuccess = useSelector(state => state.keyword.success);

    const onKeywordChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setKeyWordId(value);
        changeBody(value, 'keyWordId');
    }

    // 3 - para projetos
    let projects = useSelector(state => state.project.projects);
    let projectsSuccess = useSelector(state => state.project.success);

    const onProjectChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setProjectId(value);
        changeBody(value, 'projectId');
        dispatch(vehicleActions.getVehicles(internalBody));
    }

    const onRegisterQuantityChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setRegisterQuantity(value);
    }

    useEffect(() => {
        dispatch(vehicleActions.getVehicles(internalBody));
        dispatch(keywordActions.getKeywords(internalBody));
        dispatch(projectActions.getProjects(internalBody));
    },[])

    return (
        <div >
            <div className="col-md-10 mx-auto mb-3">
                <div className="card shadow-sm">
                    <div className="card-header title-news-header filter-header-color">
                        <span className="mr-2"><i className="fa fa-filter"></i></span>Filtragem de notícias
                    </div>
                    <div className="card-body filter-body-color">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Data inicial:</label>
                                    <DatePicker
                                        className="form-control input-filter"
                                        selected={start}
                                        locale="pt-BR"
                                        dateFormat="dd/MM/yyyy"
                                        onChange={e => setStartDate(e)}
                                        selectsStart
                                        startDate={start}
                                        endDate={end}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label>Data Final  :</label>
                                    <DatePicker
                                        className="form-control input-filter"
                                        selected={end}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={e => setEndDate(e)}
                                        selectsEnd
                                        locale="pt-BR"
                                        startDate={start}
                                        endDate={end}
                                        minDate={start}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Projetos:</label>&nbsp;{projectId  ? <button className="btn pb-2"><i className="fa fa-remove" onClick={() => {
                                        onProjectChange("");
                                    }}></i></button> : ''}
                                    <select value={projectId} placeholder="Selecione um projeto..." className="form-control input-filter" onChange={onProjectChange}>
                                        <option key='' value='' disabled>Selecione um projeto...</option>
                                    {
                                        projectsSuccess ? projects.map(project => <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>) : ''
                                    }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Veículos de Imprensa:</label>&nbsp;{vehicleId ? <button className="btn pb-2"><i className="fa fa-remove" onClick={() => {
                                        onVehicleChange("");
                                    }}></i></button> : ''}
                                    <select value={vehicleId} placeholder="Selecione um veículo de imprensa..." className="form-control input-filter" onChange={onVehicleChange}>
                                        <option key='' value='' disabled>Selecione um veículo de imprensa...</option>
                                    {
                                        vehicleSuccess ? vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.site}
                                        </option>) : ''
                                    }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label>Palavras Chave:</label>&nbsp;{keyWordId  ? <button className="btn pb-2"><i className="fa fa-remove" onClick={() => {
                                        onKeywordChange("");
                                    }}></i></button> : ''}
                                    <select value={keyWordId} placeholder="Selecione uma palavra chave..." className="form-control input-filter" onChange={onKeywordChange}>
                                        <option key='' value='' disabled>Selecione uma palavra chave...</option>
                                    {
                                        keywordsSuccess ? keywords.map(key => <option key={key.id} value={key.id}>
                                            {key.value}
                                        </option>) : ''
                                    }
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label>Qtde Reg.:</label>&nbsp;{registerQuantity ? <button className="btn pb-2"><i className="fa fa-remove" onClick={() => {
                                        onRegisterQuantityChange("");
                                    }}></i></button> : ''}
                                    <select value={registerQuantity} placeholder="Quantidade de linhas export" className="form-control input-filter" onChange={onRegisterQuantityChange}>
                                        <option key='' value='' disabled>Quantidade de linhas export...</option>
                                        <option key={10} value={10}>10</option>
                                        <option key={20} value={20}>20</option>
                                        <option key={30} value={30}>30</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <button className="btn btn-block btn-primary button-config" onClick={() => {
                                    takeBody({start, end, projectId, keyWordId, vehicleId});
                                }}>Filtrar</button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary btn-block  button-config" value='' onClick={() => {
                                    onVehicleChange("");
                                    onProjectChange("");
                                    onKeywordChange("");
                                    onRegisterQuantityChange("");
                                    setStartDate(null);
                                    setEndDate(null);
                                }}>
                                    <span className="float-left"><i className="fa fa-remove"></i></span>Limpar Filtros
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary btn-block button-config" onClick={() => {
                                    takeExport({ qtde: registerQuantity, type: fileConstants.EXCEL })
                                }}>
                                    <span className="float-left"><i className="fa fa-file-excel-o"></i></span>Importar XLS
                                </button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary btn-block button-config" onClick={() => {
                                    takeExport({ qtde: registerQuantity, type: fileConstants.TEXT })
                                }}>
                                    <span className="float-left"><i className="fa fa-file-text"></i></span>Importar TXT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
}


export {NewsFilter}