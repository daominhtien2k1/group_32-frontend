import axios from 'axios';
import { backend_url } from '../backend_url';
import {
    BILL_DELETE_FAIL,
    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_LIST_FAIL,
    BILL_LIST_REQUEST,
    BILL_LIST_SUCCESS,
    BILL_UPDATE_FAIL,
    BILL_UPDATE_REQUEST,
    BILL_UPDATE_SUCCESS
} from '../constants/BillConstants';

export const getBillList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BILL_LIST_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const contractListResult = await axios.get(`${backend_url}/api/billing`, config);
        dispatch({ type: BILL_LIST_SUCCESS, payload: contractListResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: BILL_LIST_FAIL,
            payload: message
        });
    }
};

export const updateBill = (id, bill) => async (dispatch, getState) => {
    try {
        dispatch({ type: BILL_UPDATE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const billResult = await axios.patch(`${backend_url}/api/billing/${id}`, bill, config);
        dispatch({ type: BILL_UPDATE_SUCCESS, payload: billResult.data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: BILL_UPDATE_FAIL,
            payload: message
        });
    }
};

export const deleteBill = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BILL_DELETE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        await axios.delete(`${backend_url}/api/billing/${id}`, config);
        dispatch({ type: BILL_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: BILL_DELETE_FAIL,
            payload: message
        });
    }
};
