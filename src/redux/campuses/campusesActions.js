import axios from "axios";

import CampusType from "./campusesType";

export const fetchAllCampus = (payload) => {
    console.log("FETCH ALL CAMPUS in Campus Action");

    return {
        type: CampusType.FETCH_ALL_CAMPUSES,
        payload: payload,
    };
};

export const fetchAllCampusThunk = () => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(Error);
        }
    }
};