import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import { studentLoginReducer } from './reducers/StudentReducers';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    customization: customizationReducer,
    studentLogin: studentLoginReducer
});

const studentInfoFromLocalStogare = localStorage.getItem('studentInfo') ? JSON.parse(localStorage.getItem('studentInfo')) : null;

const initialState = {
    studentLogin: {
        status: 'From local storage',
        studentInfo: studentInfoFromLocalStogare
    }
};

// ==============================|| REDUX - MAIN STORE ||============================== //
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
