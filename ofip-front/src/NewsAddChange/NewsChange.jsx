import React, { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { newsActions } from './../actions/newsActions';
import { newsConstants } from './../constants/newsConstants';


function NewsChange() {

    let [displayForm, setDisplay] = useState(false);
    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [primaryTitle, setPrimaryTitle] = useState("");
    let [primaryText, setPrimaryText] = useState("");
    let params = useParams();
    let dispatch = useDispatch();
    
    useEffect(() => {
       newsActions.getNewsForEdit(params.id).then(res => {
            console.log(res);
            if (res.type === newsConstants.DETAIL_SUCCESS) {
                setTitle(res.payload.title);
                setText(res.payload.text);
                setPrimaryText(res.payload.text);
                setPrimaryTitle(res.payload.title);
                setDisplay(true);
            }
       });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onTitleChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setTitle(value);
    }

    const onTextChange = (e) => {
        let value = e.target == null ? "" : e.target.value;
        setText(value);
    }

    const clearFields = () => {
        onTitleChange("");
        onTextChange("");
    }

    const editNews = () => {
        let body = {
            title: title,
            text: text
        }
        dispatch(newsActions.updateNews(body, params.id));
        console.log(primaryText);
        
    }

    return (
        <div className="container">
            <div className="col-md-11 mx-auto">
                <h2 className="text-h2-config"><span className="mr-2"><i className="fa fa-edit"></i></span>Editar Notícia:</h2>
                <hr className="hr-config"/>
            
            <div className="card shadow-sm">
                <div className="card-header title-news-header filter-header-color">
                    <span className="float-left mr-2"><i className="fa fa-book"></i></span>Atualizar notícia
                </div>
                <div className="card-body">
                    {displayForm ?  <div className="row mt-2">
                                <div className="col-md-12">
                                    <label>Título:&nbsp;{title  ? <span><i className="fa fa-remove" onClick={() => {
                                            onTitleChange("");
                                    }}></i></span> : ''}</label>
                                    <input type="text" value={title} onChange={onTitleChange} placeholder="Descreva o título da notícia..." className="form-control input-filter"/>
                                </div>
                                <div className="col-md-12">
                                    <label>Texto:&nbsp;{text  ? <span><i className="fa fa-remove" onClick={() => {
                                            onTextChange("");
                                    }}></i></span> : ''}</label>
                                    <textarea type="text" value={text} onChange={onTextChange} disabled={!title} placeholder="Descreva o texto da notícia..." className="form-control input-filter"></textarea>
                                </div>
                            </div>  : ''}
                    {displayForm ?  <div className="row mt-2">
                                <div className="col-md-3">
                                    <button className="btn btn-block btn-primary button-config"
                                     disabled={!text || !title || ((text === primaryText) && (title === primaryTitle))}
                                     onClick={editNews}
                                    >
                                        Editar
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-block btn-primary button-config"
                                     disabled={!text || !title || ((text === primaryText) && (title === primaryTitle)) }
                                     onClick={clearFields}
                                    >
                                        Limpar
                                    </button>
                                </div>
                            </div> : ''}    

                </div>
            </div>
            </div>
        </div>
    )
}

export {NewsChange}