import { ROOM_FROM_BUIID_LIST_FAIL, ROOM_FROM_BUIID_LIST_REQUEST, ROOM_FROM_BUIID_LIST_SUCCESS } from '../constants/RoomConstants';

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
