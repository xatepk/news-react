import { combineReducers } from "redux";
import { postsReducer } from "./app/postsReducer";

export const rootReducer = combineReducers({
    rootState: postsReducer
})
