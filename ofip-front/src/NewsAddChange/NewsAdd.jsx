import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vehicleActions } from './../actions/vehicleActions';
import { keywordActions } from './../actions/keywordActions';
import { newsActions } from './../actions/newsActions';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


function NewsAdd() {

    let [vehicleId, setVehicleId] = useState("");
    let [keyWordId, setKeyWordId] = useState("");
    let [internalBody, setInternalBody] = useState({});
    let [url, setUrl] = useState("");
    let [newsTitle, setTitle] = useState("");
    let [newsText, setText] = useState("");
    let [site, setSite] = useState("");
    let dispatch = useDispatch();

    // valores provenientes de dropdown
    // 1 - para veículos de imprensa
    let vehicles = useSelector(state => state.vehicle.vehicles);
    let vehicleSuccess = useSelector(state => state.vehicle.success);
    
    const onVehicleChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setVehicleId(value);
    }

    // 2 - para palavras chave
    let keywords = useSelector(state => state.keyword.keywords);
    let keywordsSuccess = useSelector(state => state.keyword.success);

    const onKeywordChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setKeyWordId(value);
    }

    const onTitleChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setTitle(value);
    }

    const onTextChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setText(value);
    }

    const onUrlChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setSite(vehicles.find((v) => value.includes(v.site.trim())) === undefined ? undefined : vehicles.find((v) => value.includes(v.site.trim())).site);
        setUrl(value);
    }

    const createNews = () => {
        let body = {
            text: newsText,
            url: url,
            vehicleId: parseInt(vehicleId, 10),
            keyWordId: parseInt(keyWordId,10),
            title: newsTitle
        }
        dispatch(newsActions.addNews(body));
    }

    const clearFields = () => {
        onVehicleChange("");
        onKeywordChange("");
        onTitleChange("");
        onTextChange("");
        onUrlChange("");
    }

    useEffect(() => {
        dispatch(vehicleActions.getVehicles(internalBody));
        dispatch(keywordActions.getKeywords(internalBody));
    },[])


    return (
        <div className="container">
             <div className="col-md-11 mx-auto">
                <h2 className="text-h2-config"><span className="mr-2"><i className="fa fa-newspaper-o"></i></span>Criar Notícia:</h2>
                <hr className="hr-config"/>
                <div className="card shadow-sm">
                <div className="card-header title-news-header filter-header-color">
                    <span className="float-left mr-2"><i className="fa fa-book"></i></span>Registrar notícia
                </div>
                <div className="card-body">
                <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Veículos de Imprensa:
                                        &nbsp;<OverlayTrigger placement="top"  delay={{ show: 250, hide: 400 }} overlay={renderTooltip}><span><i className="fa fa-plus"></i></span></OverlayTrigger>
                                        &nbsp;{vehicleId ? <span><i className="fa fa-remove" onClick={() => {
                                        onVehicleChange("");
                                    }}></i></span> : ''}</label>
                                    <select value={vehicleId} placeholder="Selecione um veículo de imprensa..." className="form-control input-filter" onChange={onVehicleChange}>
                                        <option key='' value='' disabled>Selecione um veículo de imprensa...</option>
                                    {
                                        vehicleSuccess ? vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.site}
                                        </option>) : ''
                                    }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Palavras Chave:&nbsp;{keyWordId  ? <span><i className="fa fa-remove" onClick={() => {
                                        onKeywordChange("");
                                    }}></i></span> : ''}</label>
                                    <select disabled={!vehicleId} value={keyWordId} placeholder="Selecione uma palavra chave..." className="form-control input-filter" onChange={onKeywordChange}>
                                        <option key='' value='' disabled>Selecione uma palavra chave...</option>
                                    {
                                        keywordsSuccess ? keywords.map(key => <option key={key.id} value={key.id}>
                                            {key.value}
                                        </option>) : ''
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label>URL da notícia:&nbsp;{url  ? <span><i className="fa fa-remove" onClick={() => {
                                            onUrlChange("");
                                    }}></i></span> : ''}</label>
                                    <input type="text" value={url} onChange={onUrlChange} readOnly={!keyWordId} placeholder="Cole sua URL aqui..." className="form-control input-filter"/>
                                </div>
                                <div className="col-md-12">
                                    <label>Título:&nbsp;{newsTitle  ? <span><i className="fa fa-remove" onClick={() => {
                                            onTitleChange("");
                                    }}></i></span> : ''}</label>
                                    <input type="text" value={newsTitle} onChange={onTitleChange} readOnly={!url || !site} placeholder="Descreva o título da notícia..." className="form-control input-filter"/>
                                </div>
                                <div className="col-md-12">
                                    <label>Texto:&nbsp;{newsText  ? <span><i className="fa fa-remove" onClick={() => {
                                            onTextChange("");
                                    }}></i></span> : ''}</label>
                                    <textarea type="text" value={newsText} onChange={onTextChange} disabled={!newsTitle} placeholder="Descreva o texto da notícia..." className="form-control input-filter"></textarea>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <button className="btn btn-block btn-primary button-config"
                                     disabled={!vehicleId || !keyWordId || !url || !newsTitle || !newsText}
                                     onClick={createNews}
                                    >
                                        Criar
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-block btn-primary button-config"
                                     disabled={!vehicleId || !keyWordId || !url || !newsTitle || !newsText}
                                     onClick={clearFields}
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </div>
                </div> 
                </div>
            </div>
        </div>
    )
}

function renderTooltip(props, content) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Adicionar
      </Tooltip>
    );
}

export {NewsAdd}