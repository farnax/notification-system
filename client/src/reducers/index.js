import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer.js';
import fileReducer from './fileReducer.js';
import optionReducer from './optionReducer.js';

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    options: optionReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
