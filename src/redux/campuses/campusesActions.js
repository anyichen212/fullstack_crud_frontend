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
    console.log("FetchAllCampusThunk before return")
    return async (dispatch) => {
        try {
            console.log("FetchAllCampusThunk Run!");
            const response = await axios.get("http://localhost:8080/api/campus");
            console.log("FetchAllCampusThunk Complete!");
            dispatch(fetchAllCampus(response.data));
        } catch (error) {
            console.log(error);
        }
    }
};

//fetch single campus
export const fetchCampus = (payload) => {
    console.log("fetchCampus action");

    return {
        type: CampusType.FETCH_CAMPUS,
        payload: payload
    }
}

export const fetchCampusThunk = (id) => {
    console.log(`FetchCampusThunk, fetching ${id}...`);

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/campus/${id}`);
            dispatch(fetchCampus(response.data));
        } catch (error) {
            console.log("Error in fetchCampusThunk : ", error);
        }
    }
}

//delete campus by id
export const deleteCampus = () => {
    console.log("DeleteCampus Action");

    return {
        type: CampusType.DELETE_CAMPUS,
    };
};

export const deleteCampusThunk = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/campus/${id}`);
            dispatch(deleteCampus(response));
            console.log("delete res : ", response);
        } catch (error) {
            console.log("deleteCampusThunk error : ", error);
        }
        
    }
}

//create new campus
export const createNewCampus = (payload) => {
    console.log("CreateNewCampus Action");

    return {
        type: CampusType.CREATE_NEW_CAMPUS,
        payload: payload,
    };
};

export const createNewCampusThunk = (formData) => {
    return async(dispatch) => {
        try {
            const newCampus = await axios.post("http://localhost:8080/api/campus", formData);
            await dispatch(createNewCampus(newCampus.data));
            console.log(newCampus.data);
        } catch (error) {
            console.log("createNewCampusThunk error : ", error);
        }
    }
}

//edit campus
export const editCampus = () => {
    console.log("EditCampus Action");

    return {
        type: CampusType.EDIT_CAMPUS
    }
}

export const editCampusThunk = (formData, id) => {
    return async(dispatch) => {
        try {
            const editCampus = await axios.put(`http://localhost:8080/api/campus/${id}`, formData);
            dispatch(editCampus());
        } catch (error) {
            console.log(error);
        }
    }
}