import axios from 'axios';
import { backend_url } from '../backend_url';
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

export const getRoomList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const roomListResult = await axios.get(`${backend_url}/api/rooms/`, config);
        dispatch({ type: ROOM_LIST_SUCCESS, payload: roomListResult?.data?.data?.items ?? [] });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_LIST_FAIL,
            payload: message
        });
    }
};
export const getRoomById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_DETAIL_BY_ID_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const roomListResult = await axios.get(`${backend_url}/api/rooms/detail/${id}`, config);
        dispatch({ type: ROOM_DETAIL_BY_ID_SUCCESS, payload: roomListResult?.data?.data ?? {} });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_DETAIL_BY_ID_FAIL,
            payload: message
        });
    }
};

export const createRoom = (createBody) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_CREATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const newRoom = await axios.post(
            `${backend_url}/api/rooms/${createBody.buildingId}`,
            {
                name: createBody.name,
                roomCategoryId: createBody.roomCategoryId
            },
            config
        );
        dispatch({ type: ROOM_CREATE_SUCCESS, payload: newRoom?.data?.data ?? {} });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_CREATE_FAIL,
            payload: message
        });
    }
};

export const updateRoom = (id, updateBody) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_UPDATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const newRoom = await axios.put(
            `${backend_url}/api/rooms/${id}`,
            {
                name: updateBody.name,
                roomCategoryId: updateBody.roomCategoryId,
                buildingId: updateBody.buildingId
            },
            config
        );
        dispatch({ type: ROOM_UPDATE_SUCCESS, payload: newRoom?.data?.data ?? {} });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_UPDATE_FAIL,
            payload: message
        });
    }
};

export const deleteRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_DELETE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`${backend_url}/api/rooms/${id}`, config);

        dispatch({ type: ROOM_DELETE_SUCCESS, payload: id });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_DELETE_FAIL,
            payload: message
        });
    }
};
