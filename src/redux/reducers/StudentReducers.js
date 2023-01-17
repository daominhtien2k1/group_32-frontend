//login
import { STUDENT_LOGIN_FAIL, STUDENT_LOGIN_REQUEST, STUDENT_LOGIN_SUCCESS, STUDENT_LOGOUT } from '../constants/StudentConstants';

const initStudentInfo = {
    studentInfo: null
};
export const studentLoginReducer = (state = initStudentInfo, action) => {
    switch (action.type) {
        case STUDENT_LOGIN_REQUEST:
            return { loading: true, studentInfo: null };
        case STUDENT_LOGIN_SUCCESS:
            return { loading: false, success: true, studentInfo: action.payload };
        case STUDENT_LOGIN_FAIL:
            return { loading: false, error: action.payload, studentInfo: null };
        case STUDENT_LOGOUT:
            return { studentInfo: null };
        default:
            return state;
    }
};
