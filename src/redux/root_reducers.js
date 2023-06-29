import { combineReducers } from "redux";
import CampusReducer from "./campuses/campusesReducer";

const rootReducer = combineReducers({
  campus: CampusReducer,
});

export default rootReducer;