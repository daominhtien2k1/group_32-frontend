import axios from 'axios';
import { backend_url } from '../backend_url';
import { CONTRACT_LIST_FAIL, CONTRACT_LIST_REQUEST, CONTRACT_LIST_SUCCESS } from '../constants/ContractConstants';

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
