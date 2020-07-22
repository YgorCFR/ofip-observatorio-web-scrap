import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from './actions';
import { a } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { history } from './helpers/history';
import { PrivateRoute } from './components/PrivateRoute';
import { RegisterPage } from './RegisterPage';
import { NewsPage } from './NewsPage';
import { NewsDetailPage } from './NewsDetailPage';
import { useEffect } from 'react';
import { appActions } from './actions/appActions';
import  imgOfip  from './assets/img/ofip-logo.png';
import  imgUff from './assets/img/logo-padrao-branco.png';
import { Vehicle } from './Vehicle';
import { Keyword } from './Keyword';
import { userActions } from './actions/userActions';
import { NewsAdd } from './NewsAddChange/NewsAdd';
import { NewsChange } from './NewsAddChange/NewsChange';

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.checkIfUserIsSignedIn());
  })

  function handleLogout(e) {
    e.preventDefault();
    dispatch(userActions.logout());
  }

  return (
    <div className="App">
      <nav id="item-primary" className="navbar navbar-expand-lg mb-2">
        <div className="nav-item-config">
          <a className="navbar-brand" href="http://uff.br/" ><img alt="uff" width="100" className="img-fluid" src={imgUff}></img></a>
        </div>
        <div className="navbar-collapse justify-content-center" id="navbarNavTop">
          <ul className="navbar-nav mr-auto"></ul>
          {isLogged &&  <ul className="navbar-nav float-right">
  <li className="nav-item" style={{color: '#ffffff', fontSize: '12px'}}>Olá,&nbsp;{user}&nbsp;&nbsp;<span className="user-icon" onClick={handleLogout}><i className="fa fa-sign-out"></i></span></li>
          </ul> }
        </div>
      </nav>
      <div className="container">
          { isLogged &&     
        //     <div><h1>Counter {counter}</h1> 
          
        //    <button onClick={() => dispatch(counterActions.increment(5))}>+</button> 
          
        //     <button onClick={() => dispatch(counterActions.decrement())}>-</button>  
        // </div>
        <div>
          <div className="row">
            <div className="col-md-4 float-left">
            <a className="navbar-brand"><img alt="ofip"  className="img-fluid mb-4" src={imgOfip}></img></a>
            </div>
          </div>
          <nav id="item-secondary" className="navbar navbar-expand-lg navbar-light mb-5">
            <button className="navbar-toggler nav-bar-button"  type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav"></ul>
              <ul className="navbar-nav mx-auto ul-config-navbar">
                <li className="nav-item">
                  <a className="nav-link" style={{color: window.location.pathname === "/" || window.location.pathname === "" ? '#d4b105' : ''}} href="/">Página inicial</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{color: window.location.pathname === "/news" ? '#d4b105' : ''}} href="/news">Notícias</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{color: window.location.pathname === "/keyword" ? '#d4b105' : ''}} href="/keyword">Palavras Chave</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{color: window.location.pathname === "/vehicle" ? '#d4b105' : ''}} href="/vehicle">Veículos de Imprensa</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
          }
          <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/news" component={NewsPage} />
                <Route path="/news-detail/:id" component={NewsDetailPage}/>
                <Route path="/keyword" component={Keyword} />
                <Route path="/vehicle" component={Vehicle} />
                <Route path="/add-news" component={NewsAdd} />
                <Route path="/update-news/:id" component={NewsChange} />
                <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
    </div>
  );
}

export default App;
