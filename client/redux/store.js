import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import houseReducer from './reducers/houseReducer';
import listReducer from './reducers/listReducer';
const rootReducer = combineReducers({
    auth: authReducer,
    house: houseReducer,
    product: listReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);