import {
    ROOM_FROM_BUIID_LIST_FAIL,
    ROOM_FROM_BUIID_LIST_REQUEST,
    ROOM_FROM_BUIID_LIST_SUCCESS,
    ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,
    ROOM_CREATE_REQUEST,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_UPDATE_REQUEST,
    ROOM_UPDATE_SUCCESS,
    ROOM_UPDATE_FAIL,
    ROOM_DELETE_REQUEST,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_FAIL,
    ROOM_DETAIL_BY_ID_REQUEST,
    ROOM_DETAIL_BY_ID_SUCCESS,
    ROOM_DETAIL_BY_ID_FAIL
} from '../constants/RoomConstants';

const initStateRoom = {
    rooms: [],
    room: null
};

export const roomFromBuiIDListReducer = (state = initStateRoom, action) => {
    switch (action.type) {
        case ROOM_FROM_BUIID_LIST_REQUEST:
            return { ...state, loading: true, rooms: [] };
        case ROOM_FROM_BUIID_LIST_SUCCESS:
            return { loading: false, rooms: action.payload };
        case ROOM_FROM_BUIID_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const roomListReducer = (state = initStateRoom, action) => {
    switch (action.type) {
        // get list
        case ROOM_LIST_REQUEST:
            return { loading: true, rooms: [] };
        case ROOM_LIST_SUCCESS:
            return { loading: false, rooms: [...action.payload] };
        case ROOM_LIST_FAIL:
            return { loading: false, error: action.payload };

        //get detail
        case ROOM_DETAIL_BY_ID_REQUEST:
            return { ...state, loading: true, room: null };
        case ROOM_DETAIL_BY_ID_SUCCESS:
            console.log('payload:', action.payload);
            return { ...state, loading: false, room: { ...action.payload } };
        case ROOM_DETAIL_BY_ID_FAIL:
            return { ...state, loading: false, error: action.payload };

        // create
        case ROOM_CREATE_REQUEST:
            return { ...state, loading: true };
        case ROOM_CREATE_SUCCESS:
            console.log(action.payload);
            let tmpRoomListCreate = [...state.rooms];
            tmpRoomListCreate.unshift({ ...action.payload });
            return { loading: false, rooms: [...tmpRoomListCreate] };

        case ROOM_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };

        // update
        case ROOM_UPDATE_REQUEST:
            return { ...state, loading: true };
        case ROOM_UPDATE_SUCCESS:
            let tmpRoomListUpdate = [...state.rooms];
            let indexUpdate = tmpRoomListUpdate.findIndex((room) => room.id === action.payload.id);
            tmpRoomListUpdate[indexUpdate] = { ...action.payload };
            return { loading: false, rooms: [...tmpRoomListUpdate] };

        case ROOM_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };

        // delete
        case ROOM_DELETE_REQUEST:
            return { ...state, loading: true };
        case ROOM_DELETE_SUCCESS:
            let tmpRoomListDelete = [...state.rooms];
            let indexDelete = tmpRoomListDelete.findIndex((room) => room.id === action.payload);
            if (indexDelete !== -1) {
                tmpRoomListDelete.splice(indexDelete, 1);
            }
            return { loading: false, rooms: [...tmpRoomListDelete] };
        case ROOM_DELETE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// export const roomDetailReducer = (state = initStateRoom, action) => {
//     switch (action.type) {
//         case ROOM_DETAIL_BY_ID_REQUEST:
//             return { ...state, loading: true };
//         case ROOM_DETAIL_BY_ID_SUCCESS:
//             return { ...state, loading: false, room: { ...action.payload } };
//         case ROOM_DETAIL_BY_ID_FAIL:
//             return { loading: false, error: action.payload };

//         default:
//             return state;
//     }
// };

// export const createRoomReducer = (state = initStateRoom, action) => {
//     switch (action.type) {
//         case ROOM_CREATE_REQUEST:
//             return { ...state, loading: true };
//         case ROOM_CREATE_SUCCESS:
//             let tmpRoomList = [...state.rooms];
//             tmpRoomList.unshift({ ...action.payload });
//             return { loading: false, rooms: [...tmpRoomList] };
//         case ROOM_CREATE_FAIL:
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };
// export const updateRoomReducer = (state = initStateRoom, action) => {
//     switch (action.type) {
//         case ROOM_UPDATE_REQUEST:
//             return { ...state, loading: true };
//         case ROOM_UPDATE_SUCCESS:
//             let tmpRoomList = [...state.rooms];
//             let index = tmpRoomList.findIndex((room) => room.id === action.payload.id);
//             tmpRoomList[index] = { ...action.payload };
//             return { loading: false, rooms: [...tmpRoomList] };
//         case ROOM_UPDATE_FAIL:
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };

// export const deleteRoomReducer = (state = initStateRoom, action) => {
//     switch (action.type) {
//         case ROOM_DELETE_REQUEST:
//             return { ...state, loading: true };
//         case ROOM_DELETE_SUCCESS:
//             let tmpRoomList = [...state.rooms];
//             let index = tmpRoomList.findIndex((room) => room.id === action.payload);
//             if (index !== -1) {
//                 tmpRoomList.splice(index, 1);
//             }
//             return { loading: false, rooms: [...tmpRoomList] };
//         case ROOM_DELETE_FAIL:
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };
