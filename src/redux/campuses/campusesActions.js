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

//create new campus
export const createNewCampus = () => {
    console.log("CreateNewCampus Action");

    return {
        type: CampusType.CREATE_NEW_CAMPUS,
    };
};

export const createNewCampusThunk = (formData) => {
    return async(dispatch) => {
        try {
            const createNewCampus = await axios.post("http://localhost:8080/api/campus", formData);
            dispatch(createNewCampus());
        } catch (error) {
            console.log("createNewCampusThunk error : ", error);
        }
    }
}