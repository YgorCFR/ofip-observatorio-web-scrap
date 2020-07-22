import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from './../actions/userActions';


function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    
    function handleLogout(e) {
        e.preventDefault();
        dispatch(userActions.logout());
    }

    return (
        <div>
           Home page
        </div>
    );
}


export {HomePage};