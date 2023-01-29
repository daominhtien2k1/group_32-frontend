//login
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/UserConstants';

const initUserInfo = {
    userInfo: null
};
export const userLoginReducer = (state = initUserInfo, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, userInfo: null };
        case USER_LOGIN_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload, userInfo: null };
        case USER_LOGOUT:
            return { userInfo: null };
        default:
            return state;
    }
};
