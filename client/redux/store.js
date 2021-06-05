import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import houseReducer from './reducers/houseReducer';
import listReducer from './reducers/listReducer';
import favoritesReducer from './reducers/favoritesReducer';
const rootReducer = combineReducers({
    favorites: favoritesReducer,
    list: listReducer,
    auth: authReducer,
    house: houseReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);