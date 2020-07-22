
import { makeQueryString } from './../helpers/requests';
import { newsConstants } from './../constants/newsConstants';
import { alertConstants } from './../constants/alertConstants';
import { newsService } from './../services/newsService';
import { userData } from './../helpers/userData';
import { alertActions } from './alertActions';
import  Swal  from 'sweetalert2';

export const newsActions = {
    getNewsHeader,
    exportNewsXls,
    exportNewsTxt,
    getNewsDetail,
    addNews,
    updateNews,
    deleteNews,
    getNewsForEdit
}


function getNewsHeader(page, filter) {
    return dispatch => {
        filter.key = filter.key === undefined ? userData.userDataParsed('key') : filter.key;
        let queryString = makeQueryString(filter);
        console.log(queryString);
        dispatch({type: newsConstants.HEADER_REQUEST});
        newsService.getNewsHeader(page, queryString)
            .then( news => {
                let data = news.data.data.news;
                console.log(data);
                dispatch({type: newsConstants.HEADER_SUCCESS, payload: data });
            }).catch(err => 
                {
                    console.log(err.response);
                    let message = err.response === undefined ? err : err.response.data;
                    dispatch({type: newsConstants.HEADER_ERROR});
                    dispatch({type: alertConstants.ERROR, message: message});
                });

    }
}

function getNewsDetail(id) {
    return dispatch => {
        let queryString = makeQueryString({key: userData.userDataParsed('key')});
        dispatch({type: newsConstants.DETAIL_REQUEST});
        newsService.getNewsDetail(id, queryString)
            .then(news => {
                let data = news.data.data.news.shift();
                console.log(data);
                dispatch({type: newsConstants.DETAIL_SUCCESS, payload: data});
            }).catch(err => {
                console.log(err.response);
                let message = err.response === undefined ? err : err.response.data;
                dispatch({type: newsConstants.DETAIL_ERROR});
                dispatch({type: alertConstants.ERROR, message: message});
            })
    }
}


function getNewsForEdit(id) {
        let queryString = makeQueryString({key: userData.userDataParsed('key')});
        return new Promise(
            function (resolve, reject) {
                newsService.getNewsDetail(id, queryString)
                    .then(news => {
                        let data = news.data.data.news.shift();
                        console.log(data);
                        resolve(fillEditFields({type: newsConstants.DETAIL_SUCCESS, payload: data}));
                        
                    }).catch(err => {
                        console.log(err.response);
                        let message = err.response === undefined ? err : err.response.data;
                        resolve(blockEditFields({type: alertConstants.ERROR, message: message}))
                    })
            })
}

function fillEditFields (body) {
    return body;
}

function blockEditFields (error) {
    return error;
}


function addNews (body) {
    let queryString = makeQueryString({key: userData.userDataParsed('key')});
    return dispatch => {
        newsService.addNews(body, queryString)
            .then(news => {
                    console.log(news);
                    if (news.data.success) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Notícia cadastrada com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'Confirma'
                        });
                    }
                    dispatch(success());  
                    dispatch(alertActions.clear());
                
            })
            .catch(err => {
                console.log(err.response);
                if (err.response) {
                    Swal.fire({
                        title: 'Erro',
                        text: err.response,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
                let message = err.response;
                dispatch(failure());
                dispatch({type: alertConstants.ERROR, message: message});
            })
    }
    function success() { return { type: newsConstants.NEWS_ADD_SUCCESS } }
    function failure() { return { type: newsConstants.NEWS_ADD_FAIL } }
}

function updateNews (body, id) {
    let queryString = makeQueryString({key: userData.userDataParsed('key')});
    return dispatch => {
        newsService.updateNews(body, queryString, id)
           .then(news => {
                    console.log(news);
                    if (news.data.success) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Notícia atualizada com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'Confirma'
                        });
                    }
                    dispatch(success());  
                    dispatch(alertActions.clear());
                
            })
            .catch(err => {
                console.log(err.response);
                if (err.response) {
                    Swal.fire({
                        title: 'Erro',
                        text: err.response,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
                let message = err.response;
                dispatch(failure());
                dispatch({type: alertConstants.ERROR, message: message});
            })
    }
        function success() { return { type: newsConstants.NEWS_CHANGE_SUCCESS } }
        function failure() { return { type: newsConstants.NEWS_CHANGE_FAIL } }
}

function deleteNews (id, page, filter) {
    let queryString = makeQueryString({key: userData.userDataParsed('key')});
    console.log(id);
    return new Promise (
        
        function (resolve, reject){

                Swal.fire({
                    title: 'Você tem certeza?',
                    text: "Você não poderá reverter esta ação!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, deletar'
                }).then((result) => {
                    if (result.value) {
                        newsService.deleteNews(queryString, id)
                        .then(news => {
                            if (news.data.success) {
                                Swal.fire(
                                    'Deletado!',
                                    'A notícia foi deletada.',
                                    'success'
                                )
                                resolve(success());
                            }

                        })
                        .catch(err => {
                            console.log(err.response);
                            if (err.response) {
                                Swal.fire({
                                    title: 'Erro',
                                    text: err.response,
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                            let message = err.response;
                            resolve(failure());
                        })
                    }
                });
            })
            function success() { return { type: newsConstants.NEWS_DEL_SUCCESS } }
            function failure() { return { type: newsConstants.NEWS_DEL_FAIL } }
    
}

function exportNewsXls(size, page, filter) {
    filter.key = filter.key === undefined ? userData.userDataParsed('key') : filter.key;
    let queryString = makeQueryString(filter);
    newsService.exportExcelNewsHeader(size ? size : 10, page, queryString);
}

function exportNewsTxt(size, page, filter) {
    filter.key = filter.key === undefined ? userData.userDataParsed('key') : filter.key;
    let queryString = makeQueryString(filter);
    newsService.exportTxtNewsHeader(size ? size : 10, page, queryString);
}
