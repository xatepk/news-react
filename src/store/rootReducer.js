import { combineReducers } from "redux";
import { postsReducer } from "./app/postsReducer";
import { commentsReducer } from "./app/commentsReducer";

export const rootReducer = combineReducers({
    rootState: postsReducer,
    comments: commentsReducer
})
