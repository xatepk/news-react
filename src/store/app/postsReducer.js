import { ADD_POST } from "./constants"

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

    default: return state
  }
}
