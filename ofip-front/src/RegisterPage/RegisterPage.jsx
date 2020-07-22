import  React, { useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from './../actions/userActions';
import { useEffect } from 'react';
import { profileActions } from './../actions/profileActions';



function RegisterPage() {
    const [submitted, setSubmitted] = useState(false);
    
    const [email, setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    
    const [cpf, setCpf] = useState("");
    
    const [name, setName] = useState("");
    
    const [profileId, setProfile] = useState("");
    
    const profiles = useSelector(state => state.profile.profiles);
    const profilesSuccess = useSelector(state => state.profile.success);

    const registering = useSelector(state => state.register.registering);

    const alert = useSelector(state => state.alert.type);
    const message = useSelector(state => state.alert.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileActions.getAllProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // mudança de valor de email
    const onEmailChange = (e) =>  setEmail(e.target.value);
    // mudança de valor de senha
    const onPasswordChange = (e) => setPassword(e.target.value);
    // mudança de valor de cpf
    const onCpfChange = (e) => setCpf(e.target.value);
    // mudança de valor de nome
    const onNameChange = (e) => setName(e.target.value);
    // mudança de valor de perfil
    const onProfileChange = (e) => setProfile(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        let body = {
            email: email,
            password: password,
            cpf: cpf,
            name: name,
            profileId: profileId
        };

        body.profileId = parseInt(body.profileId,10);

        dispatch(userActions.validatePassword(body.password));
       
        setSubmitted(true);
        if (body.email && body.password && body.cpf && body.name && body.name && body.profileId) {
            dispatch(userActions.registerUser(body));
        }
    };

    const backToLogin = () => {
        dispatch(userActions.backToLogin());
    }
    
    return (
        <div className="container">
            <div className="col-md-6 mx-auto mt-5">
                <div className="shadow card p-3">
                    <div className="justify-content-center text-center">
                        <h4>Registro de usuário</h4>
                    </div>
                    <form>
                        {
                            alert === 'alert-danger' && message && 
                            <div className="alert alert-danger" role="alert">
                                <strong>Erro:</strong>{message}
                            </div>      
                        }
                        <div className="form-group">
                        <label>Email:</label>
                        <input type="text" placeholder="Email" value={email} onChange={onEmailChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')}/>
                        {submitted && !email &&
                                        <div className="invalid-feedback">Email é obrigatório</div>
                        }
                        </div>
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" placeholder="Nome completo" value={name} onChange={onNameChange} className={'form-control' + (submitted && !name ? ' is-invalid' : '')} />
                            {submitted && !name &&
                                            <div className="invalid-feedback">Nome é obrigatório</div>
                            }
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>CPF:</label>
                                    <input type="text" placeholder="CPF" value={cpf} onChange={onCpfChange} className={'form-control' + (submitted && !cpf ? ' is-invalid' : '')} />
                                    {submitted && !cpf &&
                                                    <div className="invalid-feedback">CPF é obrigatório</div>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label>Senha:</label>
                                    <input type="password" placeholder="Senha" value={password} onChange={onPasswordChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                     {submitted && !password &&
                                                    <div className="invalid-feedback">Senha é obrigatória</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                                <label>Perfil:</label>
                                <select value={profileId} placeholder="Selecione um perfil..." onChange={onProfileChange} className={'form-control' + (submitted && !profileId ? ' is-invalid' : '')}>
                            <option value='' key='' disabled>Selecione um perfil...</option>
                            {
                                profilesSuccess ? profiles.map(profile => <option value={profile.id} key={profile.id}>{profile.name}</option>) : <option>Carregando...</option>
                            }
                            </select>
                            {submitted && !profileId &&
                                                    <div className="invalid-feedback">Perfil é obrigatório</div>
                                    }
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-block" onClick={backToLogin}>
                                    Voltar&nbsp;<span className="float-left"><i className="fa fa-arrow-left"></i></span>
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-block button-config" onClick={handleSubmit}>
                                    {
                                        registering && <span className="spinner-border spinner-border-sm mr-1"></span>
                                    }
                                    Cadastrar&nbsp;<span className="float-left"><i className="fa fa-user-plus"></i></span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export {RegisterPage}