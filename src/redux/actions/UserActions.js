import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/UserConstants';

// chung cho cả admin
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const userResult = await axios.post(`http://localhost:3000/api/auth/login`, { email, password });
        const userData = userResult.data;
        const userInfo = userData.data.user;
        const token = userData.data.tokens.access.token;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...userInfo, token } });
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, token }));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};
