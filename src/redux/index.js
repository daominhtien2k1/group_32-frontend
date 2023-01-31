import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import { profileReducer, userLoginReducer } from './reducers/UserReducers';
import { buildingListReducer, createBuildingReducer, deleteBuildingReducer, updateBuildingReducer } from './reducers/BuildingReducers';
import {
    roomCategoryListReducer,
    createRoomCategoryListReducer,
    updateRoomCategoryListReducer,
    deleteRoomCategoryListReducer
} from './reducers/RoomCategoryReducers.js';
import { detailRoomReducer, roomFromBuiIDListReducer } from './reducers/RoomReducers';
import {
    createRequestRoomReducer,
    deleteRequestRoomReducer,
    requestRoomListReducer,
    updateRequestRoomStatusReducer
} from './reducers/RequestRoomReducers';
import { contractListReducer, updateContractReducer, updateContractStatusReducer } from './reducers/ContractReducers';
import { billListReducer, deleteBillReducer, updateBillReducer } from './reducers/BillReducers';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    customization: customizationReducer,
    userLogin: userLoginReducer,
    profile: profileReducer,
    buildingList: buildingListReducer,
    buildingCreate: createBuildingReducer,
    buildingUpdate: updateBuildingReducer,
    buildingDelete: deleteBuildingReducer,
    roomFromBuiIDList: roomFromBuiIDListReducer,
    roomDetail: detailRoomReducer,
    requestRoomCreate: createRequestRoomReducer,
    requestRoomList: requestRoomListReducer,
    requestRoomDelete: deleteRequestRoomReducer,
    requestRoomStatusUpdate: updateRequestRoomStatusReducer,
    contractList: contractListReducer,
    contractUpdate: updateContractReducer,
    contractUpdateStatus: updateContractStatusReducer,
    billList: billListReducer,
    billUpdate: updateBillReducer,
    billDelete: deleteBillReducer,
    roomCategoryList: roomCategoryListReducer,
    roomCategoryCreate: createRoomCategoryListReducer,
    roomCategoryUpdate: updateRoomCategoryListReducer,
    roomCategoryDelete: deleteRoomCategoryListReducer
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
