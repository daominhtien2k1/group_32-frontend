import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/UserConstants';
import {
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET
} from '../constants/UserConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_url } from '../backend_url';
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
export const updateProfile = (profile) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        const {
            userLogin: { userInfo }
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        let res = await axios.patch(
            `${backend_url}/api/profile`,
            {
                name: profile.name,
                studentCode: profile.studentCode
            },
            config
        );
        if (res?.data?.code ?? -1 === 200) {
            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: res?.data?.data });
            const {
                userLogin: { userInfo }
            } = getState();
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
            console.log('toast');
            toast.success('update success!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        } else {
            dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: 'update profile failed' });
            toast.error('update failed!', {
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
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
