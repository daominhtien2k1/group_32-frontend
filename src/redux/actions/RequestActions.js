import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    CREATE_REQUEST_ROOM_FAIL,
    CREATE_REQUEST_ROOM_REQUEST,
    CREATE_REQUEST_ROOM_SUCCESS,
    REQUEST_ROOM_LIST_FAIL,
    REQUEST_ROOM_LIST_REQUEST,
    REQUEST_ROOM_LIST_SUCCESS
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
