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

const initBills = {
    bills: []
};

export const billListReducer = (state = initBills, action) => {
    switch (action.type) {
        case BILL_LIST_REQUEST:
            return { loading: true, bills: [] };
        case BILL_LIST_SUCCESS:
            return { loading: false, success: true, bills: action.payload };
        case BILL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateBillReducer = (state = {}, action) => {
    switch (action.type) {
        case BILL_UPDATE_REQUEST:
            return { loading: true };
        case BILL_UPDATE_SUCCESS:
            return { loading: false, success: true, bill: action.payload };
        case BILL_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteBillReducer = (state = {}, action) => {
    switch (action.type) {
        case BILL_DELETE_REQUEST:
            return { loading: true };
        case BILL_DELETE_SUCCESS:
            return { loading: false, success: true };
        case BILL_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
