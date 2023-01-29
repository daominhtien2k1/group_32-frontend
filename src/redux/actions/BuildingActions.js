import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    BUILDING_DELETE_FAIL,
    BUILDING_DELETE_REQUEST,
    BUILDING_DELETE_SUCCESS,
    BUILDING_LIST_FAIL,
    BUILDING_LIST_REQUEST,
    BUILDING_LIST_SUCCESS
} from '../constants/BuildingConstants';

export const getBuildingList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BUILDING_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const buildingListResult = await axios.get(`${backend_url}/api/buildings`, config);
        dispatch({ type: BUILDING_LIST_SUCCESS, payload: buildingListResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: BUILDING_LIST_FAIL,
            payload: message
        });
    }
};

export const deleteBuilding = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUILDING_DELETE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`${backend_url}/api/buildings/${id}`, config);
        dispatch({ type: BUILDING_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: BUILDING_DELETE_FAIL,
            payload: message
        });
    }
};
