import CampusType from "./campusesType";


//initial state, default state value
export const INITIAL_CAMPUS_STATE = {
    allCampus: [],
};

const SingleCampus = (state, action) => {
    switch (action.type) {
        case CampusType.FETCH_CAMPUS:
            return action.payload;
        
        default:
            return null;
    }
}

const CampusReducer = (state = INITIAL_CAMPUS_STATE, action) => {
    console.log("Campus Reducer is handling actions");

    switch (action.type) {
        case CampusType.FETCH_ALL_CAMPUSES:
            return {...state, allCampus: action.payload };
        
        default:
            return state;
    }
};

export {
    CampusReducer,
    SingleCampus,
};