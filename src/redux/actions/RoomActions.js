import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    ROOM_DETAIL_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
    ROOM_FROM_BUIID_LIST_FAIL,
    ROOM_FROM_BUIID_LIST_REQUEST,
    ROOM_FROM_BUIID_LIST_SUCCESS
} from '../constants/RoomConstants';

export const getRoomFromBuildingIDList = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_FROM_BUIID_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const roomListResult = await axios.get(`${backend_url}/api/rooms/${id}`, config);
        dispatch({ type: ROOM_FROM_BUIID_LIST_SUCCESS, payload: roomListResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_FROM_BUIID_LIST_FAIL,
            payload: message
        });
    }
};

export const detailRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_DETAIL_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.get(`${backend_url}/api/rooms/detail/${id}`, config);
        dispatch({ type: ROOM_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_DETAIL_FAIL,
            payload: message
        });
    }
};
