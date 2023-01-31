import {
    CONTRACT_LIST_FAIL,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_UPDATE_FAIL,
    CONTRACT_UPDATE_REQUEST,
    CONTRACT_UPDATE_STATUS_FAIL,
    CONTRACT_UPDATE_STATUS_REQUEST,
    CONTRACT_UPDATE_STATUS_SUCCESS,
    CONTRACT_UPDATE_SUCCESS
} from '../constants/ContractConstants';

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

export const updateContractReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTRACT_UPDATE_REQUEST:
            return { loading: true };
        case CONTRACT_UPDATE_SUCCESS:
            return { loading: false, success: true, contract: action.payload };
        case CONTRACT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateContractStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTRACT_UPDATE_STATUS_REQUEST:
            return { loading: true };
        case CONTRACT_UPDATE_STATUS_SUCCESS:
            return { loading: false, success: true, contract: action.payload };
        case CONTRACT_UPDATE_STATUS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
