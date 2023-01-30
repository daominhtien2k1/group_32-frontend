import axios from 'axios';
import { backend_url } from '../backend_url';
import { BILL_LIST_FAIL, BILL_LIST_REQUEST, BILL_LIST_SUCCESS } from '../constants/BillConstants';

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
