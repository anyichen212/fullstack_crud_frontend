import { combineReducers } from "redux";
import { CampusReducer, SingleCampus } from "./campuses/campusesReducer";
import { AllStudentReducer } from "./students/studentReducer";

const rootReducer = combineReducers({
  campus: CampusReducer,
  singleCampus: SingleCampus,
  allStudent: AllStudentReducer,
});

export default rootReducer;