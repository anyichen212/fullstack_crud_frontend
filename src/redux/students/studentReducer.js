import StudentType from "./studentType";

export const INITIAL_STUDENT_STATE = {
    allStudent: [],
};

const AllStudentReducer = (state = INITIAL_STUDENT_STATE, action) => {
    console.log("AllStudent Reducer is handling action");

    switch (action.type) {
        case StudentType.FETCH_ALL_STUDENTS:
            return {...state, allStudent: action.payload};
        
            default:
                return state;
    }
};

export {
    AllStudentReducer,
}