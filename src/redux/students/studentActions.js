import axios from "axios";
import StudentType from "./studentType";

//fetch all student
export const fetchAllStudent = (payload) => {
    console.log("FetchAllStudent action");

    return {
        type: StudentType.FETCH_ALL_STUDENTS,
        payload: payload,
    };
};

export const fetchAllStudentThunk = () => {
    console.log("FetchAllStudentThunk")

    return async (dispatch) => {
        try {
            const res = await axios.get("http://localhost:8080/api/student");
            console.log("FetchAllStudentThunk Complete!")
            dispatch(fetchAllStudent(res.data));
        } catch (error) {
            console.log("fetchAllStudentThunk error,", error);
        }
    }
};