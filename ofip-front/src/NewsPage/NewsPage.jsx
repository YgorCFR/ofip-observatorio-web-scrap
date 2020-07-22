import  React  from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsActions } from './../actions/newsActions';
import { newsConstants } from './../constants/newsConstants';
import { useState } from 'react';
import { dateHelper } from './../helpers/date';
import { NewsFilter } from './NewsFilter';
import { fileConstants } from './../constants/fileConstants';
import { history } from './../helpers/history';

function NewsPage() {

    let news = useSelector(state => state.newsHeader.headers);
    let success = useSelector(state => state.newsHeader.success);
    let loadHeader = useSelector(state => state.newsHeader.loadHeader);
    let page = useSelector(state => state.newsPaging);
    let [exp, setExp] = useState("");
    let [currentPage, setPage] = useState(0);
    let [rowId, setRowId] = useState({}, useEffect(() => {
        console.log(rowId);
    }));
    let [body, setBody] = useState({}, useEffect(() => {
        console.log(body);
    }));
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(newsActions.getNewsHeader(0, body));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handlePagination = (e) => {
        if (e.target.value === newsConstants.INCREMENT) {
            setPage(++currentPage);
            dispatch(newsActions.getNewsHeader(currentPage, body));
        }
        else {
            setPage(currentPage <= 0 ? 0 : --currentPage);
            dispatch(newsActions.getNewsHeader(currentPage, body));
        }
        
    }

    const handleQueryParam = (result) => {
        if (result.start) {
            result.start = dateHelper.formatDateYYMMDD(result.start.toString());
        }
        if (result.end) {
            result.end = dateHelper.formatDateYYMMDD(result.end.toString());
        }
        console.log(result);
        setBody(result);
        dispatch(newsActions.getNewsHeader(currentPage, result));
    }

    const handleExport = (exportation) => {
        setExp(exportation.qtde);
        if (exportation.type === fileConstants.EXCEL) {
            newsActions.exportNewsXls(exportation.qtde, currentPage, body);
        }
        else if (exportation.type === fileConstants.TEXT) {
            newsActions.exportNewsTxt(exportation.qtde, currentPage, body);
        }
    }

    

    const onRedirectToDetail = (e) => {
        if (e.target.value) {
            history.push(`news-detail/${e.target.value}`);
        }
    }

    const onRedirectToCreate = () => {
        history.push(`/add-news`);
    }

    const onRedirectToUpdate = (e) => {
        if (e.target.value) {
            history.push(`/update-news/${e.target.value}`);
        }
    }

    return (
        <div>
            <div className="container">
            <div className="col-md-10 mx-auto">
                <h2 className="text-h2-config"><span className="mr-2"><i className="fa fa-newspaper-o"></i></span>Notícias:</h2>
                <hr className="hr-config"/>
            </div>
            <NewsFilter takeBody={result => handleQueryParam(result)} takeExport={exportation => handleExport(exportation)}></NewsFilter>
                {
                    loadHeader ? <span className="spinner-border spinner-border-sm mr-1"></span> : ''
                }
                {
                    success ? <div className="col-md-10 mx-auto mb-4">
                        <button className="float-left btn button-config" onClick={onRedirectToCreate}><span><i className="fa fa-plus" aria-hidden="true">&nbsp;Nova Notícia</i>
                        </span></button>
                    <br></br></div> : ''
                }
                {
                    success ? (news.length > 0 ? 
                news.map(n => <div id={n.id} key={n.id} value={n.id} style={{cursor: 'pointer'}} className="col-md-10 mx-auto mb-3">
                    <div className="card shadow-sm">
                        <div className="card-header title-news-header">
                            {n.title}<span className="float-right">{dateHelper.formatDate(n.date)}</span>
                        </div>
                        <div className="card-body">
                            {n.site}
                            <button value={n.id} className="btn float-right button-config" onClick={onRedirectToDetail}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
                            <button value={n.id} className="float-right btn button-config mr-1" onClick={onRedirectToUpdate}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                            <button value={n.id} className="btn float-right button-config mr-1" onClick={() => {
                                newsActions.deleteNews(n.id, currentPage, body).then(
                                    res => {
                                        if (res.type === newsConstants.NEWS_DEL_SUCCESS) {
                                            dispatch(newsActions.getNewsHeader(currentPage, body));
                                        }
                                    }
                                );
                            }}><i className="fa fa-remove" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>) : 
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <p className="text-center">Não há notícias disponíveis nessa filtragem</p>
                        </div>
                    </div>
                 ) : 
                ''}
                {success ? <div className="row justify-content-center">
                        <div className="col-md-3">
                            <button value={newsConstants.DECREMENT} className="btn btn-primary btn-block button-config" onClick={handlePagination} ><i className="fa fa-angle-left"></i></button>
                        </div>
                        <div className="col-md-3">
                            <button value={newsConstants.INCREMENT} className=" btn btn-primary btn-block button-config" disabled={news.length === 0} onClick={handlePagination}><i className="fa fa-angle-right"></i></button>
                        </div>
                </div> : ''}
            </div>
        </div>
    );
}


export {NewsPage}