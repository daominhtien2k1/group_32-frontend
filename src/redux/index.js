import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer import
import customizationReducer from './reducers/customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    customization: customizationReducer
});

const initialState = {};

// ==============================|| REDUX - MAIN STORE ||============================== //
const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
