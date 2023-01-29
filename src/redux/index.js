import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import { userLoginReducer } from './reducers/UserReducers';
import { buildingListReducer, deleteBuildingReducer } from './reducers/BuildingReducers';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    customization: customizationReducer,
    userLogin: userLoginReducer,
    buildingList: buildingListReducer,
    buildingDelete: deleteBuildingReducer
});

const userInfoFromLocalStogare = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: {
        status: 'From local storage',
        userInfo: userInfoFromLocalStogare
    }
};

// ==============================|| REDUX - MAIN STORE ||============================== //
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
