import  React  from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { newsActions } from './../actions/newsActions';
import { useDispatch, useSelector } from 'react-redux';
import { dateHelper } from './../helpers/date';
import { history } from './../helpers/history';



function NewsDetailPage() {

    let news = useSelector(state => state.newsDetail.details);
    let success = useSelector(state => state.newsDetail.success);
    let loadDetail = useSelector(state => state.newsDetail.loadDetail);
    let params = useParams();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(newsActions.getNewsDetail(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let backToMainNewsMenu = () => {
        history.push('/news');
    }

    return (
    <div className="container">
        <div className="col-md-12 mx-auto mb-3">
            <div className="row mb-3">
               <div className="col-md-11">
               <button className="float-left btn button-config" onClick={backToMainNewsMenu}><span><i className="fa fa-arrow-left" aria-hidden="true">&nbsp;Voltar</i>
               </span></button>
               </div>
            </div>
            {
                    loadDetail ? <span className="spinner-border spinner-border-sm mr-1"></span> : ''
            }
            { success ? <div id={news.id} key={news.id} value={news.id} className="card shadow-sm">
                <div className="card-header title-news-header filter-header-color">
        <span className="float-left mr-2"><i class="fa fa-search" aria-hidden="true"></i></span>{news.title}<span className="float-right">Data:{dateHelper.formatDate(news.date)}</span>
                </div>
                <div className="card-body news-text-detail">
                <p className="title-news-header mt-3"><span className="text-primary" style={{'font-size': '20px'}}><a target="_blank" href={news.url}>
                    <span className="mr-2"><i class="fa fa-globe" aria-hidden="true"></i></span>acesse o site</a></span></p>
                    <span className="float-left mr-2"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>{news.text}
                </div>
            </div> : ''}
        </div>
    </div>
    );
}



export  { NewsDetailPage }