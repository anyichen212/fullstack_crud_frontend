import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root_reducers";


const logger = createLogger({ collapsed: true });

const middleWare = composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument({axios}, logger))
);

const store = createStore(rootReducer, middleWare);

export default store;