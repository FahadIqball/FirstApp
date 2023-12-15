import { combineReducers } from "redux";
import { createStore } from "redux";
import muReducer from "./reducer";
import themes from "./theme"
import imageReducer from "./dpactions";
import userReducer from "./userDataAction";

const rootReducer = combineReducers({ muReducer, theme: themes, image: imageReducer, user: userReducer })

const store = createStore(rootReducer)

export default store