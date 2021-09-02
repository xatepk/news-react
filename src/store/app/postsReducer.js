import { ADD_POST, UPDATE_LOADING_STATE } from "./constants"

const initialState = {
  posts: [],
  dataFetching: true,
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: action.payload,
        dataFetching: false,
      }
    }
    case UPDATE_LOADING_STATE: {
      return {
        ...state,
        dataFetching: action.payload,
      }
    }

    default: return state
  }
}
