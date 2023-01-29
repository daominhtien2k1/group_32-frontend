import { BUILDING_LIST_FAIL, BUILDING_LIST_REQUEST, BUILDING_LIST_SUCCESS } from '../constants/BuildingConstants';

const initBuildings = {
    buildings: []
};

export const buildingListReducer = (state = initBuildings, action) => {
    switch (action.type) {
        case BUILDING_LIST_REQUEST:
            return { loading: true, buildings: [] };
        case BUILDING_LIST_SUCCESS:
            return { loading: false, buildings: action.payload };
        case BUILDING_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
