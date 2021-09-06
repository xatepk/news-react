import { ADD_COMMENT } from "./constants"

const initialState = {
  comments: [],
}

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      return {
        ...state,
        comments: action.payload,
      }
    }
  default: return state
  }
}
