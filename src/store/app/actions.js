import { ADD_POST, UPDATE_LOADING_STATE, ADD_COMMENT } from "./constants";

export const addPost = (payload) => ({
  type: ADD_POST,
  payload,
});

export const updateLoadingState = (payload) => ({
  type: UPDATE_LOADING_STATE,
  payload,
})

export const addComment = (payload) => ({
  type: ADD_COMMENT,
  payload,
});
