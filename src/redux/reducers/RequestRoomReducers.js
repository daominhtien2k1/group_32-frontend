import {
    CREATE_REQUEST_ROOM_FAIL,
    CREATE_REQUEST_ROOM_REQUEST,
    CREATE_REQUEST_ROOM_SUCCESS,
    REQUEST_ROOM_LIST_FAIL,
    REQUEST_ROOM_LIST_REQUEST,
    REQUEST_ROOM_LIST_SUCCESS
} from '../constants/RequestConstants';

export const createRequestRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REQUEST_ROOM_REQUEST:
            return { loading: true };
        case CREATE_REQUEST_ROOM_SUCCESS:
            return { loading: false, success: true, request: action.payload };
        case CREATE_REQUEST_ROOM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const initRequests = {
    requests: []
};

export const requestRoomListReducer = (state = initRequests, action) => {
    switch (action.type) {
        case REQUEST_ROOM_LIST_REQUEST:
            return { loading: true, requests: [] };
        case REQUEST_ROOM_LIST_SUCCESS:
            return { loading: false, requests: action.payload };
        case REQUEST_ROOM_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
