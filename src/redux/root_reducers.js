import { combineReducers } from "redux";
import { CampusReducer, SingleCampus } from "./campuses/campusesReducer";
import { AllStudentReducer, SingleStudentReducer } from "./students/studentReducer";

const rootReducer = combineReducers({
  campus: CampusReducer,
  singleCampus: SingleCampus,
  allStudent: AllStudentReducer,
  singleStudent: SingleStudentReducer
});

export default rootReducer;