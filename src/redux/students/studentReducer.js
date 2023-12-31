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

//single student reducer
const SingleStudentReducer = (state, action) => {
    switch (action.type) {
        case StudentType.CREATE_NEW_STUDENT:
            return action.payload;
        case StudentType.FETCH_STUDENT:
            return action.payload;

        default:
            return null;
    }
}

export {
    AllStudentReducer,
    SingleStudentReducer,
}