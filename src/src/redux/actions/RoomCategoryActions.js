import axios from 'axios';
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_url } from '../backend_url';
export const getRoomCategoryList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_CATEGORY_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const roomCategoryList = await axios.get(`${backend_url}/api/room-category`, config);
        if (roomCategoryList?.data?.code === 200) {
            dispatch({ type: ROOM_CATEGORY_LIST_SUCCESS, payload: roomCategoryList.data.data });
        } else {
            dispatch({ type: ROOM_CATEGORY_LIST_FAIL, payload: 'some error plz try again' });
            toast.error('some error plz try again', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_CATEGORY_LIST_FAIL,
            payload: message
        });
    }
};

export const createRoomCategory = (roomCategory) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_CATEGORY_CREATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.post(`${backend_url}/api/room-category/`, roomCategory, config);

        dispatch({ type: ROOM_CATEGORY_CREATE_SUCCESS });
        toast.success('create room category success', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_CATEGORY_CREATE_FAIL,
            payload: message
        });
    }
};

export const updateRoomCategory = (id, roomCategory) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_CATEGORY_UPDATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.put(`${backend_url}/api/room-category/${id}`, roomCategory, config);
        dispatch({ type: ROOM_CATEGORY_UPDATE_SUCCESS, payload: data?.data });
        toast.success('update room category success', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_CATEGORY_UPDATE_FAIL,
            payload: message
        });
    }
};

export const deleteRoomCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_CATEGORY_DELETE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`${backend_url}api/room-category/${id}`, config);
        dispatch({ type: ROOM_CATEGORY_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ROOM_CATEGORY_DELETE_FAIL,
            payload: message
        });
    }
};
