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
    console.log("FerchAllCampusThunk before return")
    return async (dispatch) => {
        try {
            console.log("FetchAllCampusThunk Run!");
            const response = await axios.get("http://localhost:8080/api/campus");
            console.log("FetchAllCampusThunk Complete!");
            dispatch(fetchAllCampus(response.data));
        } catch (error) {
            console.log(Error);
        }
    }
};