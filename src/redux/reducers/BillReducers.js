import { BILL_LIST_FAIL, BILL_LIST_REQUEST, BILL_LIST_SUCCESS } from '../constants/BillConstants';

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
