import { combineReducers } from "redux";
import { CampusReducer, SingleCampus } from "./campuses/campusesReducer";

const rootReducer = combineReducers({
  campus: CampusReducer,
  singleCampus: SingleCampus,
});

export default rootReducer;