import {
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
    ROOM_FROM_BUIID_LIST_FAIL,
    ROOM_FROM_BUIID_LIST_REQUEST,
    ROOM_FROM_BUIID_LIST_SUCCESS
} from '../constants/RoomConstants';

const initRoomsFromBuiID = {
    rooms: []
};

export const roomFromBuiIDListReducer = (state = initRoomsFromBuiID, action) => {
    switch (action.type) {
        case ROOM_FROM_BUIID_LIST_REQUEST:
            return { loading: true, rooms: [] };
        case ROOM_FROM_BUIID_LIST_SUCCESS:
            return { loading: false, rooms: action.payload };
        case ROOM_FROM_BUIID_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const detailRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case ROOM_DETAIL_REQUEST:
            return { loading: true, room: [] };
        case ROOM_DETAIL_SUCCESS:
            return { loading: false, room: action.payload };
        case ROOM_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
