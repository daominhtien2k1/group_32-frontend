import {
    BUILDING_CREATE_FAIL,
    BUILDING_CREATE_REQUEST,
    BUILDING_CREATE_SUCCESS,
    BUILDING_DELETE_FAIL,
    BUILDING_DELETE_REQUEST,
    BUILDING_DELETE_SUCCESS,
    BUILDING_LIST_FAIL,
    BUILDING_LIST_REQUEST,
    BUILDING_LIST_SUCCESS,
    BUILDING_UPDATE_FAIL,
    BUILDING_UPDATE_REQUEST,
    BUILDING_UPDATE_SUCCESS
} from '../constants/BuildingConstants';

const initBuildings = {
    buildings: []
};

export const buildingListReducer = (state = initBuildings, action) => {
    switch (action.type) {
        case BUILDING_LIST_REQUEST:
            return { loading: true, buildings: [] };
        case BUILDING_LIST_SUCCESS:
            return { loading: false, buildings: action.payload };
        case BUILDING_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createBuildingReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_CREATE_REQUEST:
            return { loading: true };
        case BUILDING_CREATE_SUCCESS:
            return { loading: false, success: true };
        case BUILDING_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateBuildingReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_UPDATE_REQUEST:
            return { loading: true };
        case BUILDING_UPDATE_SUCCESS:
            return { loading: false, success: true, building: action.payload };
        case BUILDING_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteBuildingReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_DELETE_REQUEST:
            return { loading: true };
        case BUILDING_DELETE_SUCCESS:
            return { loading: false, success: true };
        case BUILDING_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
