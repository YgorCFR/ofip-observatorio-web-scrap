import React, { useState, useEffect } from "react";
import { userActions } from './../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import loginImage from '../assets/img/ofip-logo.png';
import '../styles/general.css';


function LoginPage() {
    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const alert = useSelector(state => state.alert.type);
    const message = useSelector(state => state.alert.message);
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    // reset login status
    useEffect(() => { 
        dispatch(userActions.clearCredentials());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        dispatch(userActions.login(username, password));
      };

    const handleGoToRegister = e => {
        e.preventDefault();
        dispatch(userActions.goToRegisterUser());
    }

    return (
        <div className="container">
            <div className="col-md-4 mx-auto mt-5">
                <div className="shadow card p-3">
                    <div className="justify-content-center">
                        <img alt="ofip" className="img-fluid mb-4" src={loginImage}></img>
                    </div>
                    <form>
                        {
                            alert === 'alert-danger' && message && 
                            <div className="alert alert-danger" role="alert">
                                <strong>Erro:</strong>{message}
                            </div>      
                        }
                        <div className="form-group">
                            <label>Usuário:</label>
                            <input type="text" placeholder="Usuário" value={username} onChange={onUsernameChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')}/>
                            {submitted && !username &&
                                            <div className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-group mb-4">
                            <label>Senha:</label>
                            <input type="password" placeholder="Senha" value={password} onChange={onPasswordChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                                            <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <button type="submit" className="btn btn-block btn-success button-config" onClick={handleSubmit}>
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Entrar&nbsp;<span className="float-left"><i className="fa fa-sign-in"></i></span>
                        </button>
                        <button className="btn btn-block btn-success button-config" onClick={handleGoToRegister} >
                        Cadastrar-se&nbsp;<span className="float-left"><i className="fa fa-user-plus"></i></span>
                        </button>
                        <button className="btn btn-block btn-danger button-config">
                        Esqueci minha senha&nbsp;<span className="float-left"><i className="fa fa-warning"></i></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export {LoginPage};