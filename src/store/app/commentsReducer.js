import { ADD_COMMENT } from "./constants"

const initialState = {
  comments: [],
}

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      const comments = action.payload.filter(el => el.text || !el.deleted);
      return {
        ...state,
        comments,
      }
    }
  default: return state
  }
}
