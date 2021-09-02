import { ADD_POST, UPDATE_LOADING_STATE } from "./constants";

export const addPost = (payload) => ({
  type: ADD_POST,
  payload,
});

export const updateLoadingState = (payload) => ({
  type: UPDATE_LOADING_STATE,
  payload,
})
