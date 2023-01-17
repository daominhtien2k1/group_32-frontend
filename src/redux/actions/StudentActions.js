import axios from 'axios';
import { STUDENT_LOGIN_FAIL, STUDENT_LOGIN_REQUEST, STUDENT_LOGIN_SUCCESS, STUDENT_LOGOUT } from '../constants/StudentConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: STUDENT_LOGIN_REQUEST });
        const studentResult = await axios.post(`http://localhost:3000/api/auth/login`, { email, password });
        const studentData = studentResult.data;
        const studentInfo = studentData.data.user;
        dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: studentInfo });
        localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
    } catch (error) {
        dispatch({
            type: STUDENT_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('studentInfo');
    dispatch({ type: STUDENT_LOGOUT });
};
