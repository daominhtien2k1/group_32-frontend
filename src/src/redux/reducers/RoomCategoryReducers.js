import {
    ROOM_CATEGORY_LIST_REQUEST,
    ROOM_CATEGORY_LIST_SUCCESS,
    ROOM_CATEGORY_LIST_FAIL,
    ROOM_CATEGORY_CREATE_REQUEST,
    ROOM_CATEGORY_CREATE_SUCCESS,
    ROOM_CATEGORY_CREATE_FAIL,
    ROOM_CATEGORY_DELETE_FAIL,
    ROOM_CATEGORY_DELETE_REQUEST,
    ROOM_CATEGORY_DELETE_SUCCESS,
    ROOM_CATEGORY_DETAIL_FAIL,
    ROOM_CATEGORY_DETAIL_REQUEST,
    ROOM_CATEGORY_DETAIL_SUCCESS,
    ROOM_CATEGORY_UPDATE_FAIL,
    ROOM_CATEGORY_UPDATE_REQUEST,
    ROOM_CATEGORY_UPDATE_SUCCESS
} from '../constants/RoomCategoryConstants.js';

const initRoomCategory = {
    roomsCategory: []
};
export const roomCategoryListReducer = (state = initRoomCategory, action) => {
    switch (action.type) {
        case ROOM_CATEGORY_LIST_REQUEST:
            return { loading: true, roomsCategory: [] };
        case ROOM_CATEGORY_LIST_SUCCESS:
            return { loading: false, success: true, roomsCategory: [...action.payload] };
        case ROOM_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload, roomsCategory: [] };
        default:
            return state;
    }
};

export const createRoomCategoryListReducer = (state = {}, action) => {
    switch (action.type) {
        case ROOM_CATEGORY_CREATE_REQUEST:
            return { ...state, loading: true };
        case ROOM_CATEGORY_CREATE_SUCCESS:
            // let newRoomCategory = { ...action.payload };
            return { loading: false, success: true };
        case ROOM_CATEGORY_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateRoomCategoryListReducer = (state = initRoomCategory, action) => {
    switch (action.type) {
        case ROOM_CATEGORY_UPDATE_REQUEST:
            return { ...state, loading: true };
        case ROOM_CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, roomCategory: { ...action.payload } };
        case ROOM_CATEGORY_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteRoomCategoryListReducer = (state = initRoomCategory, action) => {
    switch (action.type) {
        case ROOM_CATEGORY_DELETE_REQUEST:
            return { ...state, loading: true };
        case ROOM_CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ROOM_CATEGORY_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
