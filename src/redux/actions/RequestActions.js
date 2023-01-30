import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    CREATE_REQUEST_ROOM_FAIL,
    CREATE_REQUEST_ROOM_REQUEST,
    CREATE_REQUEST_ROOM_SUCCESS,
    REQUEST_ROOM_DELETE_FAIL,
    REQUEST_ROOM_DELETE_REQUEST,
    REQUEST_ROOM_DELETE_SUCCESS,
    REQUEST_ROOM_LIST_FAIL,
    REQUEST_ROOM_LIST_REQUEST,
    REQUEST_ROOM_LIST_SUCCESS,
    REQUEST_ROOM_UPDATE_STATUS_FAIL,
    REQUEST_ROOM_UPDATE_STATUS_REQUEST,
    REQUEST_ROOM_UPDATE_STATUS_SUCCESS
} from '../constants/RequestConstants';

export const createRequest = (request) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_REQUEST_ROOM_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.post(`${backend_url}/api/request`, request, config);
        dispatch({ type: CREATE_REQUEST_ROOM_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CREATE_REQUEST_ROOM_FAIL,
            payload: message
        });
    }
};

export const getRequestList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_ROOM_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const requestListResult = await axios.get(`${backend_url}/api/request`, config);
        dispatch({ type: REQUEST_ROOM_LIST_SUCCESS, payload: requestListResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: REQUEST_ROOM_LIST_FAIL,
            payload: message
        });
    }
};

export const deleteRequestRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_ROOM_DELETE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`${backend_url}/api/request/${id}`, config);
        dispatch({ type: REQUEST_ROOM_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: REQUEST_ROOM_DELETE_FAIL,
            payload: message
        });
    }
};

export const updateRequestRoomStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: REQUEST_ROOM_UPDATE_STATUS_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const requestResult = await axios.patch(`${backend_url}/api/request/${id}/status`, status, config);
        dispatch({ type: REQUEST_ROOM_UPDATE_STATUS_SUCCESS, payload: requestResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: REQUEST_ROOM_UPDATE_STATUS_FAIL,
            payload: message
        });
    }
};
