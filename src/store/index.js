import { combineReducers } from "redux";
import { createStore } from "redux";
import muReducer from "./reducer";
import themes from "./theme"
import imageReducer from "./dpactions";

const rootReducer = combineReducers({ muReducer, theme: themes, image: imageReducer })

const store = createStore(rootReducer)

export default store