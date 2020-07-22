import React from "react";
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute  = ({ component: Component, ...rest}) => (
    <Route { ...rest} render={props => (
        diff_minutes()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: { from: props.location} }}/>    
    )} />
)



const diff_minutes = () => 
{
    let time = new Date(JSON.parse(localStorage.getItem('expiration')));
    let now  = new Date();    
    let diff =(time.getTime() - now.getTime()) / 1000;
    diff /= 60;
    let result = Math.round(diff);
    if (result <= 0)  {
        localStorage.clear();
    }
    console.log(result);
    return localStorage.getItem('token');
}