import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import allReducers from './../reducers/index';

export const store = createStore(
    allReducers,
    applyMiddleware(
        thunkMiddleware
    )
)
