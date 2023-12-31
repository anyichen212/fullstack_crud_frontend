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
            const res = await axios.get(`${process.env.REACT_APP_VERCEL_URL}student`);
            console.log("FetchAllStudentThunk Complete!")
            dispatch(fetchAllStudent(res.data));
        } catch (error) {
            console.log("fetchAllStudentThunk error,", error);
        }
    }
};

//Fetch single student
export const fetchStudent = (payload) => {
    console.log("fetchStudent Action");

    return {
        type: StudentType.FETCH_STUDENT,
        payload: payload,
    };

}

export const fetchStudentThunk = (id) => {
    console.log(`FetchStudentThunk, fetching ${id}...`);

    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_VERCEL_URL}student/${id}`);
            dispatch(fetchStudent(response.data));
        } catch (error) {
            console.log("Error in fetchStudentThunk :", error);
        }
    };
};



//create a new student
export const createNewStudent = (payload) => {

    return {
            type: StudentType.CREATE_NEW_STUDENT,
            payload: payload,
    };

};

export const createNewStudentThunk = (formData) => {
    console.log("CreateNewStudentThunk");

    return async(dispatch) => {
        try {
            const newStudent = await axios.post(`${process.env.REACT_APP_VERCEL_URL}student`, formData);
            await dispatch(createNewStudent(newStudent.data));
        } catch (error) {
            console.log("CreateNewStudentThunk error :", error);
        }
    }

};

//delete student
export const deleteStudent = () => {
    return {
        type: StudentType.DELETE_STUDENT,
    };
}

export const deleteStudentThunk = (id) => {
    return async(dispatch) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_VERCEL_URL}student/${id}`);
            dispatch(deleteStudent(res));
            console.log(`Student ${id} deleted`);
        } catch (error) {
            console.log("deleteCampusThunk error : ", error);
        }
        
    }
};

//edit student
export const editStudent = () => {
    console.log("editStudent Action");

    return {
        type: StudentType.EDIT_STUDENT
    }
}

export const editStudentThunk = (form, id) => {
    return async(dispatch) => {
        try {
            const editStudent = await axios.put(`${process.env.REACT_APP_VERCEL_URL}student/${id}`, form);
            dispatch(editStudent());
            console.log("editStudentThunk sucess");
        } catch (error) {
            console.log(error);
        }
    }
}