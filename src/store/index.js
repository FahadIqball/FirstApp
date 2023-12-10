import { combineReducers } from "redux";
import { createStore } from "redux";
import muReducer from "./reducer";
import themes from "./theme"

const rootReducer = combineReducers({ muReducer, theme: themes })

const store = createStore(rootReducer)

export default store