import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    CONTRACT_LIST_FAIL,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_UPDATE_FAIL,
    CONTRACT_UPDATE_REQUEST,
    CONTRACT_UPDATE_STATUS_FAIL,
    CONTRACT_UPDATE_STATUS_REQUEST,
    CONTRACT_UPDATE_STATUS_SUCCESS,
    CONTRACT_UPDATE_SUCCESS
} from '../constants/ContractConstants';

export const getContractList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTRACT_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const contractListResult = await axios.get(`${backend_url}/api/contract`, config);
        dispatch({ type: CONTRACT_LIST_SUCCESS, payload: contractListResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CONTRACT_LIST_FAIL,
            payload: message
        });
    }
};

export const updateContract = (id, contract) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTRACT_UPDATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const contractResult = await axios.patch(`${backend_url}/api/contract/${id}`, contract, config);
        dispatch({ type: CONTRACT_UPDATE_SUCCESS, payload: contractResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CONTRACT_UPDATE_FAIL,
            payload: message
        });
    }
};

export const updateContractStatus = (id, contract) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTRACT_UPDATE_STATUS_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const contractResult = await axios.patch(`${backend_url}/api/contract/${id}/status`, contract, config);
        dispatch({ type: CONTRACT_UPDATE_STATUS_SUCCESS, payload: contractResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: CONTRACT_UPDATE_STATUS_FAIL,
            payload: message
        });
    }
};
