import { CONTRACT_LIST_FAIL, CONTRACT_LIST_REQUEST, CONTRACT_LIST_SUCCESS } from '../constants/ContractConstants';

const initContracts = {
    contracts: []
};

export const contractListReducer = (state = initContracts, action) => {
    switch (action.type) {
        case CONTRACT_LIST_REQUEST:
            return { loading: true, contracts: [] };
        case CONTRACT_LIST_SUCCESS:
            return { loading: false, contracts: action.payload };
        case CONTRACT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
